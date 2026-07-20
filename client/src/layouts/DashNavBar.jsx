import DashIconContainer from "../features/dashboard/components/dashboard-ui/DashIconContainer";
import SearchBar from "../components/ui/SearchBar";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "../features/profile/components/Avatar";
import ThemeToggle from "../components/ui/ThemeToggle";
import { FiGrid } from "react-icons/fi";
import { PiGitBranch } from "react-icons/pi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { TbBuildingCommunity } from "react-icons/tb";

const quickLinks = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/repository", label: "Repositories", icon: PiGitBranch },
  { to: "/modules", label: "Modules", icon: MdOutlinePlayLesson },
  { to: "/community", label: "Community", icon: TbBuildingCommunity },
];

const DashNavBar = () => {
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
    <nav className="flex h-16 w-full items-center justify-between border-b border-default bg-surface px-6">
      <div className="flex gap-1 items-center">
        <NavLink
          to="/dashboard"
          className="w-8 h-8 rounded-[100%] bg-gray-400 cursor-pointer"
        >
          <img src="../../public/GitHeroLOGO.png" alt="" className="w-full h-full rounded-[100%]"/>
        </NavLink>
        <NavLink
          to={pathname === isPfp? isPfp : pathname}
          className="rounded-md px-2 py-1.5 text-[14px] font-semibold hover:bg-surface-raised"
        >
          {formatPath(pathname)}
        </NavLink>
      </div>

      <div className="flex gap-4 items-center">
        <SearchBar />
        <ThemeToggle />

        <div className="flex gap-2" aria-label="Quick navigation">
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
