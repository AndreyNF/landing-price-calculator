import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import {
  apiPartner, DADATA_TOKEN, PARTNER_TYPE_LABELS,
  type Partner, type PartnerType,
} from "./types";

const SUGGEST_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
const FIND_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

interface Props { sessionId: string; onSaved?: (p: Partner) => void }

interface DDSuggestion { value: string; data: Record<string, unknown> }

const INPUT = "w-full px-4 py-3 rounded-lg text-sm outline-none transition-all font-body";
const inputStyle = { background: "var(--bg)", border: "1px solid var(--border-c)", color: "var(--text)" };

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>
        {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function PartnerProfile({ sessionId, onSaved }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    partner_type: "legal", inn: "", kpp: "", ogrn: "", full_name: "", short_name: "",
    legal_address: "", director_name: "", bank_name: "", bank_bik: "", bank_account: "",
    bank_corr: "", contact_name: "", contact_phone: "", contact_email: "",
  });
  const [ddSuggestions, setDdSuggestions] = useState<DDSuggestion[]>([]);
  const [ddOpen, setDdOpen] = useState(false);
  const [ddLoading, setDdLoading] = useState(false);
  const ddTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const data = await apiPartner(sessionId, { action: "get_profile" });
      if (data.partner) {
        const p: Partner = data.partner;
        setPartner(p);
        setForm({
          partner_type: p.partner_type || "legal",
          inn: p.inn || "", kpp: p.kpp || "", ogrn: p.ogrn || "",
          full_name: p.full_name || "", short_name: p.short_name || "",
          legal_address: p.legal_address || "", director_name: p.director_name || "",
          bank_name: p.bank_name || "", bank_bik: p.bank_bik || "",
          bank_account: p.bank_account || "", bank_corr: p.bank_corr || "",
          contact_name: p.contact_name || "", contact_phone: p.contact_phone || "",
          contact_email: p.contact_email || "",
        });
      }
      setLoading(false);
    })();
  }, [sessionId]);

  // DaData autocomplete по ИНН
  useEffect(() => {
    if (ddTimer.current) clearTimeout(ddTimer.current);
    const inn = form.inn.trim();
    if (!inn || inn.length < 3 || !DADATA_TOKEN) { setDdSuggestions([]); return; }
    setDdLoading(true);
    ddTimer.current = setTimeout(async () => {
      const url = inn.length >= 10 ? FIND_URL : SUGGEST_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Token ${DADATA_TOKEN}` },
        body: JSON.stringify({ query: inn, count: 7 }),
      }).catch(() => null);
      setDdLoading(false);
      if (!res) return;
      const d = await res.json();
      setDdSuggestions(d.suggestions || []);
      setDdOpen(true);
    }, 250);
  }, [form.inn]);

  const applyDaData = (s: DDSuggestion) => {
    const d = s.data as Record<string, unknown>;
    const addr = (d.address as Record<string, string> | null)?.value || "";
    const mgmt = d.management as Record<string, string> | null;
    setForm(prev => ({
      ...prev,
      inn: (d.inn as string) || prev.inn,
      kpp: (d.kpp as string) || "",
      ogrn: (d.ogrn as string) || "",
      full_name: (d.name as Record<string, string>)?.full_with_opf || s.value,
      short_name: (d.name as Record<string, string>)?.short_with_opf || s.value,
      legal_address: addr,
      director_name: mgmt?.name || "",
    }));
    setDdOpen(false);
    setDdSuggestions([]);
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.inn.trim()) { setError("Укажите ИНН"); return; }
    setSaving(true); setError("");
    const data = await apiPartner(sessionId, { action: "save_profile", ...form });
    setSaving(false);
    if (data.error) { setError(data.error); return; }
    setPartner(data.partner);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onSaved) onSaved(data.partner);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <Icon name="LoaderCircle" size={28} className="animate-spin" style={{ color: "var(--blue)" }} />
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {partner?.ref_code && (
        <div className="rounded-xl px-5 py-4 flex items-center gap-4" style={{ background: "var(--blue-dim)", border: "1px solid rgba(37,99,235,0.2)" }}>
          <Icon name="Link" size={18} style={{ color: "var(--blue)" }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold" style={{ color: "var(--blue)" }}>Реферальный код</p>
            <p className="text-sm font-mono font-bold" style={{ color: "var(--navy)" }}>{partner.ref_code}</p>
          </div>
        </div>
      )}

      {/* Статус партнёра */}
      <div>
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Тип партнёра</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {(Object.entries(PARTNER_TYPE_LABELS) as [PartnerType, string][]).map(([val, label]) => (
            <label key={val} className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-all"
              style={{
                border: `2px solid ${form.partner_type === val ? "var(--blue)" : "var(--border-c)"}`,
                background: form.partner_type === val ? "var(--blue-dim)" : "var(--bg)",
              }}>
              <input type="radio" name="partner_type" value={val} checked={form.partner_type === val}
                onChange={set("partner_type")} className="hidden" />
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center`}
                style={{ borderColor: form.partner_type === val ? "var(--blue)" : "var(--border-c)" }}>
                {form.partner_type === val && <div className="w-2 h-2 rounded-full" style={{ background: "var(--blue)" }} />}
              </div>
              <span className="text-sm font-medium" style={{ color: form.partner_type === val ? "var(--navy)" : "var(--text-muted)" }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Реквизиты с поиском DaData */}
      <div>
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Реквизиты</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="ИНН" required>
            <div className="relative">
              <input className={INPUT} style={inputStyle} placeholder="Введите ИНН — данные подтянутся автоматически"
                value={form.inn} onChange={set("inn")}
                onFocus={() => ddSuggestions.length > 0 && setDdOpen(true)}
                onBlur={() => setTimeout(() => setDdOpen(false), 150)} />
              {ddLoading && <Icon name="LoaderCircle" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin" style={{ color: "var(--text-muted)" }} />}
              {ddOpen && ddSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden text-sm mt-1"
                  style={{ background: "#fff", border: "1px solid var(--border-c)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)", top: "100%" }}>
                  {ddSuggestions.map((s, i) => (
                    <li key={i} onMouseDown={() => applyDaData(s)}
                      className="px-4 py-3 cursor-pointer"
                      style={{ borderBottom: i < ddSuggestions.length - 1 ? "1px solid var(--border-c)" : "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff")}>
                      <p className="font-medium truncate" style={{ color: "var(--navy)" }}>{s.value}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>ИНН: {String(s.data.inn || "—")}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Field>
          {form.partner_type === "legal" && (
            <Field label="КПП">
              <input className={INPUT} style={inputStyle} placeholder="КПП" value={form.kpp} onChange={set("kpp")} />
            </Field>
          )}
          <Field label="ОГРН / ОГРНИП">
            <input className={INPUT} style={inputStyle} placeholder="ОГРН" value={form.ogrn} onChange={set("ogrn")} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Полное наименование">
            <input className={INPUT} style={inputStyle} placeholder="ООО «Ромашка»" value={form.full_name} onChange={set("full_name")} />
          </Field>
          <Field label="Краткое наименование">
            <input className={INPUT} style={inputStyle} placeholder="Ромашка" value={form.short_name} onChange={set("short_name")} />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Юридический адрес">
            <input className={INPUT} style={inputStyle} placeholder="г. Москва, ул. Ленина, д. 1" value={form.legal_address} onChange={set("legal_address")} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Руководитель / ФИО ИП">
            <input className={INPUT} style={inputStyle} placeholder="Иванов Иван Иванович" value={form.director_name} onChange={set("director_name")} />
          </Field>
        </div>
      </div>

      {/* Банковские реквизиты */}
      <div>
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Банковские реквизиты</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Название банка">
            <input className={INPUT} style={inputStyle} placeholder="Сбербанк" value={form.bank_name} onChange={set("bank_name")} />
          </Field>
          <Field label="БИК">
            <input className={INPUT} style={inputStyle} placeholder="044525225" value={form.bank_bik} onChange={set("bank_bik")} />
          </Field>
          <Field label="Расчётный счёт">
            <input className={INPUT} style={inputStyle} placeholder="40702810000000000000" value={form.bank_account} onChange={set("bank_account")} />
          </Field>
          <Field label="Корр. счёт">
            <input className={INPUT} style={inputStyle} placeholder="30101810400000000225" value={form.bank_corr} onChange={set("bank_corr")} />
          </Field>
        </div>
      </div>

      {/* Контактное лицо */}
      <div>
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Контактное лицо</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="ФИО">
            <input className={INPUT} style={inputStyle} placeholder="Петров Пётр Петрович" value={form.contact_name} onChange={set("contact_name")} />
          </Field>
          <Field label="Телефон">
            <input className={INPUT} style={inputStyle} placeholder="+7 (999) 000-00-00" value={form.contact_phone} onChange={set("contact_phone")} />
          </Field>
          <Field label="Email">
            <input className={INPUT} style={inputStyle} placeholder="partner@mail.ru" value={form.contact_email} onChange={set("contact_email")} />
          </Field>
        </div>
      </div>

      {error && (
        <div className="rounded-lg px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving}
          className="px-8 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
          style={{ background: "var(--blue)", color: "#fff", opacity: saving ? 0.7 : 1 }}>
          {saving ? <Icon name="LoaderCircle" size={16} className="animate-spin" /> : <Icon name="Save" size={16} />}
          Сохранить профиль
        </button>
        {saved && (
          <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: "var(--success)" }}>
            <Icon name="CheckCircle" size={16} />
            Сохранено
          </span>
        )}
      </div>
    </form>
  );
}
