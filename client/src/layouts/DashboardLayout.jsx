import DashSideBar from "./dashboardlayout/DashSideBar";
import DashNavBar from "./DashNavBar";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#080808]">
      {/* Navbar */}
      <DashNavBar activePath={pathname} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashSideBar activePath={pathname} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
