const AppearancePanel = ({ appearance, onAppearanceChange }) => {
  return (
    <div className="flex min-h-[400px] flex-col">
      <div className="border-b border-gray-200 pb-5 dark:border-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-400 dark:text-white/45">
          Appearance
        </p>
        <h2 className="mt-2 text-2xl font-semibold">Choose your theme</h2>
        <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-white/65">
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
              className={`rounded-2xl border p-5 text-left transition-colors ${
                selected
                  ? "border-cyan-400 bg-cyan-50 dark:border-cyan-400/50 dark:bg-cyan-400/10"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20"
              }`}
            >
              <p className="text-sm font-semibold capitalize">{mode}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-white/60">
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