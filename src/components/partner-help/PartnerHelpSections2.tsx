import Icon from "@/components/ui/icon";
import { CARD_STYLE, SectionHeading, StepBadge } from "./PartnerHelpShared";

// ── SECTION: REFLINK ──────────────────────────────────────────────────────────
export function SectionReflink() {
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
export function SectionPromo() {
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
export function SectionFinances() {
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
export function SectionProfile() {
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
