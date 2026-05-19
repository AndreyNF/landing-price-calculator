import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const TELEGRAM = "https://t.me/intelectpro_bot";
const EMAIL = "order@advokat-vsem.ru";

const faqs = [
  {
    q: "Чем ответ на требование отличается от возражения на акт?",
    a: "Ответ — на запрос до или вне акта; возражение — на уже составленный акт проверки.",
  },
  {
    q: "Можно ли не отвечать на требование?",
    a: "Игнорирование часто ведёт к доначислениям и акту. Лучше ответить в срок или запросить продление (если применимо).",
  },
  {
    q: "Вы помогаете собрать документы?",
    a: "Готовим правовую часть ответа; первичку предоставляет клиент.",
  },
  {
    q: "Работаете по всей России?",
    a: "Да, дистанционно.",
  },
  {
    q: "Срочно — завтра срок?",
    a: "Напишите в Telegram с датой требования — оценим возможность ускорения.",
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

export default function OtvetTrebovanieFns() {
  useSeoMeta("/otvet-na-trebovanie-fns/");
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
              Взаимодействие с ФНС
            </span>
          </div>
          <h1
            className="font-display mb-6"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", fontWeight: 700, lineHeight: 1.1 }}
          >
            Ответ на требование{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>ФНС</span>{" "}
            и налоговой инспекции
          </h1>
          <p className="font-body text-sm leading-7 mb-10 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Налоговая запросила документы или пояснения? Подготовим структурированный ответ: по сути, в нужном формате и с учётом сроков — чтобы снизить риск доначислений и перехода к акту проверки.
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

      {/* Block 1 — Какие требования закрываем */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Какие требования закрываем
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "FileText", text: "Требование о представлении документов" },
              { icon: "MessageSquare", text: "Запрос пояснений по операциям" },
              { icon: "Receipt", text: "Требования по НДС, налогу на прибыль, УСН, НДФЛ" },
              { icon: "Mail", text: "Уведомления и письма, требующие мотивированного ответа" },
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
                  <Icon name={item.icon as "FileText"} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <p className="font-body text-sm leading-6" style={{ color: "var(--text)" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div
            className="mt-5 p-4 rounded flex items-start gap-3"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}
          >
            <Icon name="AlertCircle" size={16} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
            <p className="font-body text-xs leading-6" style={{ color: "var(--text-muted)" }}>
              Если уже выставлен акт проверки — нужно{" "}
              <Link to="/vozrazhenie-na-akt-fns/" style={{ color: "var(--gold)" }} className="hover:opacity-70">
                возражение на акт
              </Link>
              , а не ответ на требование.
            </p>
          </div>
        </div>
      </section>

      {/* Block 2 — Что делаем */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Что делаем
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {[
              "Разбор требования и перечня документов",
              "Анализ переданных вами материалов",
              "Подготовка ответа с правовой позицией",
              "Рекомендации по способу направления (ЛК, ЭДО)",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 rounded"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.08)" }}
              >
                <span
                  className="font-display text-xl font-bold flex-shrink-0"
                  style={{ color: "rgba(212,175,55,0.3)", minWidth: 28 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body text-sm" style={{ color: "var(--text)" }}>{step}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs mt-5" style={{ color: "var(--text-muted)" }}>
            Срок: от 24 часов.
          </p>
        </div>
      </section>

      {/* Block 3 — Сроки ответа */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Сроки ответа
            </span>
          </div>
          <p className="font-body text-sm leading-7 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Срок зависит от вида требования (часто 5–30 рабочих дней). В сопроводительном письме к ответу указываем реквизиты требования и дату. При риске срыва срока — приоритетная обработка (обсуждается при обращении).
          </p>
        </div>
      </section>

      {/* Block 4 — Цена */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Стоимость
            </span>
          </div>
          <div className="rounded p-8" style={{ background: "var(--dark-card)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="mb-6">
              <p className="font-body text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                Основная услуга
              </p>
              <p className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>от 10 000 ₽</p>
              <p className="font-body text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                Ответ на письмо / требование / уведомление
              </p>
            </div>
            <div className="pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Связанные услуги
              </p>
              <div className="flex flex-col gap-3">
                {[
                  ["Правовое заключение", "25 000 ₽"],
                  ["Возражение на акт", "70 000 ₽"],
                ].map(([label, price]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="font-body text-sm" style={{ color: "var(--text)" }}>{label}</span>
                    <span className="font-body text-sm font-semibold" style={{ color: "var(--gold)" }}>{price}</span>
                  </div>
                ))}
              </div>
            </div>
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
            Требование ФНС —{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>подготовим ответ за 24 часа</span>
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
              { label: "Возражение на акт ФНС", to: "/vozrazhenie-na-akt-fns/" },
              { label: "Налоговые споры", to: "/nalogovye-spory/" },
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
