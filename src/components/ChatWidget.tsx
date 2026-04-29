import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const BOT_USERNAME = "intelectpro_bot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (open && widgetRef.current && !scriptLoaded.current) {
      scriptLoaded.current = true;
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-discussion", BOT_USERNAME);
      script.setAttribute("data-comments-limit", "5");
      script.setAttribute("data-height", "480");
      script.setAttribute("data-color", "2563EB");
      script.setAttribute("data-dark-color", "0F2C5A");
      widgetRef.current.appendChild(script);
    }
  }, [open]);

  return (
    <>
      {/* Окно чата */}
      {open && (
        <div
          className="fixed z-50 flex flex-col"
          style={{
            bottom: 88,
            right: 16,
            width: "calc(100vw - 32px)",
            maxWidth: 380,
            height: "min(560px, calc(100dvh - 120px))",
            background: "#fff",
            border: "1px solid var(--border-c)",
            borderRadius: 16,
            boxShadow: "0 12px 40px rgba(15,44,90,0.18)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Шапка */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ background: "var(--blue)", color: "#fff" }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Icon name="Bot" size={18} color="#fff" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">ИИ-консультант</p>
              <p className="text-xs opacity-80">@{BOT_USERNAME}</p>
            </div>
            <a
              href={`https://t.me/${BOT_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity mr-2"
              title="Открыть в Telegram"
            >
              <Icon name="ExternalLink" size={16} color="#fff" />
            </a>
            <button
              onClick={() => setOpen(false)}
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Закрыть"
            >
              <Icon name="X" size={18} color="#fff" />
            </button>
          </div>

          {/* Виджет Telegram */}
          <div
            ref={widgetRef}
            className="flex-1 overflow-y-auto"
            style={{ minHeight: 0 }}
          />
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