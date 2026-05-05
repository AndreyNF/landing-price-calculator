import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Icon from "@/components/ui/icon";
import { apiPartner } from "./types";

interface Props {
  sessionId: string;
}

export default function PartnerReferral({ sessionId }: Props) {
  const [refCode, setRefCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const refUrl = refCode ? `${window.location.origin}/?ref=${refCode}` : null;

  useEffect(() => {
    apiPartner(sessionId, { action: "get_profile" }).then(data => {
      if (data.partner?.ref_code) {
        setRefCode(data.partner.ref_code);
      } else if (data.partner?.id) {
        apiPartner(sessionId, { action: "get_ref_link" }).then(d => {
          if (d.ref_code) setRefCode(d.ref_code);
        });
      }
      setLoading(false);
    });
  }, [sessionId]);

  const copyLink = () => {
    if (!refUrl) return;
    navigator.clipboard.writeText(refUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;
    const canvas = document.createElement("canvas");
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement("a");
      a.download = `ref-qr-${refCode}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <Icon name="LoaderCircle" size={22} className="animate-spin" style={{ color: "var(--blue)" }} />
    </div>
  );

  if (!refCode) return (
    <div className="text-center py-12">
      <Icon name="Link2Off" size={36} className="mx-auto mb-3" style={{ color: "var(--text-muted)" }} />
      <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Реферальный код будет доступен после заполнения профиля</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--text-muted)" }}>Ваш реферальный код</p>
        <p className="text-2xl font-bold tracking-widest" style={{ color: "var(--navy)", fontFamily: "monospace" }}>{refCode}</p>
      </div>

      {/* Link block */}
      <div className="rounded-2xl p-5 space-y-3" style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}>
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>Реферальная ссылка</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl px-4 py-3 text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)", color: "var(--text)" }}>
            {refUrl}
          </div>
          <button onClick={copyLink}
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm flex-shrink-0 transition-all"
            style={{
              background: copied ? "var(--success)" : "var(--navy)",
              color: "#fff",
            }}>
            <Icon name={copied ? "Check" : "Copy"} size={15} />
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Поделитесь этой ссылкой с потенциальными клиентами — все их заявки будут автоматически привязаны к вам.
        </p>
      </div>

      {/* QR block */}
      <div className="rounded-2xl p-5" style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "var(--text-muted)" }}>QR-код</p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div ref={qrRef} className="rounded-2xl p-4 flex-shrink-0"
            style={{ background: "#fff", border: "1px solid var(--border-c)" }}>
            <QRCodeSVG value={refUrl!} size={180} fgColor="#0d1826" bgColor="#ffffff" />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-sm" style={{ color: "var(--text)" }}>
              Распечатайте QR-код и разместите его на раздаточных материалах, визитках или в офисе — клиент отсканирует и попадёт сразу на ваш реферальный URL.
            </p>
            <button onClick={downloadQR}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
              style={{ background: "var(--navy)", color: "#fff" }}>
              <Icon name="Download" size={15} />
              Скачать PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
