import Avatar from "../../profile/components/Avatar";

const ProfileLivePreview = ({ profile, form, displayName }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.35em] text-white/45">
        Profile preview
      </p>
      <div className="mt-5 rounded-3xl border border-white/10 bg-[#0b1024] p-5">
        <div className="flex items-center gap-4">
          <Avatar
            profile={{
              ...profile,
              first_name: form.first_name,
              last_name: form.last_name,
              username: form.username,
            }}
            size="lg"
          />
          <div>
            <h3 className="text-xl font-semibold">
              {displayName || profile.username}
            </h3>
            <p className="text-sm text-white/60">@{form.username}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/70">
          {form.bio || "Your short bio will appear here."}
        </p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/65">
          {form.description ||
            "Your longer profile description will appear here as you write it."}
        </div>
      </div>
    </div>
  );
};

export default ProfileLivePreview;
