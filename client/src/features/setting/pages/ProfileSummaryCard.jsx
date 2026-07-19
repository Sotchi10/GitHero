import Avatar from "../../profile/components/Avatar";

const ProfileSummaryCard = ({
  profile,
  authUser,
  form,
  displayName,
  initialsSource,
  roleLabel,
}) => {
  return (
    <div className="rounded-4xl border border-white/10 bg-primary p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-full border border-white/10 bg-white/5 p-1">
          <Avatar
            profile={profile}
            size="xl"
            className="ring-4 ring-cyan-200/20"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">
            {displayName || initialsSource || profile.username}
          </p>
          <p className="truncate text-sm text-white/60">@{form.username}</p>
          <div className="mt-2 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-200">
            {roleLabel}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-white/45">Email</p>
          <p className="mt-1 break-all text-white/90">
            {profile.email || authUser?.email || "Not available"}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-white/45">Status</p>
          <p className="mt-1 text-white/90">Active profile</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
