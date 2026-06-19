import DashIconContainer from "../features/dashboard/components/dashboard-ui/DashIconContainer";
import SearchBar from "../components/ui/SearchBar";
import DashNavItem from "../features/dashboard/components/dashboard-ui/DashNavItem";
import cat from "../assets/image/cat.jpg";
import { NavLink, useLocation } from "react-router-dom";

const DashNavBar = () => {
  const { pathname } = useLocation();

  const formatPath = (path) => {
    const name = path.replace("/", "");
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  return (
    <nav className="w-full h-16 bg-transparent border-b border-default flex items-center justify-between px-6">
      {/* Current Path Display */}
      <DashNavItem itemName={formatPath(pathname)} className="font-semibold" />

      <div className="flex gap-6 items-center">
        <SearchBar />

        <div className="flex gap-3">
          <DashIconContainer />
          <DashIconContainer />
          <DashIconContainer />
          <DashIconContainer />
        </div>

        <NavLink to="/profile" className="w-9.5 h-9.5 cursor-pointer">
          <img src={cat} alt="catpfp" className="w-full h-full rounded-full" />
        </NavLink>
      </div>
    </nav>
  );
};

export default DashNavBar;
