import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Cabinet() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-c)",
        }}
      >
        <Link to="/">
          <img
            src="https://cdn.poehali.dev/projects/ec09f91e-5c19-456f-a8f1-620fce7cd143/bucket/269a5714-3147-42ee-9d3a-43b1f31ad3e8.jpeg"
            alt="Legis24"
            style={{ height: 48, width: "auto", mixBlendMode: "multiply" }}
          />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--navy)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
      </nav>

      <div className="pt-28 pb-20 px-6 md:px-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p
            className="text-xs tracking-widest uppercase font-semibold mb-3"
            style={{ color: "var(--blue)" }}
          >
            Личный кабинет
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold leading-tight mb-3"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--navy)" }}
          >
            Добро пожаловать
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Здесь вы сможете отслеживать статус заявок, получать документы и общаться с юристом.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "FileText", label: "Заявки", value: "—", desc: "Активных дел нет" },
            { icon: "Clock", label: "В работе", value: "—", desc: "Ожидающих ответа нет" },
            { icon: "CheckCircle", label: "Завершено", value: "—", desc: "Закрытых дел нет" },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-white)",
                border: "1px solid var(--border-c)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--blue-dim)" }}
                >
                  <Icon name={card.icon as "FileText"} size={18} style={{ color: "var(--blue)" }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--navy)" }}>
                  {card.label}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: "var(--navy)" }}>
                {card.value}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Coming soon block */}
        <div
          className="rounded-2xl p-10 md:p-14 text-center"
          style={{
            background: "var(--bg-white)",
            border: "1px solid var(--border-c)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--blue-dim)" }}
          >
            <Icon name="LayoutDashboard" size={28} style={{ color: "var(--blue)" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif", color: "var(--navy)" }}
          >
            Кабинет в разработке
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
            Мы разрабатываем личный кабинет, где вы сможете отслеживать ход дел, загружать документы и получать уведомления в реальном времени.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8">
            {[
              { icon: "Bell", text: "Уведомления о статусе дела" },
              { icon: "Upload", text: "Загрузка и хранение документов" },
              { icon: "MessageSquare", text: "Чат с вашим юристом" },
            ].map((item) => (
              <div
                key={item.text}
                className="rounded-xl px-4 py-4 text-center"
                style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}
              >
                <Icon
                  name={item.icon as "Bell"}
                  size={20}
                  className="mx-auto mb-2"
                  style={{ color: "var(--blue)" }}
                />
                <p className="text-xs leading-snug" style={{ color: "var(--text-muted)" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background: "var(--blue)", color: "#fff" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--blue-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--blue)")
            }
          >
            Отправить заявку сейчас
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
