import { Clock } from "lucide-react";
import type { Email, EmailType } from "../../types/email";
import { tagStyles } from "../../utils/email-tags";

// Assessments are "due"; interviews and offers need a reply
function dueLabel(type: EmailType) {
  return type === "assessment" ? "Due" : "Reply by";
}

function formatDue(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

function timeLeft(iso: string) {
  const hours = Math.round((new Date(iso).getTime() - Date.now()) / 3_600_000);
  if (hours < 0) return { text: "overdue", urgent: true };
  if (hours < 24) return { text: `in ${hours} hr`, urgent: true };
  return { text: `in ${Math.round(hours / 24)} days`, urgent: false };
}

export default function ActionCard({ email }: { email: Email }) {
  const tag = tagStyles[email.type];
  const left = email.dueAt ? timeLeft(email.dueAt) : null;

  return (
    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-2xl px-7 py-5">
      <div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${tag.className}`}
          >
            {tag.label}
          </span>
          <span className="text-slate-500">{email.companyName}</span>
        </div>
        <p className="mt-2 text-lg font-bold text-slate-900">{email.subject}</p>
      </div>

      {email.dueAt && left && (
        <div className="flex items-center gap-3 text-slate-700">
          <Clock className="h-5 w-5" />
          <span className="font-mono text-sm">
            {dueLabel(email.type)} {formatDue(email.dueAt)}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              left.urgent ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-slate-600"
            }`}
          >
            {left.text}
          </span>
        </div>
      )}
    </div>
  );
}
