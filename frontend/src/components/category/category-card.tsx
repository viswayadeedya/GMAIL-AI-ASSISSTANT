interface CategoryCardProps {
  label: string;
  tagClassName: string;
  count: number;
  caption: string;
  wide?: boolean;
}

export default function CategoryCard({
  label,
  tagClassName,
  count,
  caption,
  wide = false,
}: CategoryCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl px-7 py-6 ${
        wide ? "lg:col-span-2" : ""
      }`}
    >
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${tagClassName}`}
      >
        {label}
      </span>
      <p className="mt-4 text-5xl font-bold text-slate-900">{count}</p>
      <p className="mt-4 text-slate-500">{caption}</p>
    </div>
  );
}
