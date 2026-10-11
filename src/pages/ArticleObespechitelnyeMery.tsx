import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SocialChannels from "@/components/SocialChannels";
import meta from "@/data/featured-article.json";
import bodyHtml from "@/data/html/obespechitelnye-mery-fns-2026.html?raw";
import "./article-body.css";

const LOGO =
  "https://cdn.poehali.dev/projects/ec09f91e-5c19-456f-a8f1-620fce7cd143/bucket/2dd31743-a0a9-4408-8122-638fc7c5235a.jpeg";
const ORIGIN = "https://advokat-vsem.ru";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.h1,
    description: meta.description,
    image: meta.image,
    datePublished: meta.datePublished,
    author: { "@type": "Organization", name: "Legis24" },
    publisher: { "@type": "Organization", name: "Legis24" },
    mainEntityOfPage: meta.canonical,
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Юридические статьи", item: `${ORIGIN}/blog` },
      { "@type": "ListItem", position: 3, name: meta.h1, item: meta.canonical },
    ],
  },
];

export default function ArticleObespechitelnyeMery() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const prevTitle = document.title;
    document.title = meta.title;

    const created: Element[] = [];
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        created.push(el);
      }
      el.content = content;
    };
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
      created.push(canonical);
    }
    canonical.href = meta.canonical;

    setMeta("name", "description", meta.description);
    setMeta("property", "og:type", "article");
    setMeta("property", "og:url", meta.canonical);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:image", meta.image);
    setMeta("name", "twitter:image", meta.image);

    jsonLd.forEach((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.article = "obespechitelnye-mery";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      created.push(s);
    });

    return () => {
      document.title = prevTitle;
      created.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div style={{ background: "#080f1e", minHeight: "100vh" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "#0d1826", borderBottom: "1px solid rgba(212,175,55,0.1)" }}
      >
        <Link to="/">
          <img src={LOGO} alt="Legis24" style={{ height: 48, width: "auto" }} />
        </Link>
        <Link
          to="/blog"
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "rgba(232,228,220,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,228,220,0.5)")}
        >
          <Icon name="ArrowLeft" size={16} />
          Все статьи
        </Link>
      </nav>

      <main className="pt-28 pb-16 px-6 md:px-10 max-w-3xl mx-auto">
        <nav aria-label="Хлебные крошки" className="mb-6 text-xs" style={{ color: "rgba(232,228,220,0.4)" }}>
          <Link to="/" className="hover:opacity-70">Главная</Link>
          {" / "}
          <Link to="/blog" className="hover:opacity-70">Юридические статьи</Link>
        </nav>

        <article className="article-body">
          <p className="article-date">{meta.dateLabel}</p>
          <h1>{meta.h1}</h1>
          <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />

          <p className="article-dzen">
            Статья также опубликована в нашем канале в{" "}
            <a href="https://dzen.ru/a/assSnkZ8ZShLUQYv" target="_blank" rel="noopener">
              Дзене
            </a>
          </p>

          <a
            href="https://t.me/intelectpro_bot"
            target="_blank"
            rel="noopener"
            className="article-cta inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-xs tracking-widest uppercase rounded transition-all"
            style={{ background: "#229ED9", color: "#fff", letterSpacing: "0.08em" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            <Icon name="Send" size={15} />
            Подготовить документ в Telegram-боте
          </a>
        </article>
      </main>

      <footer
        className="py-8 px-6 md:px-12"
        style={{ background: "#050d1a", borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <img src={LOGO} alt="Legis24" style={{ height: 36, width: "auto", borderRadius: 6 }} />
          <div className="flex flex-col items-center gap-1">
            <a href="mailto:order@advokat-vsem.ru" className="font-body text-sm font-semibold" style={{ color: "var(--gold)" }}>
              order@advokat-vsem.ru
            </a>
            <p className="font-body text-xs" style={{ color: "rgba(232,228,220,0.25)" }}>
              © 2026 Legis24 — юридический аналитический центр. Все права защищены.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 font-body text-xs justify-center">
            <a href="/privacy" className="hover:opacity-70 underline" style={{ color: "rgba(232,228,220,0.35)" }}>Политика конфиденциальности</a>
            <a href="/terms" className="hover:opacity-70 underline" style={{ color: "rgba(232,228,220,0.35)" }}>Пользовательское соглашение</a>
            <a href="/offer" className="hover:opacity-70 underline" style={{ color: "rgba(232,228,220,0.35)" }}>Публичная оферта</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6" style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
          <SocialChannels />
        </div>
      </footer>
    </div>
  );
}
