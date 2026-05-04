import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import Icon from "@/components/ui/icon";

export default function Blog() {
  return (
    <div style={{ background: "#080f1e", minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "#0d1826", borderBottom: "1px solid rgba(212,175,55,0.1)" }}
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
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "rgba(232,228,220,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,228,220,0.5)")}
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>
      </nav>

      <div className="pt-28 pb-20 px-6 md:px-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <div style={{ width: 28, height: 1.5, background: "linear-gradient(90deg,#D4AF37,transparent)", borderRadius: 2 }} />
            <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#D4AF37", letterSpacing: "0.18em" }}>
              Блог
            </p>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Playfair Display, serif", color: "#ffffff" }}
          >
            Юридические статьи
          </h1>
          <p className="text-lg" style={{ color: "rgba(232,228,220,0.45)" }}>
            Практические советы для предпринимателей — без воды и на понятном языке.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="group block rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "#0d1526",
                border: "1px solid rgba(212,175,55,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(212,175,55,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(212,175,55,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(212,175,55,0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37" }}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs flex items-center gap-1" style={{ color: "rgba(232,228,220,0.35)" }}>
                    <Icon name="Clock" size={13} />
                    {article.readTime}
                  </span>
                </div>

                <h2
                  className="text-xl font-bold mb-3 leading-snug"
                  style={{ fontFamily: "Playfair Display, serif", color: "#ffffff" }}
                >
                  {article.title}
                </h2>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(232,228,220,0.45)" }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "rgba(232,228,220,0.3)" }}>
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: "#D4AF37" }}>
                    Читать
                    <Icon name="ArrowRight" size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-14 rounded-2xl p-8 md:p-10 text-center"
          style={{ background: "#0d1526", border: "1px solid rgba(212,175,55,0.12)" }}
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif", color: "#fff" }}
          >
            Нужна консультация?
          </h3>
          <p className="mb-6 text-sm" style={{ color: "rgba(232,228,220,0.45)" }}>
            Разберём вашу ситуацию и предложим решение.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#D4AF37,#b8922a)", color: "#0B0F1A", boxShadow: "0 4px 20px rgba(212,175,55,0.3)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(212,175,55,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.3)")}
          >
            Отправить документ на проверку
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
