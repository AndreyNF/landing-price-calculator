import Icon from "@/components/ui/icon";
import { CARD_STYLE, SectionHeading, StepBadge } from "./PartnerHelpShared";

// ── SECTION: REGISTER ─────────────────────────────────────────────────────────
export function SectionRegister() {
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
export function SectionCabinet() {
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
export function SectionClients() {
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
