import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── CALCULATOR LOGIC ────────────────────────────────────────────────────────

function calcIS(amount: number): number {
  if (amount <= 0) return 0;
  if (amount <= 500000) {
    return Math.max(amount * 0.1, 20000);
  }
  return 50000 + (amount - 500000) * 0.02;
}

function Calculator() {
  const [amount, setAmount] = useState(300000);
  const sliderRef = useRef<HTMLInputElement>(null);

  const fee = calcIS(amount);

  const formatRub = (n: number) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(n);

  const formatShort = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(".0", "")} млн`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)} тыс`;
    return String(n);
  };

  const updateFill = () => {
    const el = sliderRef.current;
    if (!el) return;
    const min = 50000, max = 5000000;
    const pct = ((amount - min) / (max - min)) * 100;
    el.style.setProperty("--range-fill", `${pct}%`);
  };

  useEffect(updateFill, [amount]);

  const examples = [
    { sum: 300000, label: "300 тыс" },
    { sum: 450000, label: "450 тыс" },
    { sum: 700000, label: "700 тыс" },
    { sum: 2000000, label: "2 млн" },
  ];

  return (
    <div
      className="p-8 lg:p-10"
      style={{
        background: "rgba(239,68,68,0.04)",
        border: "1px solid rgba(239,68,68,0.18)",
      }}
    >
      <p
        className="font-body text-xs tracking-widest uppercase mb-6"
        style={{ color: "var(--red)", letterSpacing: "0.2em" }}
      >
        Калькулятор — интеллектуальная собственность
      </p>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: slider */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <span className="font-body text-sm" style={{ color: "var(--mist)", opacity: 0.6 }}>
              Сумма иска
            </span>
            <span className="font-display text-3xl" style={{ color: "var(--mist)", fontWeight: 300 }}>
              {formatShort(amount)} ₽
            </span>
          </div>

          <input
            ref={sliderRef}
            type="range"
            min={50000}
            max={5000000}
            step={10000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mb-2"
          />
          <div className="flex justify-between font-body text-xs" style={{ color: "var(--mist-dim)" }}>
            <span>50 тыс</span>
            <span>5 млн</span>
          </div>

          {/* Quick picks */}
          <div className="flex flex-wrap gap-2 mt-5">
            {examples.map((ex) => (
              <button
                key={ex.sum}
                onClick={() => setAmount(ex.sum)}
                className="font-body text-xs px-3 py-1.5 transition-all duration-200"
                style={{
                  border: `1px solid ${amount === ex.sum ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
                  color: amount === ex.sum ? "#fff" : "var(--mist)",
                  background: amount === ex.sum ? "rgba(239,68,68,0.12)" : "transparent",
                  opacity: amount === ex.sum ? 1 : 0.55,
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>

          {/* Formula hint */}
          <div
            className="mt-6 p-4 font-body text-xs leading-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "var(--mist)",
              opacity: 0.6,
            }}
          >
            <strong style={{ color: "var(--mist-2)", opacity: 1 }}>Формула:</strong>
            <br />
            До 500 000 ₽ → 10% (мин. 20 000 ₽)
            <br />
            Свыше 500 000 ₽ → 50 000 ₽ + 2% от превышения
          </div>
        </div>

        {/* Right: result */}
        <div className="flex flex-col justify-between">
          <div>
            <p
              className="font-body text-xs tracking-widest uppercase mb-2"
              style={{ color: "var(--mist-dim)" }}
            >
              Стоимость представительства
            </p>
            <p
              className="font-display mb-1"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "var(--red)",
                lineHeight: 1,
              }}
            >
              {formatRub(fee)}
            </p>
            <p className="font-body text-xs mt-3" style={{ color: "var(--mist)", opacity: 0.4 }}>
              анализ + подготовка + подача документов · под ключ
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <button className="btn-gold w-full py-4 text-xs">
              Отправить документ
            </button>
            <p
              className="font-body text-xs text-center"
              style={{ color: "var(--mist)", opacity: 0.3 }}
            >
              Точная стоимость — после изучения материалов
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PRICE SECTION ───────────────────────────────────────────────────────────

interface PriceSectionProps {
  onScrollTo: (id: string) => void;
}

export default function PriceSection({ onScrollTo }: PriceSectionProps) {
  return (
    <>
      {/* ── SERVICES ────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p
              className="font-body text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--red)", letterSpacing: "0.2em" }}
            >
              Что делаем
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light" style={{ color: "var(--mist)" }}>
              Документы под задачи бизнеса
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {[
              { icon: "Gavel", title: "Отзывы по авторским правам", desc: "Правовая позиция + подача в суд. Под ключ." },
              { icon: "FileSearch", title: "Возражения ФНС", desc: "На акты, решения, требования налоговых органов." },
              { icon: "Mail", title: "Ответы на письма", desc: "Любые запросы от контрагентов и ведомств." },
              { icon: "Scale", title: "Судебные документы", desc: "Исковые заявления, ходатайства, жалобы." },
            ].map((s) => (
              <div key={s.title} className="service-card p-7">
                <div className="mb-4" style={{ color: "var(--red)" }}>
                  <Icon name={s.icon} size={20} />
                </div>
                <p className="font-display text-xl mb-2" style={{ color: "var(--mist)" }}>
                  {s.title}
                </p>
                <p className="font-body text-sm leading-6" style={{ color: "var(--mist)", opacity: 0.45 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="btn-gold px-10 py-4">Отправить документ</button>
          </div>
        </div>
      </section>

      {/* ── PRICE ───────────────────────────────────────────────────────── */}
      <section id="price" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p
              className="font-body text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--red)", letterSpacing: "0.2em" }}
            >
              Прозрачное ценообразование
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light" style={{ color: "var(--mist)" }}>
              Стоимость услуг
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* IS block */}
            <div
              className="p-8 lg:p-10"
              style={{ background: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p
                    className="font-body text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--red)", letterSpacing: "0.15em" }}
                  >
                    Интеллектуальная собственность
                  </p>
                  <h3 className="font-display text-2xl" style={{ color: "var(--mist)" }}>
                    Отзыв в суд — под ключ
                  </h3>
                  <p className="font-body text-xs mt-1" style={{ color: "var(--mist)", opacity: 0.4 }}>
                    анализ · подготовка · подача
                  </p>
                </div>
                <div style={{ color: "var(--red)", opacity: 0.7 }}>
                  <Icon name="BookOpen" size={24} />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "До 500 000 ₽", sub: "мин. 20 000 ₽", val: "10%" },
                  { label: "Свыше 500 000 ₽", sub: "+ 2% от суммы превышения", val: "50 000 ₽" },
                ].map((tier) => (
                  <div
                    key={tier.label}
                    className="flex items-center justify-between p-4"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div>
                      <p className="font-body text-sm" style={{ color: "var(--mist)" }}>{tier.label}</p>
                      <p className="font-body text-xs" style={{ color: "var(--mist)", opacity: 0.4 }}>{tier.sub}</p>
                    </div>
                    <p className="font-display text-2xl" style={{ color: "var(--red)", fontWeight: 300 }}>
                      {tier.val}
                    </p>
                  </div>
                ))}
              </div>

              {/* Examples */}
              <div
                className="p-4 mb-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p
                  className="font-body text-xs tracking-widest uppercase mb-3"
                  style={{ color: "var(--mist-dim)" }}
                >
                  Примеры
                </p>
                <div className="space-y-2">
                  {[
                    [300000, 30000],
                    [450000, 45000],
                    [700000, 54000],
                  ].map(([sum, fee]) => (
                    <div key={sum} className="flex justify-between font-body text-sm">
                      <span style={{ color: "var(--mist)", opacity: 0.5 }}>
                        Иск {new Intl.NumberFormat("ru-RU").format(sum)} ₽
                      </span>
                      <span style={{ color: "var(--red)" }}>
                        → {new Intl.NumberFormat("ru-RU").format(fee)} ₽
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="w-full py-3.5 font-body text-xs tracking-widest uppercase transition-all duration-200"
                style={{ border: "1px solid rgba(239,68,68,0.4)", color: "var(--red)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)")}
                onClick={() => onScrollTo("calculator")}
              >
                Рассчитать стоимость →
              </button>
            </div>

            {/* FNS block */}
            <div
              className="p-8 lg:p-10"
              style={{ background: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p
                    className="font-body text-xs tracking-widest uppercase mb-2"
                    style={{ color: "var(--red)", letterSpacing: "0.15em" }}
                  >
                    Взаимодействие с ФНС
                  </p>
                  <h3 className="font-display text-2xl" style={{ color: "var(--mist)" }}>
                    Налоговые документы
                  </h3>
                  <p className="font-body text-xs mt-1" style={{ color: "var(--mist)", opacity: 0.4 }}>
                    фиксированная стоимость
                  </p>
                </div>
                <div style={{ color: "var(--red)", opacity: 0.7 }}>
                  <Icon name="Landmark" size={24} />
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  { name: "Правовое заключение", price: "25 000 ₽", desc: "Анализ позиции + рекомендации", highlight: false },
                  { name: "Возражение", price: "70 000 ₽", desc: "На акт или решение ФНС", highlight: true },
                  { name: "Ответ на письмо", price: "10 000 ₽", desc: "Запрос, требование, уведомление", highlight: false },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 transition-all duration-200"
                    style={{
                      background: item.highlight ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${item.highlight ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.07)"}`,
                    }}
                  >
                    <div>
                      <p className="font-body text-sm font-medium" style={{ color: "var(--mist)" }}>
                        {item.name}
                      </p>
                      <p className="font-body text-xs" style={{ color: "var(--mist)", opacity: 0.4 }}>
                        {item.desc}
                      </p>
                    </div>
                    <p
                      className="font-display text-xl flex-shrink-0 ml-4"
                      style={{ color: item.highlight ? "var(--red)" : "var(--mist)", fontWeight: 300 }}
                    >
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              <button className="btn-gold w-full py-3.5 text-xs">
                Отправить документ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />
      </div>

      {/* ── CALCULATOR ──────────────────────────────────────────────────── */}
      <section id="calculator" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p
              className="font-body text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--red)", letterSpacing: "0.2em" }}
            >
              Интерактивный расчёт
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light" style={{ color: "var(--mist)" }}>
              Калькулятор стоимости
            </h2>
            <div className="gold-line mt-5" />
          </div>
          <Calculator />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />
      </div>

      {/* ── HOW WE WORK ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p
              className="font-body text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--red)", letterSpacing: "0.2em" }}
            >
              Процесс
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-light" style={{ color: "var(--mist)" }}>
              Как мы работаем
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
            {[
              {
                num: "01",
                icon: "Upload",
                title: "Отправляете документ",
                desc: "Прикрепляете файл или описываете ситуацию. Принимаем в мессенджерах, email или через форму.",
              },
              {
                num: "02",
                icon: "Search",
                title: "Мы анализируем",
                desc: "Изучаем материалы, проверяем судебную практику, определяем сильную правовую позицию.",
              },
              {
                num: "03",
                icon: "CheckCircle",
                title: "Готово за 24 часа",
                desc: "Передаём готовый документ. При необходимости — подаём в суд или ведомство от вашего имени.",
              },
            ].map((step) => (
              <div key={step.num} className="service-card p-8 lg:p-10">
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="font-display text-5xl"
                    style={{ color: "rgba(255,255,255,0.08)", fontWeight: 300, lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                  <span style={{ color: "var(--red)", opacity: 0.7 }}>
                    <Icon name={step.icon} size={20} />
                  </span>
                </div>
                <p className="font-display text-xl mb-3" style={{ color: "var(--mist)" }}>
                  {step.title}
                </p>
                <p className="font-body text-sm leading-6" style={{ color: "var(--mist)", opacity: 0.45 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="btn-gold px-10 py-4">Получить решение</button>
          </div>
        </div>
      </section>

      {/* ── RISK BLOCK ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div
            className="p-10 lg:p-14 relative overflow-hidden"
            style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.18)" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)" }}
            />

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p
                  className="font-body text-xs tracking-widest uppercase mb-4"
                  style={{ color: "var(--red)", letterSpacing: "0.2em" }}
                >
                  Цена ошибки
                </p>
                <h2
                  className="font-display text-3xl lg:text-4xl font-light mb-6"
                  style={{ color: "var(--mist)" }}
                >
                  Ошибка в документе<br />
                  <span style={{ color: "var(--red)", fontStyle: "italic" }}>может стоить дорого</span>
                </h2>
                <button className="btn-gold px-8 py-4">Отправить документ</button>
              </div>

              <div className="space-y-4">
                {[
                  { icon: "TrendingDown", text: "Проигрыш в суде из-за процессуальных ошибок" },
                  { icon: "AlertTriangle", text: "Доначисления и штрафы от налоговых органов" },
                  { icon: "Clock", text: "Пропуск сроков → потеря права на защиту" },
                ].map((r) => (
                  <div key={r.text} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                      style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      <Icon name={r.icon} size={14} />
                    </div>
                    <p
                      className="font-body text-sm leading-6 pt-1"
                      style={{ color: "var(--mist)", opacity: 0.55 }}
                    >
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IP BLOCK ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="font-body text-xs tracking-widest uppercase mb-4"
                style={{ color: "var(--red)", letterSpacing: "0.2em" }}
              >
                Доп. услуга
              </p>
              <h2
                className="font-display text-3xl lg:text-4xl font-light mb-4"
                style={{ color: "var(--mist)" }}
              >
                Защита интеллектуальной собственности
              </h2>
              <div className="gold-line mb-6" />
              <p className="font-body text-sm leading-7 mb-8" style={{ color: "var(--mist)", opacity: 0.45 }}>
                Споры о нарушении авторских прав, защита товарных знаков, борьба с незаконным копированием.
                Полное юридическое сопровождение под ключ.
              </p>
              <button
                className="font-body text-xs tracking-widest uppercase px-8 py-3.5 transition-all duration-200"
                style={{ border: "1px solid rgba(239,68,68,0.35)", color: "var(--red)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)")}
              >
                Узнать подробнее
              </button>
            </div>

            <div className="space-y-3">
              {[
                { icon: "Copyright", title: "Судебные споры по авторским правам", desc: "Отзывы, возражения, иски" },
                { icon: "Tag", title: "Товарные знаки", desc: "Регистрация и защита" },
                { icon: "Copy", title: "Незаконное копирование", desc: "Пресечение нарушений" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-5 p-5 transition-all duration-200"
                  style={{ background: "var(--charcoal)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  <div className="flex-shrink-0" style={{ color: "var(--red)", opacity: 0.7 }}>
                    <Icon name={item.icon} size={18} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium" style={{ color: "var(--mist)" }}>
                      {item.title}
                    </p>
                    <p className="font-body text-xs" style={{ color: "var(--mist)", opacity: 0.4 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
