import { Search } from "lucide-react";
import { tagStyles } from "../../utils/email-tags";
import { RANGES } from "../../types/inbox";
import type { CategoryFilter, Range } from "../../types/inbox";

const RANGE_LABELS: Record<Range, string> = {
  "24h": "24 hours",
  "7d": "7 days",
  "30d": "30 days",
};

interface InboxFiltersProps {
  q: string;
  category: CategoryFilter;
  range: Range;
  onQueryChange: (q: string) => void;
  onCategoryChange: (category: CategoryFilter) => void;
  onRangeChange: (range: Range) => void;
}

export default function InboxFilters({
  q,
  category,
  range,
  onQueryChange,
  onCategoryChange,
  onRangeChange,
}: InboxFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_12rem_auto] gap-4 items-end bg-white border border-gray-200 rounded-2xl p-5">
      <label className="block">
        <span className="block mb-1 text-xs font-semibold text-slate-700">Search</span>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Sender, subject or company"
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </label>

      <label className="block">
        <span className="block mb-1 text-xs font-semibold text-slate-700">Category</span>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All categories</option>
          {Object.entries(tagStyles).map(([type, { label }]) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <div>
        <span className="block mb-1 text-xs font-semibold text-slate-700">Time range</span>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRangeChange(r)}
              className={`px-4 py-2 text-sm font-semibold cursor-pointer border-r border-gray-300 last:border-r-0 ${
                r === range ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-gray-50"
              }`}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
