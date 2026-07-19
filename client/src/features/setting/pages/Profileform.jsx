const ProfileForm = ({
  form,
  hasChanges,
  saving,
  message,
  error,
  onChange,
  onReset,
  onSave,
  profile,
  authUser,
}) => {
  return (
    <form
      onSubmit={onSave}
      className="max-w-3xl"
    >
      <div className="border-b border-default pb-6">
        <h1 className="text-2xl font-semibold">Public Profile</h1>
        <p className="mt-2 text-sm text-gray-400">This information may be displayed publicly.</p>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasChanges || saving}
            className="rounded-md border border-default px-3 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!hasChanges || saving}
            className="rounded-md bg-btn-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-btn-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {message ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-white/75">First name</span>
          <input
            name="first_name"
            value={form.first_name}
            onChange={onChange}
            placeholder="First name"
            className="w-full rounded-md border border-default bg-surface px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/75">Last name</span>
          <input
            name="last_name"
            value={form.last_name}
            onChange={onChange}
            placeholder="Last name"
            className="w-full rounded-md border border-default bg-surface px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-white/75">Username</span>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="username"
            className="w-full rounded-md border border-default bg-surface px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-white/75">Email</span>
          <input
            value={profile?.email || authUser?.email || ""}
            readOnly
            aria-label="Email"
            className="w-full rounded-md border border-default bg-surface-raised px-3 py-2 text-sm text-muted outline-none"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-white/75">Short bio</span>
          <textarea
            name="bio"
            value={form.bio}
            onChange={onChange}
            rows={3}
            placeholder="A quick line about what you do"
            className="w-full rounded-md border border-default bg-surface px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-white/75">
            Profile description
          </span>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={6}
            placeholder="Add a longer description for your profile"
            className="w-full rounded-md border border-default bg-surface px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>
    </form>
  );
};

export default ProfileForm;
