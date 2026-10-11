import Icon from "@/components/ui/icon";

const CHANNELS = [
  { name: "Telegram", icon: "Send", href: "https://t.me/iskza24", label: "Telegram-канал Legis24" },
  { name: "Дзен", icon: "Newspaper", href: "https://dzen.ru/id/69f2f1c5cafb5f094713c7d2", label: "Legis24 в Дзене" },
  { name: "ВКонтакте", icon: "Users", href: "https://vk.ru/legis24ru", label: "Legis24 во ВКонтакте" },
];

export default function SocialChannels() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-body text-xs uppercase tracking-widest" style={{ color: "rgba(232,228,220,0.45)", letterSpacing: "0.15em" }}>
        Наши каналы
      </p>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {CHANNELS.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noopener"
            aria-label={c.label}
            className="flex items-center gap-2 font-body text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--gold)" }}
          >
            <span
              className="w-8 h-8 flex items-center justify-center rounded"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <Icon name={c.icon as "Send"} size={15} style={{ color: "var(--gold)" }} />
            </span>
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
