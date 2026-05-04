export const DADATA_TOKEN = import.meta.env.VITE_DADATA_API_KEY || "";
export const SUGGEST_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
export const FIND_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

export type SearchType = "inn" | "fio" | "address" | "okved";

export const SEARCH_OPTIONS = [
  { type: "inn" as SearchType, label: "По ИНН", placeholder: "Введите ИНН (10 или 12 цифр)", icon: "Hash", hint: "ИНН организации или ИП" },
  { type: "fio" as SearchType, label: "По директору / учредителю", placeholder: "Например: Иванов Иван", icon: "User", hint: "ФИО руководителя или учредителя" },
  { type: "address" as SearchType, label: "По адресу", placeholder: "Например: Москва, Ленина 1", icon: "MapPin", hint: "Юридический адрес организации" },
  { type: "okved" as SearchType, label: "По виду деятельности", placeholder: "Например: разработка программного обеспечения", icon: "Briefcase", hint: "Вид деятельности или код ОКВЭД" },
];

export interface Founder {
  type?: string;
  name?: string;
  inn?: string;
  share?: { value?: number; type?: string };
  capital?: { value?: number; type?: string };
}

export interface OkvedItem {
  code?: string;
  name?: string;
  main?: boolean;
}

export interface FinanceYear {
  year?: number;
  revenue?: number;
  expense?: number;
  profit?: number;
  assets?: number;
  debt_payable?: number;
  cash_flow?: number;
  tax_system?: string;
}

export interface License {
  series?: string;
  number?: string;
  issue_date?: string;
  expire_date?: string;
  activity?: string;
  authority?: string;
}

export interface PartyData {
  inn?: string;
  kpp?: string;
  ogrn?: string;
  ogrn_date?: number;
  type?: string;
  name?: { full_with_opf?: string; short_with_opf?: string; latin?: string };
  state?: { status?: string; registration_date?: number; liquidation_date?: number; actuality_date?: number };
  address?: { value?: string; data?: { postal_code?: string; region?: string; city?: string; street?: string; house?: string } };
  phones?: { value?: string; type?: string; data?: { number?: string } }[];
  emails?: { value?: string; type?: string }[];
  management?: { name?: string; post?: string; disqualified?: boolean };
  founders?: Founder[];
  managers?: { name?: string; inn?: string; post?: string }[];
  predecessors?: { name?: string; inn?: string; ogrn?: string }[];
  successors?: { name?: string; inn?: string; ogrn?: string }[];
  branch_type?: string;
  branch_count?: number;
  okved?: string;
  okved_type?: string;
  okveds?: OkvedItem[];
  employee_count?: number;
  finance?: FinanceYear;
  finances?: FinanceYear[];
  licenses?: License[];
  authorities?: {
    fts_registration?: { name?: string; code?: string };
    fts_report?: { name?: string; code?: string };
    pfr?: { name?: string; code?: string };
    sif?: { name?: string; code?: string };
  };
  capital?: { value?: number; type?: string };
}

export interface Party {
  value: string;
  data: PartyData;
}

export function statusLabel(status?: string): { text: string; color: string; bg: string } {
  switch (status) {
    case "ACTIVE": return { text: "Действующая", color: "var(--success)", bg: "var(--success-dim)" };
    case "LIQUIDATING": return { text: "В процессе ликвидации", color: "#d97706", bg: "rgba(217,119,6,0.08)" };
    case "LIQUIDATED": return { text: "Ликвидирована", color: "#ef4444", bg: "rgba(239,68,68,0.08)" };
    case "BANKRUPT": return { text: "Банкротство", color: "#ef4444", bg: "rgba(239,68,68,0.08)" };
    case "REORGANIZING": return { text: "Реорганизация", color: "#d97706", bg: "rgba(217,119,6,0.08)" };
    default: return { text: status || "—", color: "var(--text-muted)", bg: "var(--bg)" };
  }
}

export function fmtDate(ts?: number | string): string {
  if (!ts) return "—";
  const d = typeof ts === "number" ? new Date(ts) : new Date(ts);
  return d.toLocaleDateString("ru-RU");
}

export function fmtMoney(v?: number): string {
  if (v === undefined || v === null) return "—";
  const abs = Math.abs(v);
  const sign = v < 0 ? "−" : "";
  if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toFixed(1)} млрд ₽`;
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)} млн ₽`;
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(0)} тыс. ₽`;
  return `${sign}${abs.toLocaleString("ru-RU")} ₽`;
}
