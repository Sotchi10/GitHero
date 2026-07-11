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
      className="rounded-[28px] border border-white/10 bg-surface p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Editor
        </p>

        <div className="mt-4 flex flex-col gap-4 rounded-3xl border border-white/10 bg-primary p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Edit your public profile</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/65">
              Update your name, username, bio, and description from one place.
            </p>
          </div>

          <div className="grid gap-2 text-sm text-white/70 sm:text-right">
            <p className="font-medium text-white">
              {profile?.full_name || profile?.username || authUser?.username}
            </p>
            <p>@{form.username || profile?.username || authUser?.username}</p>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              {profile?.role || authUser?.role || "member"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasChanges || saving}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!hasChanges || saving}
            className="rounded-full bg-linear-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
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
            className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-white/75">Last name</span>
          <input
            name="last_name"
            value={form.last_name}
            onChange={onChange}
            placeholder="Last name"
            className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-white/75">Username</span>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="username"
            className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
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
            className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
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
            className="w-full rounded-2xl border border-white/10 bg-primary px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>
      </div>
    </form>
  );
};

export default ProfileForm;
