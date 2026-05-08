export const PARTNER_API = "https://functions.poehali.dev/d3a180ca-4111-4be5-ae8c-3ab5f6f4a6a9";

export const DADATA_TOKEN = import.meta.env.VITE_DADATA_API_KEY || "";

export type PartnerType = "legal" | "ip" | "self_employed" | "individual";

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  legal: "Юридическое лицо",
  ip: "Индивидуальный предприниматель",
  self_employed: "Самозанятый",
  individual: "Физическое лицо",
};

export type DealStatus = "new" | "negotiation" | "contract" | "paid" | "done";

export const DEAL_STATUS_META: Record<DealStatus, { label: string; color: string; bg: string; icon: string }> = {
  new:         { label: "Новый",             color: "#6b7280", bg: "rgba(107,114,128,0.1)", icon: "CircleDot" },
  negotiation: { label: "Переговоры",        color: "#d97706", bg: "rgba(217,119,6,0.1)",   icon: "MessageSquare" },
  contract:    { label: "Договор заключён",  color: "#2563eb", bg: "rgba(37,99,235,0.1)",   icon: "FileSignature" },
  paid:        { label: "Оплата поступила",  color: "#16a34a", bg: "rgba(22,163,74,0.1)",   icon: "CreditCard" },
  done:        { label: "Завершён",          color: "#15803d", bg: "rgba(21,128,61,0.1)",   icon: "CheckCircle2" },
};

export const DOC_CATEGORIES: Record<string, string> = {
  application: "Заявка",
  contract:    "Договор",
  act:         "Акт",
  passport:    "Паспорт",
  other:       "Прочее",
};

export interface Partner {
  id: number;
  status: string;
  partner_type: PartnerType;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  full_name?: string;
  short_name?: string;
  legal_address?: string;
  director_name?: string;
  bank_name?: string;
  bank_bik?: string;
  bank_account?: string;
  bank_corr?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  ref_code?: string;
  dadata_raw?: unknown;
  individual_full_name?: string;
  individual_birth_date?: string;
  individual_passport_series?: string;
  individual_passport_number?: string;
  individual_passport_issued_by?: string;
  individual_passport_issued_date?: string;
  individual_registration_address?: string;
  individual_snils?: string;
}

export interface Client {
  id: number;
  full_name: string;
  inn?: string;
  phone?: string;
  email?: string;
  contact_person?: string;
  current_status: DealStatus;
  deal_amount?: number;
  partner_reward?: number;
  reward_paid?: boolean;
  created_at: string;
  updated_at: string;
  partner_name?: string;
}

export interface ClientDetail extends Client {
  notes?: string;
  dadata_raw?: unknown;
  partner_contact?: string;
  source?: string;
  user_id?: number | null;
  ref_code?: string | null;
  user_login?: string | null;
  user_email?: string | null;
  user_name?: string | null;
}

export interface StatusEntry {
  status: DealStatus;
  comment?: string;
  created_at: string;
  changed_by?: string;
}

export interface Doc {
  id: number;
  file_name: string;
  file_url: string;
  file_size?: number;
  category: string;
  created_at: string;
}

export interface Comment {
  id: number;
  message: string;
  author_role: string;
  author?: string;
  created_at: string;
}

export interface Stats {
  total: number;
  by_status: Partial<Record<DealStatus, number>>;
  total_reward: number;
  paid_reward: number;
}

export async function apiPartner(sessionId: string, body: Record<string, unknown>) {
  const res = await fetch(PARTNER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Session-Id": sessionId },
    body: JSON.stringify(body),
  });
  return res.json();
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function fmtMoney(v?: number | null): string {
  if (v == null) return "—";
  const abs = Math.abs(v);
  if (abs >= 1_000_000_000) return `${(v / 1_000_000_000).toFixed(1)} млрд ₽`;
  if (abs >= 1_000_000) return `${(v / 1_000_000).toFixed(1)} млн ₽`;
  if (abs >= 1_000) return `${(v / 1_000).toFixed(0)} тыс. ₽`;
  return `${v.toLocaleString("ru-RU")} ₽`;
}

export function fmtFileSize(b?: number): string {
  if (!b) return "";
  if (b >= 1_000_000) return `${(b / 1_000_000).toFixed(1)} МБ`;
  if (b >= 1_000) return `${(b / 1_000).toFixed(0)} КБ`;
  return `${b} Б`;
}