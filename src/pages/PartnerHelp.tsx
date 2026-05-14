import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS, scrollToSection } from "@/components/partner-help/PartnerHelpShared";
import { SectionRegister, SectionCabinet, SectionClients } from "@/components/partner-help/PartnerHelpSections1";
import { SectionReflink, SectionPromo, SectionFinances, SectionProfile } from "@/components/partner-help/PartnerHelpSections2";

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
