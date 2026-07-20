import DashSideBar from "./dashboardlayout/DashSideBar";
import DashNavBar from "./DashNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPfp } from "../api/apiProfile";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const profileUsername = pathname.startsWith("/profile/")
    ? decodeURIComponent(pathname.split("/")[2] || "")
    : "";
  const [profileResult, setProfileResult] = useState({
    username: "",
    profile: null,
    error: "",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const viewedProfile =
    profileUsername && profileResult.username === profileUsername
      ? profileResult.profile
      : null;
  const profileError =
    profileUsername && profileResult.username === profileUsername
      ? profileResult.error
      : "";
  const profileLoading = Boolean(
    profileUsername && profileResult.username !== profileUsername
  );

  useEffect(() => {
    if (!profileUsername) return undefined;

    let active = true;

    getPfp(profileUsername)
      .then((res) => {
        if (!active) return;
        setProfileResult({
          username: profileUsername,
          profile: res.data,
          error: "",
        });
      })
      .catch((err) => {
        if (!active) return;
        setProfileResult({
          username: profileUsername,
          profile: null,
          error: err.response?.data?.message || "Failed to load profile",
        });
      });

    return () => {
      active = false;
    };
  }, [profileUsername]);
  const isSettings = pathname.startsWith("/settings");

  return (
    <div className="min-h-screen w-full flex flex-col bg-primary">
      {/* Navbar */}
      <DashNavBar onMenuToggle={() => setIsSidebarOpen((open) => !open)} />

      {/* Body */}
      <div className="flex flex-1 min-w-0">
        {/* Sidebar */}
        {!isSettings && (
          <DashSideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} viewedProfile={viewedProfile} />
        )}
        {!isSettings && isSidebarOpen && <button type="button" className="fixed inset-16 z-30 bg-black/50 lg:hidden" aria-label="Close navigation menu" onClick={() => setIsSidebarOpen(false)} />}

        {/* Content */}
        <main
          className={`min-w-0 flex-1 overflow-y-auto ${isSettings ? "p-0" : "p-4 sm:p-6"}`}
        >
          <Outlet context={{ viewedProfile, profileLoading, profileError }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
