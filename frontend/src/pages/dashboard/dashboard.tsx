import { RefreshCw } from "lucide-react";
import { mockEmails } from "../../mockdata/emails";
import ActionNeeded from "../../components/action-needed/action-needed";
import Category from "../../components/category/category";
import RecentEmails from "../../components/recent-emails/recent-emails";

export default function Dashboard() {
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const today = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const sinceLabel = since.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-mono text-sm uppercase text-slate-500">{today}</p>
          <h1 className="text-4xl font-bold text-slate-900">Last 24 hours</h1>
          <p className="text-slate-500">
            {mockEmails.length} emails since {sinceLabel}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border border-gray-300 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="mt-8">
        <ActionNeeded />
      </div>

      <div className="mt-8">
        <Category />
      </div>

      <div className="mt-8">
        <RecentEmails />
      </div>
    </div>
  );
}
