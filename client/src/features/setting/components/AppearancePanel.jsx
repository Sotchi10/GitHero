const AppearancePanel = ({ appearance, onAppearanceChange }) => {
  return (
    <div className="flex min-h-[400px] flex-col">
      <div className="border-b border-gray-200 pb-5 dark:border-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-500 dark:text-white/45">
          Appearance
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Choose your theme</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-white/65">
          Switch between a deeper dark look and a clean light look.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {["dark", "white"].map((mode) => {
          const selected = appearance === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => onAppearanceChange(mode)}
              className={`group rounded-2xl border p-5 text-left transition-colors ${
                selected
                  ? "border-black bg-gray-100 text-black shadow-sm dark:border-white dark:bg-[#1a1a1a] dark:text-white"
                  : "border-gray-300 bg-white text-black shadow-sm hover:border-black hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              <p className="text-sm font-semibold capitalize">{mode}</p>
              <p
                className={`mt-2 text-sm ${
                  selected
                    ? "text-gray-700 dark:text-white"
                    : "text-gray-600 dark:text-white/60 dark:group-hover:text-black"
                }`}
              >
                {mode === "dark"
                  ? "A deep black look with subtle contrast."
                  : "A light theme with white surfaces and soft borders."}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppearancePanel;
