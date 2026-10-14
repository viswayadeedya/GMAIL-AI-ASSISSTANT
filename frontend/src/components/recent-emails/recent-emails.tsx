import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockEmails } from "../../mockdata/emails";
import InboxList from "../inbox/inbox-list";

export default function RecentEmails() {
  const recent = [...mockEmails]
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
    .slice(0, 5);

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Recent emails</h2>
        <Link
          to="/inbox"
          className="flex items-center gap-2 font-semibold text-indigo-700 hover:text-indigo-900"
        >
          View all in inbox
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <InboxList emails={recent} />
    </section>
  );
}
