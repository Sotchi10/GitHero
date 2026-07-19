import { LogOut } from "lucide-react";
import Avatar from "../../profile/components/Avatar";

const SettingSidebar = ({
  activeSection,
  sections,
  onSelectSection,
  onLogout,
  appearance,
  profile,
  authUser,
}) => {
  return (
    <aside className="h-fit border-r border-default pr-5 lg:sticky lg:top-6">
      <div className="flex items-center gap-3 border-b border-default pb-5">
        <Avatar profile={profile} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{profile?.full_name || profile?.username || authUser?.username}</p>
          <p className="truncate text-xs text-gray-400">@{profile?.username || authUser?.username}</p>
          <p className="mt-1 text-xs text-gray-400">Account settings</p>
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-400">Settings</p>
      <div className="mt-2 space-y-1 border-b border-default pb-5">
        {sections.map((section) => {
          const Icon = section.icon;
          const selected = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelectSection(section.id)}
              className={`group relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                selected
                  ? "bg-surface-raised text-primary"
                  : "text-muted hover:bg-surface-raised hover:text-primary"
              }`}
            >
              {selected ? (
                <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-blue-500" />
              ) : null}
              <Icon size={16} />
              <span className="flex-1 text-[15px] font-medium">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-gray-400">{appearance === "light" ? "Light" : "Dark"} mode active</p>

      <button
        type="button"
        onClick={onLogout}
        className="mt-4 inline-flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-500/10"
      >
        <LogOut size={16} />
        <span className="flex-1">Log out</span>
      </button>
    </aside>
  );
};

export default SettingSidebar;
