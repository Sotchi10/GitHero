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
    <aside className="border-t border-default pt-6 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
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
