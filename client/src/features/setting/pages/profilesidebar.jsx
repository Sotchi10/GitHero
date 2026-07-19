import ProfileSummaryCard from "./ProfileSummaryCard.jsx";

const ProfileSidebar = ({
  profile,
  authUser,
  form,
  displayName,
  initialsSource,
  roleLabel,
}) => {
  return (
    <aside className="space-y-6 rounded-[28px] border border-white/10 bg-surface p-6 backdrop-blur-xl">
      <ProfileSummaryCard
        profile={profile}
        authUser={authUser}
        form={form}
        displayName={displayName}
        initialsSource={initialsSource}
        roleLabel={roleLabel}
      />
    </aside>
  );
};

export default ProfileSidebar;
