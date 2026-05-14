import Icon from "@/components/ui/icon";

export const NAV_ITEMS = [
  { id: "register", label: "Регистрация" },
  { id: "cabinet", label: "Кабинет" },
  { id: "clients", label: "Клиенты" },
  { id: "reflink", label: "Реф. ссылка" },
  { id: "promo", label: "Промо" },
  { id: "finances", label: "Финансы" },
  { id: "profile", label: "Профиль" },
];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export const CARD_STYLE: React.CSSProperties = {
  background: "var(--dark-card)",
  border: "1px solid rgba(212,175,55,0.1)",
  borderRadius: 12,
};

export const GOLD_ACCENT_LINE = (
  <div
    style={{
      width: 36,
      height: 2,
      background: "linear-gradient(90deg,#D4AF37,transparent)",
      borderRadius: 2,
      marginBottom: 12,
    }}
  />
);

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      {GOLD_ACCENT_LINE}
      <h2
        className="font-display text-2xl md:text-3xl font-bold"
        style={{ color: "#fff" }}
      >
        {children}
      </h2>
    </div>
  );
}

export function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
      style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
    >
      {n}
    </span>
  );
}
