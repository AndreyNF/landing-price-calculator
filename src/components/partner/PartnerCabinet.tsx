import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import PartnerProfile from "./PartnerProfile";
import PartnerStats from "./PartnerStats";
import ClientList from "./ClientList";
import ClientCard from "./ClientCard";
import { apiPartner } from "./types";

type Tab = "stats" | "clients" | "profile";

interface Props {
  sessionId: string;
  userLogin: string;
  isAdmin?: boolean;
  partnerId?: number;
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "stats",   label: "Статистика", icon: "BarChart2" },
  { key: "clients", label: "Мои клиенты", icon: "Users" },
  { key: "profile", label: "Профиль",     icon: "Settings" },
];

const REQUIRED_FIELDS = [
  "inn", "full_name", "legal_address", "director_name",
  "bank_bik", "bank_account", "contact_name", "contact_phone", "contact_email",
];

export default function PartnerCabinet({ sessionId, userLogin, isAdmin = false, partnerId }: Props) {
  const [tab, setTab] = useState<Tab>("stats");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [missingCount, setMissingCount] = useState(0);

  useEffect(() => {
    if (isAdmin) return;
    apiPartner(sessionId, { action: "get_profile" }).then(data => {
      if (data.partner) {
        const p = data.partner as Record<string, unknown>;
        setMissingCount(REQUIRED_FIELDS.filter(k => !p[k]).length);
      } else {
        setMissingCount(REQUIRED_FIELDS.length);
      }
    });
  }, [sessionId, isAdmin]);

  return (
    <div>
      {/* Hero */}
      <div className="mb-5 md:mb-8">
        <p className="text-xs tracking-widest uppercase font-semibold mb-1.5" style={{ color: "var(--blue)" }}>Партнёрский кабинет</p>
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-1" style={{ fontFamily: "Playfair Display, serif", color: "var(--navy)" }}>
          {userLogin}
        </h1>
        <p className="text-sm hidden sm:block" style={{ color: "var(--text-muted)" }}>Управляйте клиентами, отслеживайте статусы сделок и получайте вознаграждения.</p>
      </div>

      {/* Tabs */}
      {!selectedClientId && (
        <div className="flex gap-2 mb-5 md:mb-7 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex-shrink-0"
              style={{
                background: tab === t.key ? "var(--navy)" : "var(--bg-white)",
                color: tab === t.key ? "#fff" : "var(--text-muted)",
                border: `1px solid ${tab === t.key ? "var(--navy)" : "var(--border-c)"}`,
              }}>
              <Icon name={t.icon as "BarChart2"} size={14} />
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="rounded-2xl p-4 md:p-8" style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)" }}>
        {selectedClientId ? (
          <ClientCard
            sessionId={sessionId}
            clientId={selectedClientId}
            isAdmin={isAdmin}
            onBack={() => { setSelectedClientId(null); setTab("clients"); }}
          />
        ) : (
          <>
            {tab === "stats"   && <PartnerStats sessionId={sessionId} missingCount={missingCount} onGoToProfile={() => setTab("profile")} partnerId={partnerId} />}
            {tab === "clients" && <ClientList sessionId={sessionId} onSelectClient={setSelectedClientId} partnerId={partnerId} />}
            {tab === "profile" && <PartnerProfile sessionId={sessionId} isAdmin={isAdmin} />}
          </>
        )}
      </div>
    </div>
  );
}