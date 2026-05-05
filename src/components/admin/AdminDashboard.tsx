import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_URL = "https://functions.poehali.dev/2fb10b23-2471-4f73-a39f-315ed4c51e8c";

interface DashData {
  submissions_total: number;
  submissions_7d: number;
  partners_total: number;
  partners_active: number;
  clients_total: number;
  clients_done: number;
  contracts_sum: number;
  contracts_paid_sum: number;
  rewards_total: number;
  rewards_paid: number;
  rewards_pending: number;
  payments_sum: number;
}

function fmtMoney(v: number) {
  if (v >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)} млрд ₽`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)} млн ₽`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)} тыс. ₽`;
  return `${v.toLocaleString("ru-RU")} ₽`;
}

interface CardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

function StatCard({ icon, label, value, sub, color = "var(--blue)" }: CardProps) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
          <Icon name={icon as "Users"} size={18} style={{ color }} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</p>
      </div>
      <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--navy)" }}>{value}</p>
      {sub && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</p>}
    </div>
  );
}

export default function AdminDashboard({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch(ADMIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Session-Id": sessionId },
      body: JSON.stringify({ action: "dashboard" }),
    });
    const json = await res.json();
    setData(json);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Icon name="LoaderCircle" size={28} className="animate-spin" style={{ color: "var(--blue)" }} />
    </div>
  );

  if (!data) return null;

  const convRate = data.clients_total > 0
    ? Math.round((data.clients_done / data.clients_total) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: "var(--text-muted)" }}>Обновлено</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {lastUpdate?.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <button onClick={load}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg transition-opacity hover:opacity-70"
          style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)", color: "var(--blue)" }}>
          <Icon name="RefreshCw" size={13} />
          Обновить
        </button>
      </div>

      {/* Заявки */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Заявки с сайта</p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          <StatCard icon="Inbox" label="Всего заявок" value={data.submissions_total} color="var(--blue)" />
          <StatCard icon="TrendingUp" label="За 7 дней" value={data.submissions_7d} color="#7c3aed" />
        </div>
      </section>

      {/* Партнёры и клиенты */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Партнёры и клиенты</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon="Handshake" label="Партнёров всего" value={data.partners_total} color="#d97706" />
          <StatCard icon="CheckCircle2" label="Активных партнёров" value={data.partners_active} color="var(--success)" />
          <StatCard icon="Users" label="Клиентов партнёров" value={data.clients_total} color="var(--blue)" />
          <StatCard icon="Percent" label="Конверсия" value={`${convRate}%`} sub={`${data.clients_done} завершено`} color="#7c3aed" />
        </div>
      </section>

      {/* Финансы */}
      <section>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Финансы</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Контракты */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(21,128,61,0.1)" }}>
                <Icon name="FileSignature" size={16} style={{ color: "var(--success)" }} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Суммы контрактов</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Всего по контрактам</span>
                <span className="text-base font-bold" style={{ color: "var(--navy)" }}>{fmtMoney(data.contracts_sum)}</span>
              </div>
              <div className="h-px" style={{ background: "var(--border-c)" }} />
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Оплачено клиентами</span>
                <span className="text-base font-bold" style={{ color: "var(--success)" }}>{fmtMoney(data.contracts_paid_sum)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Ожидает оплаты</span>
                <span className="text-base font-bold" style={{ color: "#d97706" }}>{fmtMoney(data.contracts_sum - data.contracts_paid_sum)}</span>
              </div>
              {data.contracts_sum > 0 && (
                <div>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                    <span>Собрано</span>
                    <span>{Math.round((data.contracts_paid_sum / data.contracts_sum) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (data.contracts_paid_sum / data.contracts_sum) * 100)}%`, background: "var(--success)" }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Вознаграждения */}
          <div className="rounded-2xl p-5 space-y-4" style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)" }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.1)" }}>
                <Icon name="Wallet" size={16} style={{ color: "#7c3aed" }} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Вознаграждения партнёрам</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Начислено всего</span>
                <span className="text-base font-bold" style={{ color: "var(--navy)" }}>{fmtMoney(data.rewards_total)}</span>
              </div>
              <div className="h-px" style={{ background: "var(--border-c)" }} />
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Уже выплачено</span>
                <span className="text-base font-bold" style={{ color: "var(--success)" }}>{fmtMoney(data.rewards_paid)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>К выплате</span>
                <span className="text-base font-bold" style={{ color: "#ef4444" }}>{fmtMoney(data.rewards_pending)}</span>
              </div>
              {data.rewards_total > 0 && (
                <div>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                    <span>Выплачено</span>
                    <span>{Math.round((data.rewards_paid / data.rewards_total) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (data.rewards_paid / data.rewards_total) * 100)}%`, background: "#7c3aed" }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
