import DashIconContainer from "../features/dashboard/components/dashboard-ui/DashIconContainer";
import SearchBar from "../components/ui/SearchBar";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "../features/profile/components/Avatar";

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
    <nav className="w-full h-16 bg-transparent border-b border-default flex items-center justify-between px-6">
      <div className="flex gap-1 items-center">
        <NavLink
          to="/dashboard"
          className="w-8 h-8 rounded-[100%] bg-gray-400 cursor-pointer"
        ></NavLink>
        <NavLink
          to={pathname === isPfp? isPfp : pathname}
          className="text-[14px] hover:bg-[#161616] px-2 py-1.5 rounded-[5px] font-semibold"
        >
          {formatPath(pathname)}
        </NavLink>
      </div>

      <div className="flex gap-6 items-center">
        <SearchBar />

        <div className="flex gap-3">
          <DashIconContainer />
          <DashIconContainer />
          <DashIconContainer />
          <DashIconContainer />
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
