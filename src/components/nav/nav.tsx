import { Link, NavLink } from "react-router-dom";
import { Inbox } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/inbox", label: "Inbox" },
];

export default function Nav() {
  const syncedAt = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-900 font-bold text-xl"
        >
          <Inbox className="h-6 w-6 text-indigo-600" />
          JobInbox
        </Link>

        <div className="flex items-center gap-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <span className="ml-4 hidden sm:inline font-mono text-sm text-gray-500">
            Synced {syncedAt}
          </span>
        </div>
      </div>
    </nav>
  );
}
