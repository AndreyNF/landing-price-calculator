import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const TELEGRAM = "https://t.me/intelectpro_bot";
const EMAIL = "order@advokat-vsem.ru";

const faqs = [
  {
    q: "С чего начать при налоговой проверке?",
    a: "С требования или акта — см. схему выше. Напишите в Telegram с описанием ситуации — подскажем этап и нужный документ.",
  },
  {
    q: "Вы представляете в суде?",
    a: "Готовим документы; представительство — по отдельному согласованию.",
  },
  {
    q: "Досудебное урегулирование?",
    a: "Помогаем на этапе возражения и переговоров с ФНС документами и позицией.",
  },
  {
    q: "География?",
    a: "Вся РФ, удалённо.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const stages = [
  {
    num: "01",
    label: "Требование ФНС",
    result: "Ответ на требование",
    link: "/otvet-na-trebovanie-fns/",
    price: "от 10 000 ₽",
  },
  {
    num: "02",
    label: "Акт проверки",
    result: "Возражение на акт",
    link: "/vozrazhenie-na-akt-fns/",
    price: "70 000 ₽",
  },
  {
    num: "03",
    label: "Решение / отказ",
    result: "Иск в арбитраж",
    link: "/sudebnye-dokumenty/",
    price: "от 30 000 ₽",
  },
];

export default function NalogovyeSpory() {
  useSeoMeta("/nalogovye-spory/");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--dark)", minHeight: "100vh", color: "var(--text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Nav */}
      <nav
        className="px-6 md:px-12 py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
      >
        <Link to="/">
          <img
            src="https://cdn.poehali.dev/projects/ec09f91e-5c19-456f-a8f1-620fce7cd143/bucket/9f3ffbe2-117b-415c-bd94-81fb0c9183e9.png"
            alt="Legis24"
            style={{ height: 36, width: "auto", borderRadius: 6 }}
          />
        </Link>
        <Link
          to="/"
          className="font-body text-xs flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: "var(--gold)" }}
        >
          <Icon name="ArrowLeft" size={14} />
          На главную
        </Link>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span
              className="font-body text-xs tracking-widest uppercase"
              style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
            >
              Полный цикл защиты
            </span>
          </div>
          <h1
            className="font-display mb-6"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}
          >
            Налоговые споры:{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>досудебный этап и арбитраж</span>
          </h1>
          <p className="font-body text-sm leading-7 mb-10 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Legis24 — юридический аналитический центр для бизнеса: от первого требования ФНС до иска в арбитражный суд. Готовим документы за 24 часа, работаем по всей России онлайн.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 font-body font-bold text-xs tracking-widest uppercase rounded transition-all btn-gold"
            >
              <Icon name="Send" size={15} />
              Написать в Telegram
            </a>
            <a href={`mailto:${EMAIL}`} className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
              или {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* Block 1 — Дорожная карта */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Дорожная карта клиента
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-0">
            {stages.map((stage, i) => (
              <div key={stage.num} className="flex md:flex-col items-start md:items-center flex-1">
                <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-2 flex-1">
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full font-display font-bold"
                    style={{ background: "rgba(212,175,55,0.12)", border: "2px solid rgba(212,175,55,0.4)", color: "var(--gold)", fontSize: "0.75rem" }}
                  >
                    {stage.num}
                  </div>
                  <div className="flex-1 md:text-center py-4 md:py-2">
                    <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
                      {stage.label}
                    </p>
                    <Link
                      to={stage.link}
                      className="font-body text-sm font-semibold hover:opacity-70 transition-opacity"
                      style={{ color: "#fff" }}
                    >
                      {stage.result}
                    </Link>
                    <p className="font-body text-xs mt-1" style={{ color: "var(--gold)" }}>
                      {stage.price}
                    </p>
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <div
                    className="hidden md:block h-px flex-shrink-0 self-center"
                    style={{ width: 40, background: "rgba(212,175,55,0.2)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-8">
            <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                  {["Этап", "Услуга", "Цена от"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 pr-6"
                      style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Ответ на требование", "/otvet-na-trebovanie-fns/", "10 000 ₽"],
                  ["2", "Возражение на акт", "/vozrazhenie-na-akt-fns/", "70 000 ₽"],
                  ["3", "Иск / отзыв в арбитраж", "/sudebnye-dokumenty/", "30–45 000 ₽"],
                  ["—", "Анализ позиции", "/", "25 000 ₽"],
                ].map(([num, service, link, price]) => (
                  <tr key={num} style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                    <td className="py-4 pr-6" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{num}</td>
                    <td className="py-4 pr-6">
                      <Link to={link} style={{ color: "#fff" }} className="hover:opacity-70 transition-opacity">
                        {service}
                      </Link>
                    </td>
                    <td className="py-4 font-semibold" style={{ color: "var(--gold)" }}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Block 2 — Пакет */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Выгодный пакет
            </span>
          </div>
          <div
            className="rounded p-8"
            style={{ background: "var(--dark-card)", border: "2px solid rgba(212,175,55,0.3)" }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                  Пакет
                </p>
                <p className="font-display text-2xl font-bold mb-1" style={{ color: "#fff" }}>Акт ФНС + Иск</p>
                <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
                  Единая правовая позиция: анализ акта → возражение → подготовка иска
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>60 000 ₽</span>
                  <span className="font-body text-sm line-through" style={{ color: "var(--text-muted)" }}>70 000 ₽</span>
                </div>
                <span className="font-body text-xs px-3 py-1 rounded" style={{ background: "rgba(212,175,55,0.12)", color: "var(--gold)" }}>
                  экономия 10 000 ₽
                </span>
              </div>
            </div>
            <div className="mt-6 pt-6 flex" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              <a
                href={TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 font-body font-bold text-xs tracking-widest uppercase rounded transition-all btn-gold"
              >
                <Icon name="Send" size={14} />
                Оформить пакет
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3 — Почему Legis24 */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Почему Legis24
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "Clock", text: "Срок 24 часа на документ" },
              { icon: "DollarSign", text: "Фиксированные цены на ключевые услуги" },
              { icon: "TrendingDown", text: "Кейс: доначисления 150 → 43 млн ₽" },
              { icon: "Briefcase", text: "Для юристов — аутсорсинг под дедлайн" },
              { icon: "Users", text: "Для бухгалтеров — партнёрка до 30%" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-4 p-5 rounded"
                style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <Icon name={item.icon as "Clock"} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <p className="font-body text-sm" style={{ color: "var(--text)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4 — FAQ */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Частые вопросы
            </span>
          </div>
          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-body text-sm font-medium" style={{ color: "#fff" }}>{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={16}
                    style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}
                  />
                </button>
                {openFaq === i && (
                  <p className="font-body text-sm leading-7 pb-5" style={{ color: "var(--text-muted)" }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 text-center" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6" style={{ color: "#fff" }}>
            Налоговый спор —{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>разберём позицию за 24 часа</span>
          </h2>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 font-body font-bold text-xs tracking-widest uppercase rounded transition-all btn-gold mb-4"
          >
            <Icon name="Send" size={15} />
            Написать в Telegram
          </a>
          <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
            или{" "}
            <a href={`mailto:${EMAIL}`} style={{ color: "var(--gold)" }}>
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* Перелинковка */}
      <section className="py-12 px-6 md:px-12" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs uppercase tracking-widest mb-5" style={{ color: "var(--text-muted)" }}>
            Все услуги
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "На главную", to: "/" },
              { label: "Ответ на требование ФНС", to: "/otvet-na-trebovanie-fns/" },
              { label: "Возражение на акт ФНС", to: "/vozrazhenie-na-akt-fns/" },
              { label: "Судебные документы", to: "/sudebnye-dokumenty/" },
              { label: "Для юристов", to: "/dlya-yuristov/" },
              { label: "Для бухгалтеров", to: "/partner-help" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-xs px-4 py-2 rounded transition-all hover:opacity-80"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.15)", color: "var(--gold)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <p className="font-body text-xs text-center" style={{ color: "var(--text-muted)" }}>
          © 2026 Legis24
        </p>
      </footer>
    </div>
  );
}
