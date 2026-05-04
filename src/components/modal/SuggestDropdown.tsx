import { DadataSuggestion } from "./types";

interface SuggestDropdownProps {
  suggestions: DadataSuggestion[];
  onSelect: (v: string) => void;
}

export default function SuggestDropdown({ suggestions, onSelect }: SuggestDropdownProps) {
  if (!suggestions.length) return null;
  return (
    <ul
      className="absolute left-0 right-0 z-50 rounded-xl overflow-hidden text-sm"
      style={{
        background: "#111827",
        border: "1px solid rgba(212,175,55,0.2)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
        top: "calc(100% + 4px)",
      }}
    >
      {suggestions.map((s, i) => (
        <li
          key={i}
          className="px-4 py-2.5 cursor-pointer transition-colors"
          style={{ color: "#f1f5f9", borderBottom: i < suggestions.length - 1 ? "1px solid rgba(212,175,55,0.08)" : "none" }}
          onMouseDown={(e) => { e.preventDefault(); onSelect(s.value); }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0F172A"; (e.currentTarget as HTMLElement).style.color = "#D4AF37"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#f1f5f9"; }}
        >
          {s.value}
        </li>
      ))}
    </ul>
  );
}