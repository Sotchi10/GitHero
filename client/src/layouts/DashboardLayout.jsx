import DashSideBar from "./dashboardlayout/DashSideBar";
import DashNavBar from "./DashNavBar";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Top Navbar */}
      <DashNavBar activePath={pathname} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashSideBar activeUser={user?.username} activePath={pathname} />

        {/* Content Area */}
        <main className="flex-1 bg-[#080808] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
