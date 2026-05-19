import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const TELEGRAM = "https://t.me/intelectpro_bot";
const EMAIL = "order@advokat-vsem.ru";

const faqs = [
  {
    q: "В какой срок подать возражение на акт?",
    a: "Обычно — 1 месяц с даты получения акта. Пропуск срока существенно усложняет защиту; при срочности пишите в Telegram — оценим ситуацию.",
  },
  {
    q: "Вы подаёте возражение в ФНС за меня?",
    a: "Мы готовим документ; подача — через ваш ЛК налогоплательщика или ЭДО от вашего имени.",
  },
  {
    q: "Чем камеральная проверка отличается от выездной?",
    a: "Формат проверки влияет на состав акта и доказательств; возражение готовим под конкретный акт.",
  },
  {
    q: "Что если после возражения ФНС вынесет решение?",
    a: "Можно обжаловать решение в арбитражном суде — подготовим иск по налоговому спору или пакет «Акт + Иск».",
  },
  {
    q: "Работаете ли вы с юристами компании?",
    a: "Да, коллегам доступен аутсорсинг под дедлайн.",
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

export default function VozrazhenieFns() {
  useSeoMeta("/vozrazhenie-na-akt-fns/");
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
            Возражение на акт{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>налоговой проверки</span>
            {" "}за 24 часа
          </h1>
          <p className="font-body text-sm leading-7 mb-10 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Получили акт камеральной или выездной проверки? За сутки подготовим мотивированное возражение: разбор претензий ФНС, правовая позиция и готовый документ для подачи в инспекцию.
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
            <a
              href={`mailto:${EMAIL}`}
              className="font-body text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              или {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* Block 1 — Что такое возражение */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Что такое возражение
            </span>
          </div>
          <p className="font-body text-sm leading-7 max-w-3xl" style={{ color: "var(--text-muted)" }}>
            Возражение на акт налоговой проверки — письменная позиция налогоплательщика по результатам проверки. Его подают в срок одного месяца с даты получения акта (ст. 6.1 НК РФ). В документе оспаривают выводы инспекции, ссылаются на нормы НК РФ, учёт и судебную практику.
          </p>
          <p className="font-body text-sm leading-7 mt-4 max-w-3xl" style={{ color: "var(--text-muted)" }}>
            Legis24 готовит возражения для компаний и ИП по всей России: вы передаёте акт и материалы, мы возвращаем готовый документ — вы подаёте его в ФНС самостоятельно (ЛК налогоплательщика или ЭДО).
          </p>
        </div>
      </section>

      {/* Block 2 — Отличие от ответа на требование */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Чем отличается от ответа на требование
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
                  <th className="text-left py-3 pr-6" style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Параметр
                  </th>
                  <th className="text-left py-3 pr-6" style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Ответ на требование
                  </th>
                  <th className="text-left py-3" style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Возражение на акт
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Когда", "До акта, по запросу документов/пояснений", "После получения акта проверки"],
                  ["Документ", "Ответ, пояснения", "Возражение на акт"],
                ].map(([param, col1, col2]) => (
                  <tr key={param} style={{ borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
                    <td className="py-4 pr-6" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{param}</td>
                    <td className="py-4 pr-6" style={{ color: "var(--text)" }}>{col1}</td>
                    <td className="py-4" style={{ color: "var(--text)" }}>{col2}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-4 pr-6" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Ссылка</td>
                  <td className="py-4 pr-6">
                    <Link to="/otvet-na-trebovanie-fns/" style={{ color: "var(--gold)" }} className="hover:opacity-70 transition-opacity">
                      Ответ на требование ФНС →
                    </Link>
                  </td>
                  <td className="py-4" style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>вы здесь</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Block 3 — Что входит */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Что входит в услугу
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: "FileSearch", text: "Анализ акта и приложений" },
              { icon: "Calculator", text: "Проверка расчётов и правовых выводов инспекции" },
              { icon: "BookOpen", text: "Подбор судебной практики" },
              { icon: "FileText", text: "Подготовка возражения с доводами и ссылками на документы" },
              { icon: "Compass", text: "Рекомендации по подаче и дальнейшим шагам (при необходимости — иск в арбитраж)" },
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
                  <Icon name={item.icon as "FileSearch"} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <p className="font-body text-sm leading-6" style={{ color: "var(--text)" }}>{item.text}</p>
              </div>
            ))}
          </div>
          <p className="font-body text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            Срок: от 24 часов после получения полного комплекта материалов.
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
              <p className="font-display text-3xl font-bold" style={{ color: "var(--gold)" }}>70 000 ₽</p>
              <p className="font-body text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                Возражение на акт или решение ФНС
              </p>
            </div>
            <div className="pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
              <p className="font-body text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Дополнительно
              </p>
              <div className="flex flex-col gap-3">
                {[
                  ["Правовое заключение по позиции", "25 000 ₽"],
                  ["Пакет «Акт ФНС + Иск»", "60 000 ₽"],
                ].map(([label, price]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="font-body text-sm" style={{ color: "var(--text)" }}>{label}</span>
                    <span className="font-body text-sm font-semibold" style={{ color: "var(--gold)" }}>{price}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs mt-3" style={{ color: "var(--text-muted)" }}>
                Подробнее о пакете —{" "}
                <Link to="/nalogovye-spory/" style={{ color: "var(--gold)" }} className="hover:opacity-70">
                  налоговые споры →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5 — Кейс */}
      <section className="py-16 px-6 md:px-12" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
            <span className="font-body text-xs tracking-widest uppercase" style={{ color: "var(--gold)" }}>
              Кейс
            </span>
          </div>
          <div
            className="rounded p-8"
            style={{ background: "var(--dark)", border: "1px solid rgba(212,175,55,0.15)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-xs uppercase tracking-widest px-3 py-1 rounded"
                style={{ background: "rgba(212,175,55,0.1)", color: "var(--gold)", border: "1px solid rgba(212,175,55,0.2)" }}>
                24 часа
              </span>
              <span className="font-body text-xs" style={{ color: "var(--text-muted)" }}>Возражения по акту ФНС</span>
            </div>
            <p className="font-body text-sm leading-7" style={{ color: "var(--text)" }}>
              Доначисления на <strong style={{ color: "#fff" }}>150 млн ₽</strong>. После анализа акта и подготовки возражений снижены до{" "}
              <strong style={{ color: "var(--gold)" }}>43 млн ₽</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Block 6 — FAQ */}
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

      {/* Block 7 — CTA */}
      <section className="py-20 px-6 md:px-12 text-center" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6" style={{ color: "#fff" }}>
            Получили акт ФНС —<br />
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>через 24 часа будет возражение</span>
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
              { label: "Ответ на требование ФНС", to: "/otvet-na-trebovanie-fns/" },
              { label: "Налоговые споры", to: "/nalogovye-spory/" },
              { label: "Судебные документы", to: "/sudebnye-dokumenty/" },
              { label: "Для юристов", to: "/dlya-yuristov/" },
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
