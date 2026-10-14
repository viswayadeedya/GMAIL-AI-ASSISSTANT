import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InboxFilters from "../../components/inbox/inbox-filters";
import InboxList from "../../components/inbox/inbox-list";
import Pagination from "../../components/inbox/pagination";
import { searchEmails } from "../../services/email-service";
import { tagStyles } from "../../utils/email-tags";
import { RANGES, SORT_ORDERS } from "../../types/inbox";
import type { CategoryFilter, EmailPage, Range, SortOrder } from "../../types/inbox";

const PAGE_SIZE = 8;
const DEFAULT_RANGE: Range = "30d";

export default function Inbox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState<EmailPage>({ emails: [], total: 0 });

  // Read the filters from the URL, falling back to defaults for missing or invalid values
  const q = searchParams.get("q") ?? "";

  const categoryParam = searchParams.get("category");
  const category: CategoryFilter =
    categoryParam && categoryParam in tagStyles ? (categoryParam as CategoryFilter) : "all";

  const rangeParam = searchParams.get("range");
  const range = RANGES.find((r) => r === rangeParam) ?? DEFAULT_RANGE;

  const sortParam = searchParams.get("sort");
  const sort = SORT_ORDERS.find((s) => s === sortParam) ?? "newest";

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  // Fetch whenever the URL filters change
  useEffect(() => {
    let ignore = false;
    searchEmails({ q, category, range, sort, page, pageSize: PAGE_SIZE }).then((data) => {
      if (!ignore) setResult(data);
    });
    return () => {
      ignore = true;
    };
  }, [q, category, range, sort, page]);

  // Write changes back to the URL. Changing a filter goes back to page 1.
  function updateParams(changes: Record<string, string>, replace = false) {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (!("page" in changes)) next.delete("page");
    setSearchParams(next, { replace });
  }

  const totalPages = Math.ceil(result.total / PAGE_SIZE);
  const first = result.total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const last = Math.min(page * PAGE_SIZE, result.total);

  return (
    <div className="px-8 py-6">
      <h1 className="text-4xl font-bold text-slate-900">Inbox</h1>
      <p className="mt-1 mb-6 text-slate-500">
        Every email the classifier has looked at. Filters live in the URL, so a refresh keeps
        them.
      </p>

      <InboxFilters
        q={q}
        category={category}
        range={range}
        onQueryChange={(value) => updateParams({ q: value }, true)}
        onCategoryChange={(value) => updateParams({ category: value === "all" ? "" : value })}
        onRangeChange={(value) =>
          updateParams({ range: value === DEFAULT_RANGE ? "" : value })
        }
      />

      <div className="flex justify-between items-center my-5">
        <p className="font-mono text-sm text-slate-500">
          Showing {first}–{last} of {result.total}
        </p>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          Sort
          <select
            value={sort}
            onChange={(e) =>
              updateParams({ sort: (e.target.value as SortOrder) === "newest" ? "" : e.target.value })
            }
            className="rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      {result.emails.length > 0 ? (
        <InboxList emails={result.emails} />
      ) : (
        <p className="py-12 text-center text-slate-500">No emails match these filters.</p>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(n) => updateParams({ page: n === 1 ? "" : String(n) })}
      />
    </div>
  );
}
