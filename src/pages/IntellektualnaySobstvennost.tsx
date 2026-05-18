import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function IntellektualnaySobstvennost() {
  useEffect(() => {
    document.title = "Защита интеллектуальной собственности — иски и отзывы под ключ | Legis24";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) { el = document.createElement("link"); el.rel = rel; document.head.appendChild(el); }
      el.href = href;
    };
    setMeta("description", "Юридическая защита авторских прав и товарных знаков. Подготовка исков и отзывов за 24 часа.");
    setLink("canonical", "https://advokat-vsem.ru/intellektualnaya-sobstvennost");
    return () => {
      document.title = "Подготовка юридических документов за 24 часа — возражения ФНС, арбитраж | Legis24";
    };
  }, []);

  return (
    <div style={{ background: "var(--dark)", minHeight: "100vh", color: "var(--text)" }}>
      {/* Nav */}
      <nav className="px-6 md:px-12 py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <Link to="/">
          <img src="https://cdn.poehali.dev/projects/ec09f91e-5c19-456f-a8f1-620fce7cd143/bucket/9f3ffbe2-117b-415c-bd94-81fb0c9183e9.png"
            alt="Legis24" style={{ height: 36, width: "auto", borderRadius: 6 }} />
        </Link>
        <Link to="/" className="font-body text-xs flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: "var(--gold)" }}>
          <Icon name="ArrowLeft" size={14} />
          На главную
        </Link>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
              Специализированная практика
            </span>
          </div>
          <h1 className="font-display mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}>
            Защита интеллектуальной<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>собственности</span>
          </h1>
          <p className="font-body text-sm leading-7 mb-10 max-w-xl" style={{ color: "var(--text-muted)" }}>
            Споры о нарушении авторских прав, защита товарных знаков, борьба с незаконным копированием.
            Подготовка исков, отзывов и жалоб за 24 часа. Полное юридическое сопровождение под ключ.
          </p>
          <a href="https://t.me/intelectpro_bot" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 font-body font-bold text-xs tracking-widest uppercase rounded transition-all"
            style={{ background: "#229ED9", color: "#fff", letterSpacing: "0.08em" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
            <Icon name="Send" size={15} />
            Написать в Telegram
          </a>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Что делаем</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: "Copyright",
                title: "Судебные споры по авторским правам",
                desc: "Исковые заявления, отзывы, апелляционные жалобы. Полное сопровождение дела в суде.",
              },
              {
                icon: "Tag",
                title: "Товарные знаки",
                desc: "Защита зарегистрированных и незарегистрированных обозначений. Споры с нарушителями.",
              },
              {
                icon: "Shield",
                title: "Незаконное копирование",
                desc: "Пресечение нарушений, взыскание компенсации, обеспечительные меры.",
              },
            ].map(item => (
              <div key={item.title} className="p-6 rounded"
                style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.12)" }}>
                <div className="w-10 h-10 flex items-center justify-center rounded mb-5"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <Icon name={item.icon as "Copyright"} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-display text-base font-bold mb-3" style={{ color: "#fff" }}>{item.title}</h3>
                <p className="font-body text-sm leading-6" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>Стоимость</span>
          </div>
          <div className="rounded p-8 lg:p-10" style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "До 500 000 ₽", sub: "мин. 20 000 ₽", val: "10% от суммы иска" },
                { label: "Свыше 500 000 ₽", sub: "+ 2% от суммы превышения", val: "50 000 ₽ + 2%" },
              ].map(tier => (
                <div key={tier.label} className="p-5 rounded"
                  style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.1)" }}>
                  <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                    Сумма иска: {tier.label}
                  </p>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: "var(--gold)" }}>{tier.val}</p>
                  <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>{tier.sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
                Гонорар включает: анализ доказательной базы, подготовку правовой позиции, составление документа, подачу в суд.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 text-center" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#fff", fontWeight: 700 }}>
            Опишите ситуацию — через 24 часа<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>документ будет готов</span>
          </h2>
          <p className="font-body text-sm mb-8" style={{ color: "var(--text-muted)" }}>
            Чем раньше начат анализ — тем больше возможностей для защиты
          </p>
          <a href="https://t.me/intelectpro_bot" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 font-body font-bold text-xs tracking-widest uppercase rounded transition-all"
            style={{ background: "#229ED9", color: "#fff", letterSpacing: "0.08em" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
            <Icon name="Send" size={15} />
            Написать в Telegram
          </a>
          <p className="font-body text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            или отправьте на{" "}
            <a href="mailto:order@advokat-vsem.ru" style={{ color: "var(--gold)" }}>order@advokat-vsem.ru</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 text-center" style={{ background: "#050d1a", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <p className="font-body text-xs" style={{ color: "rgba(232,228,220,0.25)" }}>
          © 2026 Legis24 — юридический аналитический центр. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
