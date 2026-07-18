const ProfileSummaryCard = ({ profile, displayName, roleLabel }) => {
  const initials =
    displayName
      ?.split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="flex flex-col items-center gap-3 rounded-[24px] border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-[#14141a] dark:shadow-none">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100 text-xl font-semibold text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300">
        {initials}
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{displayName}</p>
        <p className="text-sm text-gray-600 dark:text-white/60">@{profile.username}</p>
      </div>
      <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-300">
        {roleLabel}
      </span>

      <div className="mt-2 w-full space-y-2 border-t border-gray-200 pt-4 text-left text-sm dark:border-white/10">
        <div className="flex items-center justify-between rounded-xl bg-gray-100 px-3 py-2 dark:bg-white/5">
          <span className="text-gray-600 dark:text-white/55">Email</span>
          <span className="font-medium text-gray-900 dark:text-white">{profile.email || "—"}</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-gray-100 px-3 py-2 dark:bg-white/5">
          <span className="text-gray-600 dark:text-white/55">Status</span>
          <span className="font-medium text-gray-900 dark:text-white">Active</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummaryCard;