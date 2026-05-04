import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import {
  DADATA_TOKEN, SUGGEST_URL, FIND_URL,
  SEARCH_OPTIONS, type SearchType, type Party,
} from "./contractor/contractorTypes";
import PartyCard from "./contractor/PartyCard";
import ContractorSearch from "./contractor/ContractorSearch";

export default function ContractorCheck() {
  const [searchType, setSearchType] = useState<SearchType>("inn");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Party[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState<Party[]>([]);
  const [selected, setSelected] = useState<Party | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Автодополнение при вводе
  useEffect(() => {
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    if (!query.trim() || query.length < 2 || !DADATA_TOKEN) {
      setSuggestions([]);
      return;
    }
    suggestTimer.current = setTimeout(async () => {
      const body: Record<string, unknown> = { query: query.trim(), count: 7 };
      if (searchType === "fio") body.filters = [{ "management.name": query.trim() }];
      else if (searchType === "address") body.filters = [{ "address": query.trim() }];
      else if (searchType === "okved") body.filters = [{ "okved": query.trim() }];

      const url = searchType === "inn" ? FIND_URL : SUGGEST_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Token ${DADATA_TOKEN}` },
        body: JSON.stringify(body),
      }).catch(() => null);
      if (!res) return;
      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    }, 250);
  }, [query, searchType]);

  // Загрузка полных данных по ИНН
  const loadFull = async (inn: string): Promise<Party | null> => {
    const res = await fetch(FIND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Token ${DADATA_TOKEN}` },
      body: JSON.stringify({ query: inn, count: 1 }),
    }).catch(() => null);
    if (!res) return null;
    const data = await res.json();
    return data.suggestions?.[0] || null;
  };

  const selectParty = async (party: Party) => {
    setShowSuggestions(false);
    setSuggestions([]);
    setQuery(party.value);
    setResults([]);
    setSearched(true);
    if (party.data?.inn) {
      setLoading(true);
      const full = await loadFull(party.data.inn);
      setSelected(full || party);
      setLoading(false);
    } else {
      setSelected(party);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    setSuggestions([]);
    setLoading(true);
    setResults([]);
    setSelected(null);
    setSearched(false);

    try {
      const body: Record<string, unknown> = { query: query.trim(), count: 10 };
      const url = searchType === "inn" ? FIND_URL : SUGGEST_URL;
      if (searchType === "fio") body.filters = [{ "management.name": query.trim() }];
      else if (searchType === "address") body.filters = [{ "address": query.trim() }];
      else if (searchType === "okved") body.filters = [{ "okved": query.trim() }];

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Token ${DADATA_TOKEN}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const list: Party[] = data.suggestions || [];
      if (list.length === 1 && list[0].data?.inn) {
        const full = await loadFull(list[0].data.inn);
        setSelected(full || list[0]);
      } else {
        setResults(list);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const reset = () => {
    setQuery("");
    setResults([]);
    setSelected(null);
    setSuggestions([]);
    setSearched(false);
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    reset();
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-white)", border: "1px solid var(--border-c)" }}>
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border-c)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--blue-dim)" }}>
            <Icon name="SearchCheck" size={18} style={{ color: "var(--blue)" }} />
          </div>
          <div>
            <h2 className="font-bold text-base" style={{ color: "var(--navy)" }}>Проверь контрагента</h2>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Реестр ФНС · финансы · контакты · учредители</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ContractorSearch
          searchType={searchType}
          query={query}
          loading={loading}
          searched={searched}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          results={results}
          selected={selected}
          inputRef={inputRef}
          onSearchTypeChange={handleSearchTypeChange}
          onQueryChange={setQuery}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onSubmit={handleSearch}
          onReset={reset}
          onSelectSuggestion={selectParty}
          onSelectResult={selectParty}
        />

        {/* Selected party full card */}
        {selected && <PartyCard party={selected} onClose={() => setSelected(null)} />}
      </div>
    </div>
  );
}
