import { useEffect, useState } from "react";
import Description from "./../components/Description";
import { useAuth } from "../../../context/AuthContext";
import { useOutletContext, useParams } from "react-router-dom";
import { getMyRepositories } from "../../../api/apiRepository";
import RepoCard from "../../repository/components/layout/RepoCard";


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
  const userId = authProfile?.user_id;
  const [repositories, setRepositories] = useState([]);
  const [repositoriesLoading, setRepositoriesLoading] = useState(false);
  const [repositoriesError, setRepositoriesError] = useState("");

  useEffect(() => {
    if (!isOwnProfile || !userId) return;

    const loadRepositories = async () => {
      try {
        setRepositoriesLoading(true);
        setRepositoriesError("");
        const response = await getMyRepositories(userId);
        setRepositories(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setRepositoriesError(
          err.response?.data?.message || "Failed to load repositories",
        );
        setRepositories([]);
      } finally {
        setRepositoriesLoading(false);
      }
    };

    loadRepositories();
    window.addEventListener("repositories-changed", loadRepositories);
    return () => window.removeEventListener("repositories-changed", loadRepositories);
  }, [isOwnProfile, userId]);


  if (loading || (!error && profile && profile.username !== username)) {
    return (
      <p className="px-4 py-18 text-sm text-gray-400 sm:px-6 lg:px-10">Loading profile...</p>
    );
  }

  return (
    <section className="px-4 py-18 text-[#e0e0e0] sm:px-6 lg:px-10">
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

          {isOwnProfile && (
            <div className="mt-5 rounded border border-default p-5">
              <h5 className="text-base font-semibold">Repositories</h5>
              {repositoriesError && (
                <p className="mt-3 text-sm text-red-400">{repositoriesError}</p>
              )}
              {repositoriesLoading ? (
                <p className="mt-3 text-sm text-gray-400">Loading repositories...</p>
              ) : (repositories ?? []).length > 0 ? (
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {(repositories ?? []).map((repo) => (
                    <RepoCard key={repo.id || repo.repo_id} repo={repo} currentUserId={userId} />
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-400">No repositories yet.</p>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
