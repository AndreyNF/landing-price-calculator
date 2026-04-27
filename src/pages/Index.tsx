import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ───────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: "Scale",
    title: "Судебное представительство",
    subtitle: "Арбитраж и суды общей юрисдикции",
    description:
      "Полное ведение дела от первой инстанции до кассации. Защита имущественных и неимущественных прав в спорах любой сложности.",
    price: "от 150 000 ₽",
    tag: "Наиболее востребовано",
  },
  {
    icon: "FileText",
    title: "Договорная работа",
    subtitle: "Разработка и экспертиза",
    description:
      "Составление договоров любой сложности, юридическая экспертиза контрагентов, минимизация рисков при заключении сделок.",
    price: "от 45 000 ₽",
    tag: null,
  },
  {
    icon: "Building2",
    title: "Корпоративное право",
    subtitle: "M&A, структурирование бизнеса",
    description:
      "Сделки по слиянию и поглощению, реорганизация, защита акционеров, корпоративные конфликты и их урегулирование.",
    price: "от 250 000 ₽",
    tag: null,
  },
  {
    icon: "Shield",
    title: "Уголовно-правовая защита",
    subtitle: "Белые воротнички и бизнес",
    description:
      "Защита руководителей и собственников бизнеса по статьям экономических преступлений. Сопровождение на всех стадиях следствия.",
    price: "от 500 000 ₽",
    tag: "Премиум",
  },
  {
    icon: "Landmark",
    title: "Налоговые споры",
    subtitle: "ФНС и налоговые проверки",
    description:
      "Оспаривание решений налоговых органов, защита при выездных и камеральных проверках, возврат переплат и НДС.",
    price: "от 120 000 ₽",
    tag: null,
  },
  {
    icon: "Globe",
    title: "Международное право",
    subtitle: "Юрисдикции и трансграничные споры",
    description:
      "Структурирование активов в иностранных юрисдикциях, международный арбитраж, защита в санкционных ситуациях.",
    price: "от 400 000 ₽",
    tag: null,
  },
];

const FAQS = [
  {
    q: "Как проходит первичная консультация?",
    a: "Первичная встреча длится 60–90 минут. Мы изучаем документы, оцениваем перспективы дела и предлагаем стратегию защиты. Консультация проводится лично в офисе или дистанционно по защищённому каналу.",
  },
  {
    q: "Из чего складывается стоимость услуг?",
    a: "Гонорар формируется из сложности дела, объёма документов, количества судебных заседаний и срочности. Используйте наш калькулятор для предварительной оценки или запросите индивидуальное коммерческое предложение.",
  },
  {
    q: "Работаете ли вы с клиентами из регионов?",
    a: "Да. Мы представляем интересы клиентов в арбитражных судах по всей России и за рубежом. Документооборот полностью цифровой, встречи — по видеосвязи или в московском офисе.",
  },
  {
    q: "Каков средний срок рассмотрения дела в арбитраже?",
    a: "Первая инстанция — от 3 до 8 месяцев. Апелляция — 2–3 месяца. Кассация — ещё 2–4 месяца. Точный прогноз зависит от суда и загруженности. Мы всегда честно говорим о реалистичных сроках.",
  },
  {
    q: "Возможен ли гонорар за результат?",
    a: "В отдельных категориях дел — да. Мы практикуем смешанную модель: фиксированная часть покрывает расходы, процент от взысканной суммы — это наш результат. Условия обсуждаются индивидуально.",
  },
  {
    q: "Как обеспечивается конфиденциальность?",
    a: "Адвокатская тайна защищена законом. Все сотрудники подписывают NDA. Переписка ведётся по зашифрованным каналам. Мы не разглашаем сам факт сотрудничества с клиентом.",
  },
];

const SERVICE_OPTIONS = [
  { value: "litigation", label: "Судебное представительство", base: 150000 },
  { value: "contract", label: "Договорная работа", base: 45000 },
  { value: "corporate", label: "Корпоративное право", base: 250000 },
  { value: "criminal", label: "Уголовно-правовая защита", base: 500000 },
  { value: "tax", label: "Налоговые споры", base: 120000 },
  { value: "international", label: "Международное право", base: 400000 },
];

// ─── CALCULATOR ──────────────────────────────────────────────────────────────

function Calculator() {
  const [service, setService] = useState("litigation");
  const [claimAmount, setClaimAmount] = useState(5000000);
  const [urgency, setUrgency] = useState(1);
  const [complexity, setComplexity] = useState(2);

  const selectedService = SERVICE_OPTIONS.find((s) => s.value === service)!;

  const urgencyMult = [1, 1, 1.4, 1.9][urgency];
  const complexityMult = 0.7 + complexity * 0.2;
  const claimMult = claimAmount > 50000000 ? 1.25 : claimAmount > 10000000 ? 1.1 : 1;

  const estimate = Math.round(
    selectedService.base * urgencyMult * complexityMult * claimMult
  );

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(n);

  const formatClaim = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)} млн ₽`;
    return `${(n / 1000).toFixed(0)} тыс ₽`;
  };

  const urgencyLabels = ["", "Стандарт", "Повышенная", "Экстренная"];
  const complexityLabels = [
    "",
    "Минимальная",
    "Невысокая",
    "Средняя",
    "Высокая",
    "Исключительная",
  ];

  const claimRef = useRef<HTMLInputElement>(null);
  const urgencyRef = useRef<HTMLInputElement>(null);
  const complexityRef = useRef<HTMLInputElement>(null);

  const updateFill = (el: HTMLInputElement | null, min: number, max: number, val: number) => {
    if (!el) return;
    const pct = ((val - min) / (max - min)) * 100;
    el.style.setProperty("--range-fill", `${pct}%`);
  };

  useEffect(() => updateFill(claimRef.current, 500000, 100000000, claimAmount), [claimAmount]);
  useEffect(() => updateFill(urgencyRef.current, 1, 3, urgency), [urgency]);
  useEffect(() => updateFill(complexityRef.current, 1, 5, complexity), [complexity]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div>
          <label
            className="block font-body text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Тип услуги
          </label>
          <div className="space-y-2">
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setService(opt.value)}
                className="w-full text-left px-4 py-3 font-body text-sm transition-all duration-200"
                style={{
                  background:
                    service === opt.value
                      ? "rgba(201,168,76,0.12)"
                      : "transparent",
                  border: `1px solid ${
                    service === opt.value
                      ? "rgba(201,168,76,0.5)"
                      : "rgba(201,168,76,0.1)"
                  }`,
                  color:
                    service === opt.value ? "var(--gold-light)" : "var(--mist)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label
              className="font-body text-xs tracking-widest uppercase"
              style={{ color: "var(--gold)" }}
            >
              Сумма иска
            </label>
            <span
              className="font-display text-xl"
              style={{ color: "var(--gold-light)" }}
            >
              {formatClaim(claimAmount)}
            </span>
          </div>
          <input
            ref={claimRef}
            type="range"
            min={500000}
            max={100000000}
            step={500000}
            value={claimAmount}
            onChange={(e) => setClaimAmount(Number(e.target.value))}
            className="w-full"
          />
          <div
            className="flex justify-between mt-1 font-body text-xs"
            style={{ color: "var(--gold-dim)" }}
          >
            <span>500 тыс</span>
            <span>100 млн</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label
              className="font-body text-xs tracking-widest uppercase"
              style={{ color: "var(--gold)" }}
            >
              Срочность
            </label>
            <span className="font-body text-sm" style={{ color: "var(--mist)" }}>
              {urgencyLabels[urgency]}
            </span>
          </div>
          <input
            ref={urgencyRef}
            type="range"
            min={1}
            max={3}
            step={1}
            value={urgency}
            onChange={(e) => setUrgency(Number(e.target.value))}
            className="w-full"
          />
          <div
            className="flex justify-between mt-1 font-body text-xs"
            style={{ color: "var(--gold-dim)" }}
          >
            <span>Стандарт</span>
            <span>+40%</span>
            <span>+90%</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label
              className="font-body text-xs tracking-widest uppercase"
              style={{ color: "var(--gold)" }}
            >
              Сложность дела
            </label>
            <span className="font-body text-sm" style={{ color: "var(--mist)" }}>
              {complexityLabels[complexity]}
            </span>
          </div>
          <input
            ref={complexityRef}
            type="range"
            min={1}
            max={5}
            step={1}
            value={complexity}
            onChange={(e) => setComplexity(Number(e.target.value))}
            className="w-full"
          />
          <div
            className="flex justify-between mt-1 font-body text-xs"
            style={{ color: "var(--gold-dim)" }}
          >
            <span>Типовое</span>
            <span>Сложное</span>
            <span>Уникальное</span>
          </div>
        </div>

        <div
          className="p-6"
          style={{
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <p
            className="font-body text-xs tracking-widest uppercase mb-1"
            style={{ color: "var(--gold-dim)" }}
          >
            Предварительная оценка
          </p>
          <p
            className="font-display text-4xl font-light mb-2"
            style={{ color: "var(--gold-light)" }}
          >
            {formatMoney(estimate)}
          </p>
          <p
            className="font-body text-xs leading-relaxed"
            style={{ color: "var(--mist)", opacity: 0.5 }}
          >
            Расчёт носит ориентировочный характер. Точная стоимость определяется
            после изучения материалов дела.
          </p>
        </div>

        <button className="btn-gold w-full py-4 px-8">
          Запросить точное предложение
        </button>
      </div>
    </div>
  );
}

// ─── FAQ ITEM ────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="w-full flex items-center justify-between py-6 px-0 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span
          className="font-display text-lg font-medium"
          style={{ color: "var(--mist)" }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300"
          style={{
            color: "var(--gold)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <Icon name="Plus" size={18} />
        </span>
      </button>
      {open && (
        <div className="pb-6 animate-fade-in">
          <p
            className="font-body text-sm leading-7"
            style={{ color: "var(--mist)", opacity: 0.65 }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

const Index = () => {
  return (
    <div style={{ background: "var(--obsidian)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: "rgba(14,12,10,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
          <span
            className="font-display text-lg tracking-wider"
            style={{ color: "var(--gold-light)" }}
          >
            LEGIS
          </span>
          <div className="w-6 h-px" style={{ background: "var(--gold)" }} />
        </div>
        <div
          className="hidden md:flex items-center gap-8 font-body text-xs tracking-widest uppercase"
          style={{ color: "var(--mist)", opacity: 0.6 }}
        >
          <a href="#services" className="hover:opacity-100 transition-opacity">
            Услуги
          </a>
          <a href="#calculator" className="hover:opacity-100 transition-opacity">
            Калькулятор
          </a>
          <a href="#faq" className="hover:opacity-100 transition-opacity">
            FAQ
          </a>
        </div>
        <button className="btn-gold px-6 py-2.5 text-xs">Консультация</button>
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%),
            var(--obsidian)
          `,
        }}
      >
        <div
          className="absolute left-1/3 top-0 bottom-0 w-px hidden lg:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.06), transparent)",
          }}
        />
        <div
          className="absolute right-1/4 top-0 bottom-0 w-px hidden lg:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,76,0.04), transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <p
              className="animate-fade-up font-body text-xs tracking-widest uppercase mb-8"
              style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
            >
              Премиальная юридическая защита · Москва
            </p>

            <h1
              className="animate-fade-up-delay-1 font-display leading-tight mb-8"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 300,
                color: "var(--mist)",
              }}
            >
              Защита, которую
              <br />
              <span style={{ color: "var(--gold-light)", fontStyle: "italic" }}>
                заслуживает
              </span>
              <br />
              ваш бизнес
            </h1>

            <p
              className="animate-fade-up-delay-2 font-body text-base leading-8 mb-12 max-w-xl"
              style={{ color: "var(--mist)", opacity: 0.55 }}
            >
              Двадцать лет в арбитраже, корпоративных спорах и уголовной защите.
              Мы работаем с делами, которые другие не берут.
            </p>

            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4">
              <button className="btn-gold px-10 py-4">
                Записаться на консультацию
              </button>
              <button
                className="px-10 py-4 font-body font-medium text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "var(--gold-light)",
                  background: "transparent",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(201,168,76,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)")
                }
              >
                Смотреть услуги
              </button>
            </div>

            <div
              className="animate-fade-up-delay-3 mt-20 pt-10 border-t flex flex-wrap gap-12"
              style={{ borderColor: "rgba(201,168,76,0.12)" }}
            >
              {[
                ["20+", "лет практики"],
                ["98%", "выигранных дел"],
                ["₽12 млрд", "взыскано в пользу клиентов"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p
                    className="font-display text-3xl mb-1"
                    style={{ color: "var(--gold-light)", fontWeight: 300 }}
                  >
                    {num}
                  </p>
                  <p
                    className="font-body text-xs"
                    style={{ color: "var(--mist)", opacity: 0.45 }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 right-8 hidden lg:flex items-center gap-3"
          style={{ color: "var(--gold-dim)" }}
        >
          <Icon name="ChevronDown" size={14} />
          <span
            className="font-body text-xs tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            ПРОКРУТИТЕ
          </span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p
              className="font-body text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
            >
              Что мы делаем
            </p>
            <h2
              className="font-display text-5xl font-light"
              style={{ color: "var(--mist)" }}
            >
              Направления практики
            </h2>
            <div className="gold-line mt-6" />
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "rgba(201,168,76,0.08)" }}
          >
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card p-8 relative group">
                {s.tag && (
                  <span
                    className="absolute top-6 right-6 font-body text-xs px-3 py-1 tracking-wider"
                    style={{
                      background: "rgba(201,168,76,0.15)",
                      color: "var(--gold)",
                      border: "1px solid rgba(201,168,76,0.25)",
                    }}
                  >
                    {s.tag}
                  </span>
                )}
                <div className="mb-5 text-gold">
                  <Icon name={s.icon} size={22} />
                </div>
                <p
                  className="font-display text-2xl font-medium mb-1"
                  style={{ color: "var(--mist)" }}
                >
                  {s.title}
                </p>
                <p
                  className="font-body text-xs tracking-wide mb-4"
                  style={{ color: "var(--gold-dim)" }}
                >
                  {s.subtitle}
                </p>
                <p
                  className="font-body text-sm leading-7 mb-6"
                  style={{ color: "var(--mist)", opacity: 0.5 }}
                >
                  {s.description}
                </p>
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
                >
                  <span
                    className="font-display text-lg"
                    style={{ color: "var(--gold-light)" }}
                  >
                    {s.price}
                  </span>
                  <span
                    className="font-body text-xs tracking-widest uppercase"
                    style={{ color: "var(--gold-dim)" }}
                  >
                    Подробнее →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-8">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
          }}
        />
      </div>

      {/* CALCULATOR */}
      <section id="calculator" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p
              className="font-body text-xs tracking-widest uppercase mb-4"
              style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
            >
              Прозрачное ценообразование
            </p>
            <h2
              className="font-display text-5xl font-light"
              style={{ color: "var(--mist)" }}
            >
              Калькулятор стоимости
            </h2>
            <div className="gold-line mt-6" />
            <p
              className="mt-4 font-body text-sm max-w-xl"
              style={{ color: "var(--mist)", opacity: 0.45 }}
            >
              Получите предварительную оценку стоимости юридических услуг на
              основе параметров вашего дела.
            </p>
          </div>

          <Calculator />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-8">
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
          }}
        />
      </div>

      {/* FAQ */}
      <section id="faq" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div>
              <p
                className="font-body text-xs tracking-widest uppercase mb-4"
                style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
              >
                Ответы
              </p>
              <h2
                className="font-display text-5xl font-light"
                style={{ color: "var(--mist)" }}
              >
                Часто задаваемые вопросы
              </h2>
              <div className="gold-line mt-6" />
              <p
                className="mt-6 font-body text-sm leading-7"
                style={{ color: "var(--mist)", opacity: 0.45 }}
              >
                Если вы не нашли ответ на свой вопрос — свяжитесь с нами
                напрямую.
              </p>
              <button className="btn-gold mt-8 px-8 py-3 text-xs">
                Задать вопрос
              </button>
            </div>
            <div className="lg:col-span-2">
              {FAQS.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8">
        <div
          className="max-w-6xl mx-auto p-16 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.04) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
          />
          <p
            className="font-body text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
          >
            Начать работу
          </p>
          <h2
            className="font-display text-5xl font-light mb-6"
            style={{ color: "var(--mist)" }}
          >
            Ваш вопрос заслуживает
            <br />
            <span style={{ color: "var(--gold-light)", fontStyle: "italic" }}>
              экспертного решения
            </span>
          </h2>
          <p
            className="font-body text-sm mb-10 max-w-lg mx-auto"
            style={{ color: "var(--mist)", opacity: 0.5 }}
          >
            Первичная консультация — 60 минут. Оценим перспективы и предложим
            стратегию.
          </p>
          <button className="btn-gold px-12 py-4">
            Записаться на консультацию
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-12 px-8"
        style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: "var(--gold-dim)" }} />
            <span
              className="font-display text-lg tracking-wider"
              style={{ color: "var(--gold-dim)" }}
            >
              LEGIS
            </span>
            <div className="w-6 h-px" style={{ background: "var(--gold-dim)" }} />
          </div>
          <p
            className="font-body text-xs text-center"
            style={{ color: "var(--mist)", opacity: 0.3 }}
          >
            © 2024 LEGIS. Адвокатское бюро. Все права защищены.
          </p>
          <div
            className="flex gap-6 font-body text-xs tracking-widest"
            style={{ color: "var(--mist)", opacity: 0.3 }}
          >
            <span>Политика конфиденциальности</span>
            <span>·</span>
            <span>Соглашение</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;