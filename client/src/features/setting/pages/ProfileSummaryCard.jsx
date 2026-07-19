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
    <div className="text-center">
      <div className="flex justify-center">
        <div className="rounded-full border border-default bg-surface p-1">
          <Avatar
            profile={profile}
            size="xl"
            className="ring-4 ring-cyan-200/20"
          />
        </div>

        <div className="min-w-0">
          <p className="mt-3 truncate text-sm font-semibold">
            {displayName || initialsSource || profile.username}
          </p>
          <p className="truncate text-sm text-gray-400">@{form.username}</p>
          <div className="mt-2 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-blue-500">
            {roleLabel}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileSummaryCard;
