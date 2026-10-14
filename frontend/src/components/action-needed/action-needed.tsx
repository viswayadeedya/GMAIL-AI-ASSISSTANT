import { mockEmails } from "../../mockdata/emails";
import ActionCard from "./action-card";

export default function ActionNeeded() {
  const actions = mockEmails
    .filter((email) => email.actionNeeded && email.dueAt)
    .sort((a, b) => a.dueAt!.localeCompare(b.dueAt!));

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Action needed</h2>
        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-sm font-bold text-white">
          {actions.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {actions.map((email) => (
          <ActionCard key={email.id} email={email} />
        ))}
      </div>
    </section>
  );
}
