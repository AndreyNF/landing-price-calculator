import { useState, useEffect } from "react";

const COOKIE_KEY = "legis24_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-5 py-4 md:px-10 md:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      style={{
        background: "var(--navy)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
        Мы используем файлы cookie для корректной работы сайта.
        Продолжая использование сайта, вы соглашаетесь с{" "}
        <a
          href="/privacy"
          className="underline hover:opacity-70 transition-opacity"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Политикой конфиденциальности
        </a>
        .
      </p>
      <div className="flex items-center gap-3 flex-shrink-0">
        <a
          href="/privacy"
          className="px-5 py-2 rounded text-sm font-body font-semibold transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          Подробнее
        </a>
        <button
          onClick={accept}
          className="px-6 py-2 rounded text-sm font-body font-semibold transition-opacity hover:opacity-80"
          style={{ background: "var(--gold, #c9a84c)", color: "#fff" }}
        >
          Понятно
        </button>
      </div>
    </div>
  );
}