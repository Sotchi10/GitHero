const ProfileAccountDetails = ({ profile, roleLabel }) => {
  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Account details
        </p>
        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-white/55">Username</span>
            <span className="font-medium text-white">@{profile.username}</span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-white/55">Role</span>
            <span className="font-medium text-white">{roleLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="text-white/55">Profile ID</span>
            <span className="font-medium text-white">
              #{profile.profile_id}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/10 p-5 text-sm text-cyan-50">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
          Note
        </p>
        <p className="mt-3 leading-6 text-cyan-50/85">
          Avatar upload is handled separately in the profile flow. This page
          focuses on the editable identity and about sections.
        </p>
      </div>
    </div>
  );
};

export default ProfileAccountDetails;
