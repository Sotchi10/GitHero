import DashIconContainer from "../features/dashboard/components/dashboard-ui/DashIconContainer";
import SearchBar from "../components/ui/SearchBar";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "../features/profile/components/Avatar";
import ThemeToggle from "../components/ui/ThemeToggle";
import { FiGrid, FiHome, FiMenu } from "react-icons/fi";
import { PiGitBranch } from "react-icons/pi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";

const quickLinks = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/repository", label: "Repositories", icon: PiGitBranch },
  { to: "/modules", label: "Modules", icon: MdOutlinePlayLesson },
  { to: "/community", label: "Community", icon: TbBuildingCommunity },
];

const DashNavBar = ({ onMenuToggle }) => {
  const { pathname } = useLocation();
  const { profile } = useAuth();

  const isPfp = `/profile/${profile?.username}`;
  const profilePath = profile?.username ? `/profile/${profile.username}` : "/dashboard";

  const formatPath = (path) => {
    const name =
      path === isPfp ? path.replace("/profile/", "") : path.replace("/", "");
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return (
    <nav className="flex h-16 w-full items-center justify-between gap-2 border-b border-default bg-surface px-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-1">
        <button type="button" onClick={onMenuToggle} className="rounded-md p-2 text-primary hover:bg-surface-raised lg:hidden" aria-label="Toggle navigation"><FiMenu /></button>
        <NavLink
          to="/dashboard"
          aria-label="Dashboard home"
          className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-surface-raised"
        >
          <FiHome className="text-lg" aria-hidden="true" />
        </NavLink>
        <NavLink
          to={pathname === isPfp? isPfp : pathname}
          className="truncate rounded-md px-2 py-1.5 text-[14px] font-semibold hover:bg-surface-raised"
        >
          {formatPath(pathname)}
        </NavLink>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="hidden lg:block"><SearchBar /></div>
        <ThemeToggle />

        <div className="hidden gap-2 md:flex" aria-label="Quick navigation">
          {quickLinks.map((link) => (
            <DashIconContainer key={link.to} {...link} />
          ))}
        </div>

        <NavLink
          to={profilePath}
          className="cursor-pointer"
        >
          <Avatar profile={profile} size="md" />
        </NavLink>
      </div>
    </nav>
  );
};

export default DashNavBar;
