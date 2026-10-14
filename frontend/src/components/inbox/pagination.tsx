interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const base = "px-4 py-2 rounded-lg border text-sm font-semibold";

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`${base} border-gray-300 bg-white text-slate-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-slate-400`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPageChange(n)}
          className={`${base} cursor-pointer ${
            n === page
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-gray-300 bg-white text-slate-700 hover:bg-gray-50"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${base} border-gray-300 bg-white text-slate-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-slate-400`}
      >
        Next
      </button>
    </div>
  );
}
