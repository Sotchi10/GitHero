import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  createRepositoryCommit,
  createRepositoryFile,
  getRepositoryCommits,
  getRepositoryFiles,
  saveRepositoryFile,
  getRepositoryByPath,
} from "../../../api/apiRepository";
import DashSideBarRight from "../../../layouts/dashboardlayout/DashSideBarRight";

const RepositoryDetail = ({ className = "" }) => {
  const { username, reponame } = useParams();
  const { authUser, profile, loading: authLoading } = useAuth();

  const userId = profile?.user_id || authUser?.user_id;

  const [repository, setRepository] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("");

  const [newFileName, setNewFileName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [commits, setCommits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [committing, setCommitting] = useState(false);
  const [error, setError] = useState("");

  const repoId = repository?.repo_id || repository?.id;

  // LOAD DATA
  useEffect(() => {
    if (authLoading || !userId) return;

    const loadRepository = async () => {
      try {
        setLoading(true);
        setError("");

        const repoRes = await getRepositoryByPath(username, reponame, userId);
        const repo = repoRes.data;

        setRepository(repo);

        const filesRes = await getRepositoryFiles(repo.repo_id || repo.id, userId);
        const filesData = Array.isArray(filesRes.data)
          ? filesRes.data
          : filesRes.data?.files || [];

        setFiles(filesData);

        const commitsRes = await getRepositoryCommits(repo.repo_id || repo.id, userId);
        const commitsData = Array.isArray(commitsRes.data)
          ? commitsRes.data
          : commitsRes.data?.commits || [];

        setCommits(commitsData);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load repository");
      } finally {
        setLoading(false);
      }
    };

    loadRepository();
  }, [username, reponame, userId, authLoading]);

  // SELECT FILE
  const handleSelectFile = (file) => {
    setSelectedFile(file);
    setContent(file.content ?? "");
    setError("");
  };

  // CREATE FILE
  const handleCreateFile = async (e) => {
    e.preventDefault();

    if (!newFileName.trim() || !repoId || !userId || creating) return;

    try {
      setCreating(true);
      setError("");

      const res = await createRepositoryFile(
        repoId, 
        {
          name: newFileName.trim(),
          content: "",
        },
        userId,
      );

      const createdFile = res.data?.file || res.data;
      if (!createdFile) throw new Error("Invalid file response");

      setFiles((prev) => {
        const exists = prev.some((f) => f.file_id === createdFile.file_id);
        return exists ? prev : [...prev, createdFile];
      });

      setSelectedFile(createdFile);
      setContent(createdFile.content ?? "");
      setNewFileName("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create file");
    } finally {
      setCreating(false);
    }
  };

  // SAVE FILE
  const saveCurrentFile = async () => {
    if (!selectedFile?.file_id) return;

    const res = await saveRepositoryFile(
      repoId,
      selectedFile.file_id,
      { content },
      userId,
    );

    const savedFile = res.data.file;

    setSelectedFile(savedFile);
    setFiles((prev) =>
      prev.map((f) => (f.file_id === savedFile.file_id ? savedFile : f)),
    );

    return savedFile;
  };

  const handleSaveFile = async () => {
    if (!selectedFile || !repoId || !userId || saving) return;

    try {
      setSaving(true);
      setError("");
      await saveCurrentFile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save file");
    } finally {
      setSaving(false);
    }
  };

  // COMMIT
  const handleCreateCommit = async (e) => {
    e.preventDefault();

    if (!commitMessage.trim() || !repoId || !userId || committing) return;

    try {
      setCommitting(true);
      setError("");

      if (selectedFile && content !== (selectedFile.content ?? "")) {
        await saveCurrentFile();
      }

      const res = await createRepositoryCommit(
        repoId,
        { message: commitMessage.trim() },
        userId,
      );

      setCommits((prev) => [res.data.commit, ...prev]);
      setCommitMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to commit");
    } finally {
      setCommitting(false);
    }
  };

  return (
    <section
      className={`flex min-h-full flex-col bg-white text-gray-900 dark:bg-[#080808] dark:text-[#e0e0e0] ${className} px-4 py-15`}
    >
      <main className="h-full overflow-y-auto px-5 bg-white dark:bg-[#080808]">
        {loading ? (
          <p className="text-sm text-gray-400 dark:text-gray-500">Loading repository...</p>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
            {/* LEFT */}
            <div className="flex flex-col gap-4">
              {/* HEADER */}
              <div className="rounded border border-gray-200 bg-white p-5 shadow-sm dark:border-[#242424] dark:bg-[#0d0d0d]">
                <h1 className="text-xl font-semibold text-blue-500">
                  {repository?.name}
                </h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {repository?.description || "No description"}
                </p>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Owner: {repository?.username}
                </p>
              </div>

              {error && <p className="text-sm text-red-400 dark:text-red-400">{error}</p>}

              {/* CREATE FILE */}
              <div className="rounded border border-gray-200 bg-white p-4 shadow-sm dark:border-[#242424] dark:bg-[#0d0d0d]">
                <h2 className="mb-3 text-sm font-semibold">Create File</h2>

                <form onSubmit={handleCreateFile} className="flex gap-2">
                  <input
                    id="fileName"
                    name="fileName"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="example.js"
                    className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-white"
                  />

                  <button
                    type="submit"
                    disabled={creating}
                    className="rounded bg-blue-600 px-4 py-2 text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {creating ? "Creating..." : "Add"}
                  </button>
                </form>
              </div>

              {/* FILE AREA */}
              <div className="grid gap-4 rounded border border-gray-200 bg-white p-4 shadow-sm lg:grid-cols-[220px_1fr] dark:border-[#242424] dark:bg-[#0d0d0d]">
                {/* FILE LIST */}
                <div className="border-r border-gray-200 pr-3 dark:border-[#242424]">
                  <h2 className="mb-3 text-sm font-semibold">Files</h2>

                  {files.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No files</p>
                  ) : (
                    files.map((file) => (
                      <button
                        key={file.file_id}
                        onClick={() => handleSelectFile(file)}
                        className={`block w-full rounded px-3 py-2 text-left text-sm ${
                          selectedFile?.file_id === file.file_id
                            ? "bg-blue-600 text-white"
                            : "hover:bg-[#1a1a1a] dark:hover:bg-[#1a1a1a]"
                        } cursor-pointer`}
                      >
                        {file.path}
                      </button>
                    ))
                  )}
                </div>

                {/* EDITOR */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-semibold">
                      {selectedFile ? selectedFile.path : "Select a file"}
                    </h2>

                    <button
                      onClick={handleSaveFile}
                      disabled={saving || !selectedFile}
                      className="rounded bg-green-600 px-4 py-2 text-sm disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>

                  <textarea
                    value={content}
                    disabled={!selectedFile}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="File content..."
                    className="min-h-350px resize-none rounded border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 dark:border-[#333] dark:bg-[#111] dark:text-white"
                  />
                </div>
              </div>

              {/* COMMIT */}
              <div className="rounded border border-gray-200 bg-white p-4 shadow-sm dark:border-[#242424] dark:bg-[#0d0d0d]">
                <h2 className="mb-3 text-sm font-semibold">Commit Changes</h2>

                <form onSubmit={handleCreateCommit} className="flex gap-2">
                  <input
                    id="commitMessage"
                    name="commitMessage"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Commit message..."
                   className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-[#333] dark:bg-[#1a1a1a] dark:text-white"
                  />

                  <button
                    type="submit"
                    disabled={committing}
                    className="cursor-pointer rounded bg-purple-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                  >
                    {committing ? "Committing..." : "Commit"}
                  </button>
                </form>
              </div>

              {/* HISTORY */}
              <div className="rounded border border-gray-200 bg-white p-4 shadow-sm dark:border-[#242424] dark:bg-[#0d0d0d]">
                <h2 className="mb-3 text-sm font-semibold">Commit History</h2>

                {commits.length === 0 ? (
                  <p className="text-sm text-gray-500">No commits yet.</p>
                ) : (
                  commits.map((commit) => (
                    <div
                      key={commit.commit_id}
                      className="border-b border-[#242424] py-3 dark:border-[#242424]"
                    >
                      <p className="text-sm">{commit.message}</p>
                      <p className="text-xs text-gray-500">
                        by {commit.author_username || commit.username || "Unknown"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT */}
            <DashSideBarRight title="Repo" link="Repo" />
          </div>
        )}
      </main>
    </section>
  );
};

export default RepositoryDetail;
