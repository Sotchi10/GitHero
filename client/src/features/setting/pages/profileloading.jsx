const ProfileLoading = () => {
  return (
    <div className="min-h-[60vh] rounded-[28px] border border-white/10 bg-surface p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.35em] text-white/50">
        Profile settings
      </p>
      <h1 className="mt-4 text-3xl font-semibold">Loading profile</h1>
      <p className="mt-3 max-w-xl text-sm text-white/65">
        We are pulling your account details so the editor can show your latest
        profile data.
      </p>
    </div>
  );
};

export default ProfileLoading;
