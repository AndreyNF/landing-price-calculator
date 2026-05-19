import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const TELEGRAM = "https://t.me/intelectpro_bot";
const EMAIL = "order@advokat-vsem.ru";

const faqs = [
  {
    q: "Подадите иск в суд за нас?",
    a: "Готовим документ; подача — от имени клиента или его представителя.",
  },
  {
    q: "Берёте ли дела не налоговые?",
    a: "Да, по согласованию — укажите тип спора при обращении.",
  },
  {
    q: "Сколько времени на отзыв?",
    a: "Стандарт — 24 часа с момента получения материалов; срочные — в Telegram.",
  },
  {
    q: "Госпошлина?",
    a: "Рассчитывает и уплачивает клиент; при необходимости подскажем ориентиры в переписке.",
  },
  {
    q: "Для юристов есть отдельные условия?",
    a: "Да — аутсорсинг для коллег.",
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

export default function SudebnyeDokumenty() {
  useSeoMeta("/sudebnye-dokumenty/");
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
              Арбитражные споры
            </span>
          </div>
          <h1
            className="font-display mb-6"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}
          >
            Подготовка исков и отзывов{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>для арбитража</span>
          </h1>
          <p className="font-body text-sm leading-7 mb-10 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Судебный спор в арбитраже — это сроки и процессуальная точность. Подготовим иск, отзыв на иск или иной процессуальный документ за 24 часа: с расчётом требований, ссылками на нормы и практику.
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

      {/* Block 1 — Какие документы готовим */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Какие документы готовим
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                  <th className="text-left py-3 pr-8" style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Документ
                  </th>
                  <th className="text-left py-3" style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Когда нужен
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Исковое заявление", "Обжалование решения ФНС, взыскание, корпоративный спор"],
                  ["Отзыв на иск", "Вас привлекли ответчиком, дедлайн заседания"],
                  ["Возражения / уточнение требований", "По ходу дела"],
                ].map(([doc, when]) => (
                  <tr key={doc} style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                    <td className="py-4 pr-8 font-medium" style={{ color: "#fff" }}>{doc}</td>
                    <td className="py-4" style={{ color: "var(--text-muted)" }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            Споры: налоговые, корпоративные, договорные (по согласованию).
          </p>
        </div>
      </section>

      {/* Block 2 — Прайс */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Стоимость
            </span>
          </div>
          <div className="rounded p-8" style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="flex flex-col gap-4">
              {[
                ["Анализ дела", "25 000 ₽"],
                ["Отзыв / процессуальный документ", "30 000 ₽"],
                ["Иск по налоговому спору", "45 000 ₽"],
              ].map(([label, price]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-4"
                  style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
                >
                  <span className="font-body text-sm" style={{ color: "var(--text)" }}>{label}</span>
                  <span className="font-display text-xl font-bold" style={{ color: "var(--gold)" }}>{price}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-xs mt-5" style={{ color: "var(--text-muted)" }}>
              Срок: от 24 часов.
            </p>
          </div>
        </div>
      </section>

      {/* Block 3 — Сравнение */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Самостоятельно или через Legis24
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div
              className="p-6 rounded"
              style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.08)" }}
            >
              <h3 className="font-body text-sm font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
                Самостоятельно
              </h3>
              <ul className="flex flex-col gap-2">
                {["3–6+ часов на подготовку", "Риск процессуальных ошибок", "Отвлечение от клиента"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm" style={{ color: "var(--text-muted)" }}>
                    <Icon name="X" size={14} style={{ color: "#666" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="p-6 rounded"
              style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.25)" }}
            >
              <h3 className="font-body text-sm font-semibold mb-4" style={{ color: "var(--gold)" }}>
                Через Legis24
              </h3>
              <ul className="flex flex-col gap-2">
                {["Готовая позиция за сутки", "Второй взгляд на дело", "Работа под ваш дедлайн"].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body text-sm" style={{ color: "var(--text)" }}>
                    <Icon name="Check" size={14} style={{ color: "var(--gold)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="font-body text-xs mt-4 pt-4" style={{ color: "var(--text-muted)", borderTop: "1px solid rgba(212,175,55,0.1)" }}>
                Вы ведёте дело — мы готовим документ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 — Кейсы */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Кейсы
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                tag: "24 часа",
                title: "Иск по налоговому спору",
                text: "Отказ УФНС, срок на иск — 26 часов. Иск с обоснованием подан в срок, дело принято к производству.",
              },
              {
                tag: "< 24 часов",
                title: "Срочный отзыв на иск",
                text: "Иск на 4,3 млн ₽, заседание через 5 дней. Отзыв к утру; требования снижены на 2,1 млн ₽.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded p-6"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-body text-xs uppercase tracking-widest px-3 py-1 rounded"
                    style={{ background: "rgba(212,175,55,0.1)", color: "var(--gold)", border: "1px solid rgba(212,175,55,0.2)" }}
                  >
                    {c.tag}
                  </span>
                  <span className="font-body text-xs" style={{ color: "var(--text-muted)" }}>{c.title}</span>
                </div>
                <p className="font-body text-sm leading-7" style={{ color: "var(--text)" }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5 — FAQ */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
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
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6" style={{ color: "#fff" }}>
            Дедлайн по арбитражу —{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>документ за 24 часа</span>
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
            Связанные услуги
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "На главную", to: "/" },
              { label: "Налоговые споры", to: "/nalogovye-spory/" },
              { label: "Для юристов", to: "/dlya-yuristov/" },
              { label: "Возражение на акт ФНС", to: "/vozrazhenie-na-akt-fns/" },
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
