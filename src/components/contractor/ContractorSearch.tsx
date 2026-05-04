import Icon from "@/components/ui/icon";
import { statusLabel, SEARCH_OPTIONS, type SearchType, type Party } from "./contractorTypes";

interface Props {
  searchType: SearchType;
  query: string;
  loading: boolean;
  searched: boolean;
  suggestions: Party[];
  showSuggestions: boolean;
  results: Party[];
  selected: Party | null;
  inputRef: React.RefObject<HTMLInputElement>;
  onSearchTypeChange: (type: SearchType) => void;
  onQueryChange: (q: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onSelectSuggestion: (p: Party) => void;
  onSelectResult: (p: Party) => void;
}

export default function ContractorSearch({
  searchType, query, loading, searched, suggestions, showSuggestions,
  results, selected, inputRef,
  onSearchTypeChange, onQueryChange, onFocus, onBlur,
  onSubmit, onReset, onSelectSuggestion, onSelectResult,
}: Props) {
  const currentOption = SEARCH_OPTIONS.find((o) => o.type === searchType)!;

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SEARCH_OPTIONS.map((opt) => (
          <button key={opt.type} type="button"
            onClick={() => onSearchTypeChange(opt.type)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              background: searchType === opt.type ? "var(--blue)" : "var(--bg)",
              color: searchType === opt.type ? "#fff" : "var(--text-muted)",
              border: `1px solid ${searchType === opt.type ? "var(--blue)" : "var(--border-c)"}`,
            }}>
            <Icon name={opt.icon as "Hash"} size={13} />
            {opt.label}
          </button>
        ))}
      </div>

      {/* Search form */}
      <form onSubmit={onSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Icon name={currentOption.icon as "Hash"} size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--text-muted)" }} />
          <input
            ref={inputRef}
            className="w-full pl-10 pr-10 py-3 rounded-lg text-sm outline-none transition-colors font-body"
            style={{ background: "var(--bg)", border: "1px solid var(--border-c)", color: "var(--text)" }}
            placeholder={currentOption.placeholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={loading}
            autoComplete="off"
          />
          {query && (
            <button type="button" onClick={onReset}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
              style={{ color: "var(--text-muted)" }}>
              <Icon name="X" size={15} />
            </button>
          )}

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden text-sm mt-1"
              style={{ background: "#fff", border: "1px solid var(--border-c)", boxShadow: "0 8px 24px rgba(0,0,0,0.10)", top: "100%" }}>
              {suggestions.map((s, i) => {
                const st = statusLabel(s.data?.state?.status);
                return (
                  <li key={i} onMouseDown={() => onSelectSuggestion(s)}
                    className="px-4 py-3 cursor-pointer transition-colors"
                    style={{ borderBottom: i < suggestions.length - 1 ? "1px solid var(--border-c)" : "none" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#fff")}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium truncate" style={{ color: "var(--navy)" }}>{s.value}</p>
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                          ИНН: {s.data?.inn || "—"}
                          {s.data?.address?.value && ` · ${s.data.address.value}`}
                        </p>
                      </div>
                      <span className="text-xs flex-shrink-0 font-medium" style={{ color: st.color }}>{st.text}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button type="submit" disabled={loading || !query.trim()}
          className="px-5 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 flex-shrink-0"
          style={{ background: "var(--blue)", color: "#fff", opacity: loading || !query.trim() ? 0.6 : 1 }}>
          {loading ? <Icon name="LoaderCircle" size={16} className="animate-spin" /> : <Icon name="Search" size={16} />}
          Найти
        </button>
      </form>
      <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{currentOption.hint}</p>

      {/* Results list */}
      {!selected && results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((r, i) => {
            const st = statusLabel(r.data?.state?.status);
            return (
              <button key={i} type="button" onClick={() => onSelectResult(r)}
                className="w-full text-left rounded-xl px-5 py-4 transition-all"
                style={{ background: "var(--bg)", border: "1px solid var(--border-c)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.3)"; (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-c)"; (e.currentTarget as HTMLElement).style.background = "var(--bg)"; }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--navy)" }}>{r.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      ИНН: {r.data?.inn || "—"}{r.data?.address?.value && ` · ${r.data.address.value}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium" style={{ color: st.color }}>{st.text}</span>
                    <Icon name="ChevronRight" size={14} style={{ color: "var(--text-muted)" }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {searched && !loading && results.length === 0 && !selected && (
        <div className="mt-6 text-center py-8" style={{ color: "var(--text-muted)" }}>
          <Icon name="SearchX" size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Ничего не найдено. Попробуйте изменить запрос.</p>
        </div>
      )}
    </>
  );
}
