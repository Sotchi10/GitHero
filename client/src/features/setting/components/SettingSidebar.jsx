import { LogOut } from "lucide-react";

const SettingSidebar = ({ activeSection, sections, onSelectSection, onLogout }) => {
  return (
    <aside className="flex h-fit flex-col gap-1 rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-white/10 dark:bg-[#14141a] lg:sticky lg:top-6">
      <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-white/45">
        Settings
      </p>

      <div className="flex flex-col gap-0.5">
        {sections.map((section) => {
          const Icon = section.icon;
          const selected = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelectSection(section.id)}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                selected
                  ? "bg-gray-200 font-medium text-gray-900 dark:bg-white/10 dark:text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              <Icon size={16} />
              {section.label}
            </button>
          );
        })}
      </div>

      <div className="my-2 h-px bg-gray-200 dark:bg-white/10" />

      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-300/80 dark:hover:bg-red-400/10"
      >
        <LogOut size={16} />
        Log out
      </button>
    </aside>
  );
};

export default SettingSidebar;