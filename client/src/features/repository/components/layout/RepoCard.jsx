import { NavLink } from "react-router-dom";
import DashNavItem from "./../../../dashboard/components/dashboard-ui/DashNavItem";

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

const RepoCard = ({ repo }) => {
  const repoName = repo.name || "Untitled repository";
  const username = repo.username || "unknown";
  const fullName = `${username}/${repoName}`;
  const repoPath = `/repository/${encodeURIComponent(
    username,
  )}/${encodeURIComponent(repoName)}`;
  const updatedAt = repo.updated_at || repo.created_at;

  return (
    <>
      <div className="border-b-1 border-default px-5 py-6">
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
          <DashNavItem itemName={repo.visibility || "public"} />

          <p className="text-[12px]" title={formatDate(updatedAt)}>
            {getDaysAgo(updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};
export default RepoCard;
