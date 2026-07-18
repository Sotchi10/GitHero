import { NavLink } from "react-router-dom";
import Avatar from "../../profile/components/Avatar";

const DevCard = ({ developer }) => {
  const displayName =
    developer?.full_name || developer?.username || "Developer";
  const profilePath = developer?.username
    ? `/profile/${developer.username}`
    : "/developers";

return (
  <div className="flex items-center gap-3 rounded px-2 py-2">
    <NavLink to={profilePath} aria-label={`${displayName} profile`}>
      <Avatar profile={developer} size="md" />
    </NavLink>

    <div className="flex min-w-0 flex-col">
      <NavLink
        to={profilePath}
        className="truncate text-[14px] font-normal text-gray-900 hover:underline dark:text-gray-100"
      >
        {displayName}
      </NavLink>

      <p className="truncate text-[13px] text-gray-500 dark:text-gray-400">
        @{developer?.username}
      </p>
    </div>
  </div>
);
};
export default DevCard;
