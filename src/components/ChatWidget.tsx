import { useState } from "react";
import Icon from "@/components/ui/icon";

const BOT_USERNAME = "intelectpro_bot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Всплывающая карточка */}
      {open && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: 80,
            right: 16,
            width: "calc(100vw - 32px)",
            maxWidth: 320,
            background: "var(--bg, #f8f6f2)",
            border: "1px solid var(--border-c)",
            borderRadius: 16,
            boxShadow: "0 12px 40px rgba(15,44,90,0.16)",
            overflow: "hidden",
          }}
        >
          {/* Шапка */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "var(--blue)", color: "#fff" }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icon name="Bot" size={18} color="#fff" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">ИИ-консультант</p>
              <p className="text-xs opacity-80">@{BOT_USERNAME}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Icon name="X" size={18} color="#fff" />
            </button>
          </div>

          {/* Тело */}
          <div className="px-4 py-4 flex flex-col gap-3">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
              Привет! Я ИИ-консультант. Задайте любой вопрос — отвечу мгновенно прямо в Telegram.
            </p>
            <a
              href={`https://t.me/${BOT_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: "var(--blue)", color: "#fff" }}
            >
              <Icon name="Send" size={16} color="#fff" />
              Открыть в Telegram
            </a>
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              Бесплатно · Без регистрации
            </p>
          </div>
        </div>
      )}

      {/* Кнопка-пузырь */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{ background: "var(--blue)" }}
        aria-label="Открыть чат с ботом"
      >
        {open ? (
          <Icon name="X" size={24} color="#fff" />
        ) : (
          <Icon name="Bot" size={24} color="#fff" />
        )}
      </button>
    </>
  );
}
