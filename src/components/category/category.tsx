import { mockEmails } from "../../mockdata/emails";
import CategoryCard from "./category-card";

export default function Category() {
  const countOf = (predicate: (e: (typeof mockEmails)[number]) => boolean) =>
    mockEmails.filter(predicate).length;

  const cards = [
    {
      label: "Interview",
      tagClassName: "bg-emerald-100 text-emerald-800",
      count: countOf((e) => e.type === "interview" && e.actionNeeded),
      caption: "awaiting your reply",
    },
    {
      label: "Assessment",
      tagClassName: "bg-amber-100 text-amber-800",
      count: countOf((e) => e.type === "assessment" && !!e.dueAt),
      caption: "with deadlines",
    },
    {
      label: "Recruiter",
      tagClassName: "bg-indigo-100 text-indigo-800",
      count: countOf((e) => e.type === "recruiter"),
      caption: "new messages",
    },
    {
      label: "Confirmation",
      tagClassName: "bg-gray-100 text-gray-700",
      count: countOf((e) => e.type === "confirmation"),
      caption: "applications received",
    },
    {
      label: "Rejection",
      tagClassName: "bg-red-100 text-red-800",
      count: countOf((e) => e.type === "rejection"),
      caption: "closed out",
      wide: true,
    },
    {
      label: "Other",
      tagClassName: "bg-white text-slate-700 border border-gray-300",
      count: countOf((e) => e.type === "other"),
      caption: "not job related",
      wide: true,
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">By category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <CategoryCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}
