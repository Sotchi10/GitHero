import Description from "./../components/Description";
import { useAuth } from "../../../context/AuthContext";
import { useOutletContext, useParams } from "react-router-dom";


const Profile = () => {
  const { username } = useParams();
  const { profile: authProfile, error: authError } = useAuth();
  const { viewedProfile: profile, profileLoading: loading, profileError: error } =
    useOutletContext();
  const isOwnProfile =
    authProfile?.user_id &&
    profile?.user_id &&
    String(authProfile.user_id) === String(profile.user_id);
  const displayProfile = isOwnProfile && authProfile ? authProfile : profile;


  if (loading || (!error && profile && profile.username !== username)) {
    return (
      <p className="py-18 px-10 text-sm text-gray-400">Loading profile...</p>
    );
  }

  return (
    <section className="py-18 px-10 text-[#e0e0e0]">
      <h4>{profile?.username || "Profile"}'s Profile</h4>

      {(error || authError) && (
        <p className="mt-3 text-red-400">{error || authError}</p>
      )}

      {displayProfile && (
        <>
          {/*<div className="mt-5 flex flex-wrap items-start gap-6 rounded border border-default p-5">
            {isOwnProfile ? (
           
            ) : (
              <Avatar profile={displayProfile} size="xl" />
            )}

            <div className="min-w-0">
              <h5 className="text-xl font-semibold">
                {displayProfile.full_name || displayProfile.username}
              </h5>
              <p className="text-sm text-gray-400">@{displayProfile.username}</p>
              <p className="mt-2 text-sm capitalize text-gray-300">{displayProfile.role}</p>
              <p className="mt-3 max-w-xl text-sm text-gray-300">
                {displayProfile.bio || "No bio yet."}
              </p>
            </div>
          </div>*/}

          <Description profile={displayProfile} canEdit={isOwnProfile} />

          {/*<div className="mt-5 rounded border border-default p-5">
            <h5 className="text-base font-semibold">Repositories</h5>
            {repoError && (
              <p className="mt-3 text-sm text-red-400">{repoError}</p>
            )}
            <div className="mt-3">
              {repositories.length > 0 ? (
                repositories.map((repo) => (
                  <RepoCard key={repo.repo_id} repo={repo} />
                ))
              ) : (
                <p className="text-sm text-gray-400">No repositories yet.</p>
              )}
            </div>
          </div>*/}
        </>
      )}
    </section>
  );
};

export default Profile;
