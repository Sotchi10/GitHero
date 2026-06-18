import DashSideBar from "./dashboardlayout/DashSideBar";
import DashNavBar from "./dashboardlayout/DashNavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [activePath, setActivePath] = useState("/dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Top Navbar */}
      <DashNavBar activePath={activePath} setActivePath={setActivePath} />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashSideBar activeUser={user.username} activePath={activePath} setActivePath={setActivePath} />

        {/* Content Area */}
        <main className="flex-1 bg-[#080808] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
