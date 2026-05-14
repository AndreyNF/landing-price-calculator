import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ── NAV ITEMS ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "register", label: "Регистрация" },
  { id: "cabinet", label: "Кабинет" },
  { id: "clients", label: "Клиенты" },
  { id: "reflink", label: "Реф. ссылка" },
  { id: "promo", label: "Промо" },
  { id: "finances", label: "Финансы" },
  { id: "profile", label: "Профиль" },
];

// ── HELPERS ────────────────────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 72; // sticky nav height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

// ── SHARED STYLES ──────────────────────────────────────────────────────────────
const CARD_STYLE: React.CSSProperties = {
  background: "var(--dark-card)",
  border: "1px solid rgba(212,175,55,0.1)",
  borderRadius: 12,
};

const GOLD_ACCENT_LINE = (
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

function SectionHeading({ children }: { children: React.ReactNode }) {
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

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
      style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}
    >
      {n}
    </span>
  );
}

// ── SECTION: REGISTER ─────────────────────────────────────────────────────────
function SectionRegister() {
  const method1Steps = [
    "Откройте advokat-vsem.ru/login",
    "Нажмите «Зарегистрироваться»",
    "Введите логин и пароль, выберите роль «Партнёр»",
    "Система автоматически присвоит вам реф-код",
    "После входа вы попадёте в личный кабинет",
  ];

  const method2Steps = [
    "Получите ссылку от действующего партнёра Legis24",
    "Перейдите по ссылке — реф-код автоматически привяжется",
    "Зарегистрируйтесь: в этом случае оба партнёра получат доход от ваших кейсов",
  ];

  return (
    <section id="register" className="mb-16">
      <SectionHeading>Как стать партнёром</SectionHeading>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        {/* Card 1 */}
        <div className="p-6" style={CARD_STYLE}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              <Icon name="UserPlus" size={18} style={{ color: "#D4AF37" }} />
            </div>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "#fff" }}
            >
              Метод 1 — Самостоятельная регистрация
            </h3>
          </div>
          <ul className="space-y-2.5">
            {method1Steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <StepBadge n={i + 1} />
                <span
                  className="text-sm leading-relaxed pt-0.5 font-body"
                  style={{ color: "var(--text)" }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2 */}
        <div className="p-6" style={CARD_STYLE}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              <Icon name="Link" size={18} style={{ color: "#D4AF37" }} />
            </div>
            <h3
              className="font-display text-lg font-semibold"
              style={{ color: "#fff" }}
            >
              Метод 2 — Регистрация по реферальной ссылке
            </h3>
          </div>
          <ul className="space-y-2.5">
            {method2Steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <StepBadge n={i + 1} />
                <span
                  className="text-sm leading-relaxed pt-0.5 font-body"
                  style={{ color: "var(--text)" }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tip */}
      <div
        className="flex items-start gap-3 rounded-xl p-4"
        style={{
          background: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.18)",
        }}
      >
        <Icon
          name="Info"
          size={16}
          className="flex-shrink-0 mt-0.5"
          style={{ color: "#D4AF37" }}
        />
        <p className="text-sm font-body" style={{ color: "var(--text)" }}>
          После регистрации рекомендуем заполнить профиль (раздел «Профиль»)
          для получения выплат.
        </p>
      </div>
    </section>
  );
}

// ── SECTION: CABINET ──────────────────────────────────────────────────────────
function SectionCabinet() {
  const sections = [
    {
      icon: "BarChart2",
      title: "Статистика",
      desc: "Сводка по клиентам, конверсии, начислениям и выплатам. Воронка по статусам сделок.",
    },
    {
      icon: "Users",
      title: "Мои клиенты",
      desc: "Список всех переданных кейсов. Добавление новых клиентов, поиск и фильтрация по статусу.",
    },
    {
      icon: "Wallet",
      title: "Финансы",
      desc: "Начислено, выплачено, к выплате. История платежей. Доход от ваших партнёров-рефералов.",
    },
    {
      icon: "Percent",
      title: "Тарифы",
      desc: "Ставки вознаграждения по типам услуг. Пользовательские тарифы для нестандартных кейсов.",
    },
    {
      icon: "Link",
      title: "Реф. ссылка",
      desc: "Ваша персональная ссылка и QR-код. Статистика переходов и заявок.",
    },
    {
      icon: "User",
      title: "Профиль",
      desc: "Реквизиты для выплат. Тип партнёра: ЮЛ, ИП, самозанятый, физ. лицо.",
    },
  ];

  return (
    <section id="cabinet" className="mb-16">
      <SectionHeading>Разделы личного кабинета</SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="p-5 transition-all duration-200"
            style={CARD_STYLE}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(212,175,55,0.35)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(212,175,55,0.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              <Icon name={s.icon} size={20} style={{ color: "#D4AF37" }} />
            </div>
            <h3
              className="font-display text-base font-semibold mb-1.5"
              style={{ color: "#fff" }}
            >
              {s.title}
            </h3>
            <p
              className="text-sm leading-relaxed font-body"
              style={{ color: "var(--text-muted)" }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── SECTION: CLIENTS ──────────────────────────────────────────────────────────
function SectionClients() {
  const addSteps = [
    {
      title: "Перейдите в раздел «Мои клиенты»",
      sub: null,
    },
    {
      title: "Нажмите кнопку «Добавить клиента»",
      sub: null,
    },
    {
      title: "Заполните форму",
      sub: [
        "ФИО или наименование организации",
        "ИНН (необязательно, но ускоряет идентификацию)",
        "Телефон и email",
        "Контактное лицо",
        "Сумма сделки и ваше вознаграждение",
        "Описание ситуации (произвольный текст)",
      ],
    },
    {
      title:
        "Нажмите «Сохранить» — клиент появится в списке со статусом «Новый»",
      sub: null,
    },
    {
      title:
        "Передайте кейс команде Legis24 — мы свяжемся с клиентом в течение рабочего дня",
      sub: null,
    },
  ];

  const statuses = [
    { status: "Новый", meaning: "Кейс принят, ожидает назначения" },
    {
      status: "Переговоры",
      meaning: "Идёт обсуждение задачи с клиентом",
    },
    {
      status: "Договор заключён",
      meaning: "Договор подписан, работа начата",
    },
    { status: "Оплата поступила", meaning: "Счёт оплачен" },
    {
      status: "Завершён",
      meaning: "Кейс закрыт, вознаграждение начислено",
    },
  ];

  const cardItems = [
    "Полная информация о клиенте",
    "История изменения статусов с датами",
    "Загрузка документов (акты, договоры)",
    "Переписка-комментарии с командой Legis24",
    "Связанные услуги и суммы вознаграждения",
  ];

  return (
    <section id="clients" className="mb-16">
      <SectionHeading>Как добавить клиента</SectionHeading>

      {/* Steps */}
      <div className="mb-8 space-y-3">
        {addSteps.map((step, i) => (
          <div
            key={i}
            className="p-4 rounded-xl"
            style={{
              background: "var(--dark-card)",
              border: "1px solid rgba(212,175,55,0.08)",
            }}
          >
            <div className="flex items-start gap-3">
              <StepBadge n={i + 1} />
              <div>
                <p
                  className="text-sm font-medium font-body"
                  style={{ color: "var(--text)" }}
                >
                  {step.title}
                </p>
                {step.sub && (
                  <ul className="mt-2 space-y-1">
                    {step.sub.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm font-body"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span
                          className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                          style={{ background: "#D4AF37" }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statuses table */}
      <h3
        className="font-display text-lg font-semibold mb-4"
        style={{ color: "#fff" }}
      >
        Статусы кейса
      </h3>
      <div
        className="rounded-xl overflow-hidden mb-8"
        style={{ border: "1px solid rgba(212,175,55,0.1)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "rgba(212,175,55,0.06)" }}>
              <th
                className="px-5 py-3 text-left text-xs font-semibold font-body"
                style={{ color: "#D4AF37" }}
              >
                Статус
              </th>
              <th
                className="px-5 py-3 text-left text-xs font-semibold font-body"
                style={{ color: "#D4AF37" }}
              >
                Значение
              </th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((row, i) => (
              <tr
                key={row.status}
                style={{
                  background:
                    i % 2 === 0 ? "var(--dark-card)" : "rgba(13,21,38,0.5)",
                  borderTop: "1px solid rgba(212,175,55,0.06)",
                }}
              >
                <td
                  className="px-5 py-3 font-medium font-body whitespace-nowrap"
                  style={{ color: "var(--text)" }}
                >
                  {row.status}
                </td>
                <td
                  className="px-5 py-3 font-body"
                  style={{ color: "var(--text-muted)" }}
                >
                  {row.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Client card */}
      <h3
        className="font-display text-lg font-semibold mb-4"
        style={{ color: "#fff" }}
      >
        Карточка клиента — что доступно
      </h3>
      <div
        className="rounded-xl p-5"
        style={{
          background: "var(--dark-card)",
          border: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <ul className="space-y-2.5">
          {cardItems.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <Icon
                name="Check"
                size={15}
                className="flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <span
                className="text-sm font-body"
                style={{ color: "var(--text)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── SECTION: REFLINK ──────────────────────────────────────────────────────────
function SectionReflink() {
  const howToFind = [
    "Раздел «Реф. ссылка» в кабинете",
    "Там же — кнопка «Скопировать ссылку»",
    "QR-код — можно скачать как PNG и разместить в презентациях, визитках",
  ];

  const stats = [
    { label: "Переходы всего / за 7 дней", icon: "MousePointerClick" },
    { label: "Заявки всего / за 7 дней", icon: "FileText" },
    { label: "Конверсия (%)", icon: "TrendingUp" },
  ];

  const where = [
    "В email-рассылках клиентам",
    "В мессенджерах (WhatsApp, Telegram)",
    "QR-код на визитках и раздаточных материалах",
    "В подписи к письмам",
  ];

  return (
    <section id="reflink" className="mb-16">
      <SectionHeading>Ваша реферальная ссылка</SectionHeading>

      {/* Description */}
      <p
        className="text-sm leading-relaxed font-body mb-8"
        style={{ color: "var(--text)" }}
      >
        Каждому партнёру присваивается уникальный реф-код (10 символов). По
        ссылке с вашим кодом клиенты попадают на сайт Legis24 — если они
        оставляют заявку или регистрируются, кейс автоматически привязывается к
        вам.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {/* How to find */}
        <div className="md:col-span-1 p-5 rounded-xl" style={CARD_STYLE}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Search" size={16} style={{ color: "#D4AF37" }} />
            <h3
              className="font-display text-base font-semibold"
              style={{ color: "#fff" }}
            >
              Как найти ссылку
            </h3>
          </div>
          <ul className="space-y-2.5">
            {howToFind.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <StepBadge n={i + 1} />
                <span
                  className="text-sm font-body leading-relaxed pt-0.5"
                  style={{ color: "var(--text)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        <div className="md:col-span-1 p-5 rounded-xl" style={CARD_STYLE}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="BarChart2" size={16} style={{ color: "#D4AF37" }} />
            <h3
              className="font-display text-base font-semibold"
              style={{ color: "#fff" }}
            >
              Статистика ссылки
            </h3>
          </div>
          <ul className="space-y-3">
            {stats.map((s) => (
              <li key={s.label} className="flex items-center gap-3">
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.1)" }}
                >
                  <Icon name={s.icon} size={13} style={{ color: "#D4AF37" }} />
                </div>
                <span
                  className="text-sm font-body"
                  style={{ color: "var(--text)" }}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Where to use */}
        <div className="md:col-span-1 p-5 rounded-xl" style={CARD_STYLE}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Share2" size={16} style={{ color: "#D4AF37" }} />
            <h3
              className="font-display text-base font-semibold"
              style={{ color: "#fff" }}
            >
              Где использовать
            </h3>
          </div>
          <ul className="space-y-2">
            {where.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Icon
                  name="ChevronRight"
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#D4AF37" }}
                />
                <span
                  className="text-sm font-body"
                  style={{ color: "var(--text)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── SECTION: PROMO ────────────────────────────────────────────────────────────
function SectionPromo() {
  const materials = [
    "Шаблоны писем для бухгалтеров и финансовых директоров",
    "Карточки для социальных сетей",
    "Описания услуг для пересылки клиентам",
    "Новости об изменениях в тарифах",
  ];

  return (
    <section id="promo" className="mb-16">
      <SectionHeading>Где взять промо-материалы</SectionHeading>

      <div
        className="rounded-xl p-6 md:p-8"
        style={{
          background: "var(--dark-card)",
          border: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <p
          className="text-sm font-body leading-relaxed mb-6"
          style={{ color: "var(--text)" }}
        >
          Все актуальные промо-материалы — в Telegram-канале партнёров.
        </p>

        <a
          href="https://t.me/intelectpro_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold font-body transition-all duration-200 mb-8"
          style={{
            background: "linear-gradient(135deg,#D4AF37,#b8922a)",
            color: "#080f1e",
            boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 6px 28px rgba(212,175,55,0.45)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              "0 4px 20px rgba(212,175,55,0.25)")
          }
        >
          <Icon name="Send" size={16} />
          Перейти в Telegram → t.me/intelectpro_bot
        </a>

        <h3
          className="font-display text-base font-semibold mb-3"
          style={{ color: "#fff" }}
        >
          Что там есть
        </h3>
        <ul className="space-y-2.5">
          {materials.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <Icon
                name="Check"
                size={15}
                className="flex-shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <span
                className="text-sm font-body"
                style={{ color: "var(--text)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── SECTION: FINANCES ─────────────────────────────────────────────────────────
function SectionFinances() {
  const accrualRules = [
    "Базовая ставка — до 30% от тарифа (зависит от услуги)",
    "Начисляется после перехода кейса в статус «Оплата поступила»",
    "Специальные ставки для юристов и адвокатов (требуется подтверждение)",
  ];

  const payoutSteps = [
    "Заполните профиль — укажите реквизиты (счёт, ИНН и т.д.)",
    "В разделе «Финансы» отображается сумма «К выплате»",
    "Выплата производится на ваши реквизиты — уточните сроки у куратора в Telegram",
    "После выплаты статус обновляется в кабинете автоматически",
  ];

  return (
    <section id="finances" className="mb-16">
      <SectionHeading>Как работают выплаты</SectionHeading>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        {/* Accrual */}
        <div className="p-6 rounded-xl" style={CARD_STYLE}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Percent" size={18} style={{ color: "#D4AF37" }} />
            <h3
              className="font-display text-base font-semibold"
              style={{ color: "#fff" }}
            >
              Как начисляется вознаграждение
            </h3>
          </div>
          <ul className="space-y-3">
            {accrualRules.map((rule) => (
              <li key={rule} className="flex items-start gap-2.5">
                <Icon
                  name="ChevronRight"
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#D4AF37" }}
                />
                <span
                  className="text-sm font-body leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Payout steps */}
        <div className="p-6 rounded-xl" style={CARD_STYLE}>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Wallet" size={18} style={{ color: "#D4AF37" }} />
            <h3
              className="font-display text-base font-semibold"
              style={{ color: "#fff" }}
            >
              Как получить выплату
            </h3>
          </div>
          <ul className="space-y-2.5">
            {payoutSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <StepBadge n={i + 1} />
                <span
                  className="text-sm font-body leading-relaxed pt-0.5"
                  style={{ color: "var(--text)" }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Referral income */}
      <div
        className="flex items-start gap-4 rounded-xl p-5"
        style={{
          background: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.18)",
        }}
      >
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.12)" }}
        >
          <Icon name="Users" size={18} style={{ color: "#D4AF37" }} />
        </div>
        <div>
          <h3
            className="font-display text-base font-semibold mb-1"
            style={{ color: "#fff" }}
          >
            Доход от партнёров-рефералов
          </h3>
          <p className="text-sm font-body leading-relaxed" style={{ color: "var(--text)" }}>
            Если вы привлекли другого партнёра через свою реф-ссылку — вы
            получаете % от его вознаграждений. Размер % указан в разделе
            «Финансы» → «Реферальный доход».
          </p>
        </div>
      </div>
    </section>
  );
}

// ── SECTION: PROFILE ──────────────────────────────────────────────────────────
function SectionProfile() {
  const partnerTypes = [
    {
      icon: "Building2",
      title: "Юридическое лицо",
      fields: "ИНН, КПП, ОГРН, наименование, адрес, счёт",
    },
    {
      icon: "Briefcase",
      title: "ИП",
      fields: "ИНН, ОГРНИП, ФИО, счёт",
    },
    {
      icon: "UserCheck",
      title: "Самозанятый",
      fields: "ИНН, ФИО, счёт",
    },
    {
      icon: "User",
      title: "Физическое лицо",
      fields: "ФИО, паспортные данные, СНИЛС, счёт",
    },
  ];

  return (
    <section id="profile" className="mb-16">
      <SectionHeading>Настройка профиля</SectionHeading>

      {/* Partner types */}
      <h3
        className="font-display text-lg font-semibold mb-4"
        style={{ color: "#fff" }}
      >
        Выберите тип партнёра
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {partnerTypes.map((type) => (
          <div
            key={type.title}
            className="flex items-start gap-4 p-5 rounded-xl transition-all duration-200"
            style={CARD_STYLE}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(212,175,55,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(212,175,55,0.1)";
            }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(212,175,55,0.12)" }}
            >
              <Icon name={type.icon} size={18} style={{ color: "#D4AF37" }} />
            </div>
            <div>
              <h4
                className="font-display text-base font-semibold mb-1"
                style={{ color: "#fff" }}
              >
                {type.title}
              </h4>
              <p
                className="text-sm font-body"
                style={{ color: "var(--text-muted)" }}
              >
                {type.fields}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lawyer field */}
      <div className="mb-6 p-5 rounded-xl" style={CARD_STYLE}>
        <div className="flex items-start gap-3 mb-2">
          <Icon
            name="Scale"
            size={18}
            className="flex-shrink-0 mt-0.5"
            style={{ color: "#D4AF37" }}
          />
          <h3
            className="font-display text-base font-semibold"
            style={{ color: "#fff" }}
          >
            Поле «Тип юриста» (необязательно)
          </h3>
        </div>
        <p
          className="text-sm font-body leading-relaxed ml-[27px]"
          style={{ color: "var(--text)" }}
        >
          Если вы практикующий юрист или адвокат — укажите это в профиле.
          После проверки вам будут открыты специальные ставки. Статус
          подтверждается командой Legis24.
        </p>
      </div>

      {/* DaData */}
      <div
        className="flex items-start gap-4 rounded-xl p-5"
        style={{
          background: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.18)",
        }}
      >
        <Icon
          name="Zap"
          size={18}
          className="flex-shrink-0 mt-0.5"
          style={{ color: "#D4AF37" }}
        />
        <div>
          <h3
            className="font-display text-base font-semibold mb-1"
            style={{ color: "#fff" }}
          >
            Интеграция с DaData
          </h3>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            При вводе ИНН система автоматически подтянет название организации,
            адрес и данные руководителя.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PartnerHelp() {
  const [activeSection, setActiveSection] = useState("register");

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    scrollToSection(id);
  };

  return (
    <div style={{ background: "#080f1e", minHeight: "100vh" }}>
      {/* ── TOP NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{
          background: "#0d1826",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <Link to="/">
          <img
            src="https://cdn.poehali.dev/projects/ec09f91e-5c19-456f-a8f1-620fce7cd143/bucket/2dd31743-a0a9-4408-8122-638fc7c5235a.jpeg"
            alt="Legis24"
            style={{ height: 48, width: "auto" }}
          />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium font-body transition-colors"
          style={{ color: "rgba(232,228,220,0.5)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "#D4AF37")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(232,228,220,0.5)")
          }
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
      </nav>

      {/* ── HERO HEADER ── */}
      <div className="pt-28 pb-10 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            style={{
              width: 28,
              height: 1.5,
              background: "linear-gradient(90deg,#D4AF37,transparent)",
              borderRadius: 2,
            }}
          />
          <p
            className="text-xs tracking-widest uppercase font-semibold font-body"
            style={{ color: "#D4AF37", letterSpacing: "0.18em" }}
          >
            Legis24 — партнёрская программа
          </p>
        </div>
        <h1
          className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "#ffffff" }}
        >
          Инструкция для партнёров
        </h1>
        <p
          className="text-lg font-body"
          style={{ color: "rgba(232,228,220,0.45)" }}
        >
          Полное руководство по работе с партнёрским кабинетом Legis24.
        </p>
      </div>

      {/* ── STICKY ANCHOR NAV ── */}
      <div
        className="sticky top-[72px] z-40 px-6 md:px-10 py-0"
        style={{
          background: "rgba(8,15,30,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <div className="flex items-center gap-1 py-1 min-w-max">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-3 py-2 text-xs font-semibold font-body rounded-lg whitespace-nowrap transition-all duration-150"
                  style={{
                    color: isActive ? "#D4AF37" : "rgba(232,228,220,0.5)",
                    background: isActive
                      ? "rgba(212,175,55,0.1)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(212,175,55,0.2)"
                      : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(232,228,220,0.5)";
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-6 md:px-10 max-w-5xl mx-auto pt-12 pb-20">
        <SectionRegister />
        <SectionCabinet />
        <SectionClients />
        <SectionReflink />
        <SectionPromo />
        <SectionFinances />
        <SectionProfile />

        {/* ── FOOTER CTA ── */}
        <div
          className="rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: "var(--dark-card)",
            border: "1px solid rgba(212,175,55,0.12)",
          }}
        >
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-5"
            style={{ background: "rgba(212,175,55,0.1)" }}
          >
            <Icon name="MessageCircle" size={26} style={{ color: "#D4AF37" }} />
          </div>
          <h2
            className="font-display text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "#fff" }}
          >
            Остались вопросы?
          </h2>
          <p
            className="text-sm font-body mb-7"
            style={{ color: "rgba(232,228,220,0.45)" }}
          >
            Куратор партнёрской программы ответит в Telegram.
          </p>
          <a
            href="https://t.me/intelectpro_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold font-body transition-all duration-200"
            style={{
              background: "linear-gradient(135deg,#D4AF37,#b8922a)",
              color: "#080f1e",
              boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(212,175,55,0.5)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(212,175,55,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <Icon name="Send" size={16} />
            Написать в Telegram → t.me/intelectpro_bot
          </a>
        </div>
      </div>
    </div>
  );
}
