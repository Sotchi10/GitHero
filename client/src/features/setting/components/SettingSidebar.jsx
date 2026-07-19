import { useState } from "react";
import { LogOut } from "lucide-react";

const SettingSidebar = ({ activeSection, sections, onSelectSection, onLogout }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmLogout = () => {
    setConfirmOpen(false);
    onLogout();
  };

  return (
    <>
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
                    ? "border border-cyan-200 bg-cyan-50 font-semibold text-cyan-800 dark:border-transparent dark:bg-white/10 dark:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
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
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-300/80 dark:hover:bg-red-400/10"
        >
          <LogOut size={16} />
          Log out
        </button>
      </aside>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirm-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#14141a]"
          >
            <h3
              id="logout-confirm-title"
              className="text-base font-semibold text-gray-900 dark:text-white"
            >
              Log out of GitHero?
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-white/65">
              You'll need to sign in again to access your account.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:text-gray-900 dark:border-white/20 dark:text-white/75 dark:hover:border-white/40 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingSidebar;