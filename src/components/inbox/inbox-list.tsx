import type { Email } from "../../types/email";
import { tagStyles } from "../../utils/email-tags";

// Today: show the time. Older: show the date.
function formatReceived(iso: string) {
  const d = new Date(iso);
  if (d.toDateString() === new Date().toDateString()) {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function InboxList({ emails }: { emails: Email[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      {emails.map((email) => {
        const tag = tagStyles[email.type];
        return (
          <div
            key={email.id}
            className="flex justify-between items-center gap-6 px-7 py-5 border-b border-gray-200 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="font-bold text-slate-900">{email.senderName}</p>
              <p className="text-slate-900">{email.subject}</p>
              <p className="text-slate-500 truncate">{email.summary}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-sm text-slate-500">
                {formatReceived(email.receivedAt)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${tag.className}`}
              >
                {tag.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
