import DashSideBarRight from "./../../../layouts/dashboardlayout/DashSideBarRight";
import { useEffect, useState } from "react";
import RepoCard from "./../components/layout/RepoCard";
import { useAuth } from "../../../context/AuthContext";
import Button from "./../../../components/ui/Button";
import RepoCreate from "../components/layout/RepoCreate";

import {
  getMyRepositories,
  createRepository,
} from "../../../api/apiRepository";

const Repository = ({ className = "" }) => {
  const { authUser, profile, loading: authLoading } = useAuth();

  const userId = profile?.user_id || authUser?.user_id;

  const [repositories, setRepositories] = useState([]);
  const [isRepoLoading, setIsRepoLoading] = useState(true);
  const [visibleLoadError, setVisibleLoadError] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createError, setCreateError] = useState("");

  // LOAD REPOSITORIES
  useEffect(() => {
    if (authLoading || !userId) {
      return;
    }

    const loadRepos = async () => {
      try {
        setIsRepoLoading(true);
        setVisibleLoadError("");

        const res = await getMyRepositories(userId);

        setRepositories(res.data || []);
      } catch (err) {
        console.error(err);

        setVisibleLoadError(
          err.response?.data?.message || "Failed to load repositories",
        );
      } finally {
        setIsRepoLoading(false);
      }
    };

    loadRepos();
  }, [userId, authLoading]);

  // POPUP HANDLERS
  const showPopup = () => setShowCreate(true);
  const closePopup = () => setShowCreate(false);

  // CREATE REPO
  const handleCreateRepository = async (form) => {
    if (!userId || saving) return;

    try {
      setSaving(true);
      setCreateError("");

      const res = await createRepository(form, userId);

      setRepositories((prev) => [res.data.repository, ...prev]);

      setShowCreate(false);
    } catch (err) {
      setCreateError(
        err.response?.data?.message || "Failed to create repository",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* POPUP */}
      {showCreate && (
        <RepoCreate
          onClose={closePopup}
          onCreate={handleCreateRepository}
          saving={saving}
          error={createError}
        />
      )}

      <section
        className={`flex min-h-full flex-col bg-[#080808] text-[#e0e0e0] ${className} px-4 py-10`}
      >
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto px-5">
            <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
              {/* LEFT */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold">Your Repositories</h1>
                  <Button text="New" bcolor="primary" onClick={showPopup} />
                </div>

                <div className="border border-[#242424] px-3 py-4 rounded-lg">
                  {visibleLoadError && (
                    <p className="px-5 py-4 text-sm text-red-400">
                      {visibleLoadError}
                    </p>
                  )}

                  {isRepoLoading ? (
                    <p className="px-5 py-4 text-sm text-gray-400">
                      Loading repositories...
                    </p>
                  ) : repositories.length > 0 ? (
                    repositories.map((repo) => (
                      <RepoCard key={repo.repo_id} repo={repo} />
                    ))
                  ) : (
                    <p className="px-5 py-4 text-sm text-gray-400">
                      No repositories yet.
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <DashSideBarRight title="Repo" link="Repo" />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Repository;
