const fieldClass =
  "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/10 dark:bg-[#0b0b0f] dark:text-white dark:placeholder:text-white/40";

const ProfileForm = ({
  form,
  hasChanges,
  saving,
  message,
  error,
  onChange,
  onReset,
  onSave,
  displayName,
  roleLabel,
}) => {
  return (
    <form
      onSubmit={onSave}
      className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#14141a] dark:shadow-none sm:p-8"
    >
      <div className="border-b border-gray-200 pb-6 dark:border-white/10">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-500 dark:text-white/45">
          Editor
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Edit your public profile</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-white/65">
              Update your name, username, bio, and description from one place.
            </p>
          </div>
          <div className="grid gap-1 text-sm text-gray-600 dark:text-white/65 sm:text-right">
            <p className="font-medium text-gray-900 dark:text-white">{displayName}</p>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-white/40">
              {roleLabel}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasChanges || saving}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:text-white/75 dark:hover:border-white/40 dark:hover:text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!hasChanges || saving}
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200">
          {message}
        </div>
      )}
      {error && (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-white/75">First name</span>
          <input name="first_name" value={form.first_name} onChange={onChange} placeholder="First name" className={fieldClass} />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-white/75">Last name</span>
          <input name="last_name" value={form.last_name} onChange={onChange} placeholder="Last name" className={fieldClass} />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-700 dark:text-white/75">Username</span>
          <input name="username" value={form.username} onChange={onChange} placeholder="username" className={fieldClass} />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-700 dark:text-white/75">Short bio</span>
          <textarea name="bio" value={form.bio} onChange={onChange} rows={3} placeholder="A quick line about what you do" className={fieldClass} />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-700 dark:text-white/75">Profile description</span>
          <textarea name="description" value={form.description} onChange={onChange} rows={6} placeholder="Add a longer description for your profile" className={fieldClass} />
        </label>
      </div>
    </form>
  );
};

export default ProfileForm;