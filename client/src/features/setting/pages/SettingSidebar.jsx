import { ChevronRight, LogOut } from "lucide-react";

const SettingSidebar = ({
  activeSection,
  sections,
  onSelectSection,
  onLogout,
  appearance,
}) => {
  return (
    <aside className="flex h-fit flex-col gap-3 rounded-[28px] border border-white/10 bg-surface p-3 shadow-[0_24px_80px_rgba(0,0,0,0.28)] lg:sticky lg:top-6">
      <div className="px-3 py-2">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Settings
        </p>
      </div>

      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          const selected = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelectSection(section.id)}
              className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                selected
                  ? "bg-[#1f2937] text-white"
                  : "text-white/70 hover:bg-[#1f2937] hover:text-white"
              }`}
            >
              {selected ? (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500" />
              ) : null}
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/85 transition group-hover:bg-white/10 group-hover:text-white">
                <Icon size={17} />
              </span>
              <span className="flex-1 text-[15px] font-medium">
                {section.label}
              </span>
              {selected ? (
                <ChevronRight size={16} className="text-white/60" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-2 rounded-3xl border border-white/10 bg-primary p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          Theme
        </p>
        <p className="mt-2 text-sm text-white/70">
          {appearance === "white" ? "White" : "Dark"} mode active
        </p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-auto inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-red-200 transition hover:bg-red-400/10"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-400/10 text-red-200">
          <LogOut size={16} />
        </span>
        <span className="flex-1">Log out</span>
      </button>
    </aside>
  );
};

export default SettingSidebar;
