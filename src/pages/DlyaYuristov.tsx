import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const TELEGRAM = "https://t.me/intelectpro_bot";
const EMAIL = "order@advokat-vsem.ru";

const faqs = [
  {
    q: "Это замена адвоката?",
    a: "Нет. Мы готовим документы; представительство ведёте вы.",
  },
  {
    q: "Можно без указания Legis24 клиенту?",
    a: "Обсуждается (white-label).",
  },
  {
    q: "Срочно — ночью получили иск?",
    a: "Пишите в Telegram с датой заседания.",
  },
  {
    q: "Только налоговые споры?",
    a: "Налоговые — основной профиль; иные арбитражные — по согласованию.",
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

const benefits = [
  { icon: "Zap", title: "Приоритетная очередь", desc: "Заявки юристов — в первую очередь" },
  { icon: "Clock", title: "Срок от 24 часов", desc: "Документ на следующий день" },
  { icon: "Target", title: "Работа под дедлайн", desc: "Понимаем процессуальные сроки" },
  { icon: "Lock", title: "Конфиденциальность", desc: "NDA по запросу; не раскрываем факт сотрудничества" },
  { icon: "EyeOff", title: "White-label", desc: "Документ без бренда Legis24 — по договорённости" },
];

export default function DlyaYuristov() {
  useSeoMeta("/dlya-yuristov/");
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
              Для коллег
            </span>
          </div>
          <h1
            className="font-display mb-6"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}
          >
            Аутсорсинг подготовки документов{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>для юристов и адвокатов</span>
          </h1>
          <p className="font-body text-sm leading-7 mb-10 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Дедлайн по иску, отзыву или возражению ФНС — а вы в заседании или в другом деле. Передайте подготовку документа: получите готовую позицию за 24 часа, клиент остаётся у вас.
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

      {/* Block 1 — Что передают коллеги */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Что передают коллеги
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "Scale", text: "Иски и отзывы в арбитраж" },
              { icon: "FileWarning", text: "Возражения и ответы по налоговым спорам" },
              { icon: "Timer", text: "Процессуальные документы под конкретный дедлайн" },
              { icon: "Eye", text: "Второе мнение по сложной позиции (анализ)" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-4 p-5 rounded"
                style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <Icon name={item.icon as "Scale"} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <p className="font-body text-sm leading-6" style={{ color: "var(--text)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 2 — Условия для практики */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Условия для практики
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.12)" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded mb-4"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <Icon name={b.icon as "Zap"} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="font-body text-sm font-semibold mb-2" style={{ color: "#fff" }}>{b.title}</h3>
                <p className="font-body text-xs leading-5" style={{ color: "var(--text-muted)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 3 — Прайс */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Стоимость
            </span>
          </div>
          <div className="rounded p-8" style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="flex flex-col gap-4">
              {[
                ["Анализ дела", "25 000 ₽", false],
                ["Отзыв / процессуальный документ", "30 000 ₽", false],
                ["Иск по налоговому спору", "45 000 ₽", false],
                ["Пакет «Акт ФНС + Иск»", "60 000 ₽", true],
              ].map(([label, price, highlight]) => (
                <div
                  key={label as string}
                  className="flex justify-between items-center py-4"
                  style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}
                >
                  <span className="font-body text-sm" style={{ color: "var(--text)" }}>{label as string}</span>
                  <div className="flex items-center gap-3">
                    {highlight && (
                      <span className="font-body text-xs line-through" style={{ color: "var(--text-muted)" }}>70 000 ₽</span>
                    )}
                    <span
                      className="font-display text-xl font-bold"
                      style={{ color: highlight ? "var(--gold)" : "var(--text)" }}
                    >
                      {price as string}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 — Как передать дело */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Как передать дело
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { num: "01", text: "Написать в Telegram или на order@advokat-vsem.ru" },
              { num: "02", text: "Кратко: тип документа, срок, сумма спора (если есть)" },
              { num: "03", text: "Материалы — файлом (безопасный канал)" },
              { num: "04", text: "Получить документ и передать клиенту от своего имени" },
            ].map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-5 p-5 rounded"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.08)" }}
              >
                <span
                  className="font-display text-xl font-bold flex-shrink-0"
                  style={{ color: "rgba(212,175,55,0.3)", minWidth: 28 }}
                >
                  {step.num}
                </span>
                <p className="font-body text-sm" style={{ color: "var(--text)" }}>{step.text}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs mt-5" style={{ color: "var(--text-muted)" }}>
            Для постоянных партнёров — личный кабинет и{" "}
            <Link to="/partner-help" style={{ color: "var(--gold)" }} className="hover:opacity-70">
              partner-help
            </Link>
            .
          </p>
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
            Передайте документ —{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>за 24 часа вернём готовую позицию</span>
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
              { label: "Судебные документы", to: "/sudebnye-dokumenty/" },
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
