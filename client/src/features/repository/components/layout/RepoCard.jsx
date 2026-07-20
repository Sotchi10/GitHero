import { NavLink } from "react-router-dom";

const formatDate = (value) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const getDaysAgo = (createdAt) => {
  if (!createdAt) return "";

  const days = Math.floor(
    (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24),
  );

  return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;
};

const RepoCard = ({ repo, currentUserId, onDelete }) => {
  const repoId = repo.id || repo.repo_id;
  const repoName = repo.name || "Untitled repository";
  const username = repo.username || "unknown";
  const canDelete =
    repo.user_id && currentUserId && String(repo.user_id) === String(currentUserId);
  const fullName = `${username}/${repoName}`;
  const language = repo.language || "Not specified";
  const visibility = repo.visibility === "private" ? "private" : "public";
  const repoPath = `/repository/${encodeURIComponent(
    username,
  )}/${encodeURIComponent(repoName)}`;
  const updatedAt = repo.updated_at || repo.created_at;

  return (
    <>
      <div className="border border-default px-5 py-6">
        <NavLink
          to={repoPath}
          className="font-semibold text-blue-500 hover:underline"
        >
          <h5 className="text-[15px]">{fullName}</h5>
        </NavLink>
        <p className="text-[13px] text-gray-300">
          {repo.description || "No description yet."}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                visibility === "private" ? "bg-red-500" : "bg-green-500"
              }`}
              aria-hidden="true"
            />
            <span className="text-[13.5px] text-muted">{visibility}</span>
            <span className="text-[12px] text-gray-400">{language}</span>
          </div>

          <div className="flex items-center gap-3">
            {canDelete && (
              <button
                type="button"
                onClick={() => onDelete?.(repoId)}
                className="text-[13px] text-red-400 hover:underline"
              >
                Delete
              </button>
            )}
            <p className="text-[12px]" title={formatDate(updatedAt)}>
              {getDaysAgo(updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default RepoCard;
