import Icon from "@/components/ui/icon";
import { statusLabel, fmtDate, fmtMoney, type Party, type FinanceYear } from "./contractorTypes";

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon name={icon as "Info"} size={14} style={{ color: "var(--blue)" }} />
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{title}</p>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value?: string | null; mono?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2" style={{ borderBottom: "1px solid var(--border-c)" }}>
      <span className="text-xs flex-shrink-0 w-44" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className={`text-sm font-medium flex-1 ${mono ? "font-mono" : ""}`} style={{ color: "var(--navy)" }}>{value}</span>
    </div>
  );
}

function FinanceBlock({ fin }: { fin: FinanceYear }) {
  const items = [
    { label: "Выручка", value: fin.revenue, pos: true },
    { label: "Расходы", value: fin.expense, pos: false },
    { label: "Прибыль / убыток", value: fin.profit, pos: (fin.profit ?? 0) >= 0 },
    { label: "Активы", value: fin.assets, pos: true },
    { label: "Кредиторская задолженность", value: fin.debt_payable, pos: false },
    { label: "Денежный поток", value: fin.cash_flow, pos: (fin.cash_flow ?? 0) >= 0 },
  ].filter(i => i.value !== undefined && i.value !== null);

  if (!items.length) return null;

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-c)" }}>
      <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border-c)" }}>
        <span className="text-xs font-bold" style={{ color: "var(--navy)" }}>{fin.year} год</span>
        {fin.tax_system && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--blue-dim)", color: "var(--blue)" }}>{fin.tax_system}</span>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: "var(--border-c)" }}>
        {items.map(({ label, value, pos }) => (
          <div key={label} className="px-3 py-3" style={{ background: "#fff" }}>
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
            <p className="text-sm font-bold" style={{ color: pos ? "var(--success)" : "#ef4444" }}>{fmtMoney(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartyCard({ party, onClose }: { party: Party; onClose: () => void }) {
  const d = party.data;
  const status = statusLabel(d.state?.status);
  const isIP = d.type === "INDIVIDUAL";
  const finances = d.finances?.length ? d.finances : d.finance ? [d.finance] : [];

  return (
    <div className="mt-4 rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-c)", background: "#fff" }}>
      {/* Header */}
      <div className="px-6 py-5 flex items-start justify-between gap-4" style={{ background: "var(--navy)" }}>
        <div className="min-w-0">
          <p className="text-xs font-semibold mb-1 opacity-60" style={{ color: "#fff" }}>
            {isIP ? "Индивидуальный предприниматель" : "Юридическое лицо"}
            {d.branch_type === "BRANCH" && " · Филиал"}
          </p>
          <h3 className="text-xl font-bold leading-snug" style={{ color: "#fff", fontFamily: "Playfair Display, serif" }}>{party.value}</h3>
          {d.name?.latin && <p className="text-xs opacity-50 mt-0.5" style={{ color: "#fff" }}>{d.name.latin}</p>}
          {d.okved && <p className="text-xs mt-1.5 opacity-60" style={{ color: "#fff" }}>{d.okved} · {d.okved_type}</p>}
        </div>
        <button onClick={onClose} className="flex-shrink-0 mt-1 opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#fff" }}>
          <Icon name="X" size={18} />
        </button>
      </div>

      {/* Status badges */}
      <div className="px-6 pt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
          {status.text}
        </span>
        {d.state?.registration_date && (
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--bg)", color: "var(--text-muted)", border: "1px solid var(--border-c)" }}>
            Зарег.: {fmtDate(d.state.registration_date)}
          </span>
        )}
        {d.state?.liquidation_date && (
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
            Ликв.: {fmtDate(d.state.liquidation_date)}
          </span>
        )}
        {d.employee_count && (
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--bg)", color: "var(--text-muted)", border: "1px solid var(--border-c)" }}>
            {d.employee_count} сотр.
          </span>
        )}
        {d.branch_count != null && d.branch_count > 0 && (
          <span className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--bg)", color: "var(--text-muted)", border: "1px solid var(--border-c)" }}>
            Филиалов: {d.branch_count}
          </span>
        )}
      </div>

      <div className="px-6 pb-6 pt-4 space-y-6">

        {/* Реквизиты */}
        <Section title="Реквизиты" icon="FileText">
          <div>
            <Row label="ИНН" value={d.inn} mono />
            <Row label="КПП" value={d.kpp} mono />
            <Row label="ОГРН" value={d.ogrn} mono />
            <Row label="Дата регистрации ОГРН" value={fmtDate(d.ogrn_date)} />
            {d.capital?.value && <Row label="Уставной капитал" value={fmtMoney(d.capital.value)} />}
          </div>
        </Section>

        {/* Адрес */}
        {d.address?.value && (
          <Section title="Юридический адрес" icon="MapPin">
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "var(--bg)", color: "var(--navy)" }}>
              {d.address.value}
            </div>
          </Section>
        )}

        {/* Контакты */}
        {((d.phones && d.phones.length > 0) || (d.emails && d.emails.length > 0)) && (
          <Section title="Контактные данные" icon="Phone">
            <div>
              {d.phones?.map((p, i) => (
                <Row key={i} label={`Телефон${d.phones!.length > 1 ? ` ${i + 1}` : ""}`} value={p.value || p.data?.number} />
              ))}
              {d.emails?.map((e, i) => (
                <Row key={i} label={`Email${d.emails!.length > 1 ? ` ${i + 1}` : ""}`} value={e.value} />
              ))}
            </div>
          </Section>
        )}

        {/* Руководство */}
        {(d.management || (d.managers && d.managers.length > 0)) && (
          <Section title="Руководство" icon="UserCheck">
            <div className="space-y-2">
              {d.management?.name && (
                <div className="rounded-xl px-4 py-3" style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{d.management.name}</p>
                      {d.management.post && <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{d.management.post}</p>}
                    </div>
                    {d.management.disqualified && (
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                        Дисквалифицирован
                      </span>
                    )}
                  </div>
                </div>
              )}
              {d.managers?.filter(m => m.name !== d.management?.name).map((m, i) => (
                <div key={i} className="rounded-xl px-4 py-3" style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{m.name}</p>
                  {m.post && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{m.post}</p>}
                  {m.inn && <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>ИНН: {m.inn}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Учредители */}
        {d.founders && d.founders.length > 0 && (
          <Section title="Учредители" icon="Users">
            <div className="space-y-2">
              {d.founders.map((f, i) => (
                <div key={i} className="rounded-xl px-4 py-3 flex items-center justify-between gap-3" style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{f.name || "—"}</p>
                    {f.inn && <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>ИНН: {f.inn}</p>}
                    {f.type && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{f.type === "LEGAL" ? "Юр. лицо" : "Физ. лицо"}</p>}
                  </div>
                  {f.share?.value != null && (
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: "var(--blue)" }}>
                      {f.share.value}%
                    </span>
                  )}
                  {f.capital?.value != null && (
                    <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                      {fmtMoney(f.capital.value)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ОКВЭД */}
        {d.okveds && d.okveds.length > 0 && (
          <Section title="Виды деятельности (ОКВЭД)" icon="Briefcase">
            <div className="space-y-1.5">
              {d.okveds.slice(0, 10).map((o, i) => (
                <div key={i} className="flex gap-3 items-start py-1.5" style={{ borderBottom: "1px solid var(--border-c)" }}>
                  <span className="text-xs font-mono font-semibold flex-shrink-0 mt-0.5" style={{ color: o.main ? "var(--blue)" : "var(--text-muted)" }}>
                    {o.code}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text)" }}>{o.name}</span>
                  {o.main && <span className="text-xs ml-auto flex-shrink-0 px-2 py-0.5 rounded-full" style={{ background: "var(--blue-dim)", color: "var(--blue)" }}>основной</span>}
                </div>
              ))}
              {d.okveds.length > 10 && (
                <p className="text-xs text-center pt-1" style={{ color: "var(--text-muted)" }}>и ещё {d.okveds.length - 10}...</p>
              )}
            </div>
          </Section>
        )}

        {/* Финансовая отчётность */}
        {finances.length > 0 && (
          <Section title="Финансовая отчётность" icon="BarChart2">
            <div className="space-y-3">
              {finances.sort((a, b) => (b.year ?? 0) - (a.year ?? 0)).map((fin, i) => (
                <FinanceBlock key={i} fin={fin} />
              ))}
            </div>
          </Section>
        )}

        {/* Лицензии */}
        {d.licenses && d.licenses.length > 0 && (
          <Section title="Лицензии" icon="ShieldCheck">
            <div className="space-y-2">
              {d.licenses.map((l, i) => (
                <div key={i} className="rounded-xl px-4 py-3" style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}>
                  <p className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{l.activity || "Лицензируемая деятельность"}</p>
                  <div className="mt-1 space-y-0.5">
                    {l.number && <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>№ {l.series ? `${l.series} ` : ""}{l.number}</p>}
                    {l.issue_date && <p className="text-xs" style={{ color: "var(--text-muted)" }}>Выдана: {fmtDate(l.issue_date)}{l.expire_date ? ` · Действует до: ${fmtDate(l.expire_date)}` : ""}</p>}
                    {l.authority && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{l.authority}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Реорганизации */}
        {((d.predecessors && d.predecessors.length > 0) || (d.successors && d.successors.length > 0)) && (
          <Section title="Реорганизация" icon="GitMerge">
            <div className="space-y-1.5">
              {d.predecessors?.map((p, i) => <Row key={`pre-${i}`} label="Предшественник" value={`${p.name}${p.inn ? ` (ИНН ${p.inn})` : ""}`} />)}
              {d.successors?.map((s, i) => <Row key={`suc-${i}`} label="Правопреемник" value={`${s.name}${s.inn ? ` (ИНН ${s.inn})` : ""}`} />)}
            </div>
          </Section>
        )}

        {/* Налоговые органы */}
        {d.authorities && (
          <Section title="Контролирующие органы" icon="Building">
            <div>
              {d.authorities.fts_registration?.name && <Row label="ИФНС (регистрация)" value={`${d.authorities.fts_registration.name}${d.authorities.fts_registration.code ? ` (${d.authorities.fts_registration.code})` : ""}`} />}
              {d.authorities.fts_report?.name && <Row label="ИФНС (отчётность)" value={`${d.authorities.fts_report.name}${d.authorities.fts_report.code ? ` (${d.authorities.fts_report.code})` : ""}`} />}
              {d.authorities.pfr?.name && <Row label="ПФР" value={`${d.authorities.pfr.name}${d.authorities.pfr.code ? ` (${d.authorities.pfr.code})` : ""}`} />}
              {d.authorities.sif?.name && <Row label="ФСС" value={`${d.authorities.sif.name}${d.authorities.sif.code ? ` (${d.authorities.sif.code})` : ""}`} />}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
