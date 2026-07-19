import { LogOut } from "lucide-react";

const SettingSidebar = ({
  activeSection,
  sections,
  onSelectSection,
  onLogout,
}) => {
  return (
    <aside className="flex h-fit flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#14141a] dark:shadow-none lg:sticky lg:top-6">
      <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-white/45">
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
                  ? "border border-black bg-white font-semibold text-black dark:border-white dark:bg-[#1a1a1a] dark:text-white"
                  : "border border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:border-[#333] dark:hover:bg-[#1a1a1a] dark:hover:text-white"
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
        className="flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-300/80 dark:hover:bg-red-400/10"
      >
        <LogOut size={16} />
        Log out
      </button>
    </aside>
  );
};

export default SettingSidebar;
