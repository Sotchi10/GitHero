import DashSideBar from "./dashboardlayout/DashSideBar";
import DashNavBar from "./DashNavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPfp } from "../api/apiProfile";

const DashboardLayout = () => {
  const { pathname } = useLocation();
<<<<<<< HEAD
  const profileUsername = pathname.startsWith("/profile/")
    ? decodeURIComponent(pathname.split("/")[2] || "")
    : "";
  const [profileResult, setProfileResult] = useState({
    username: "",
    profile: null,
    error: "",
  });
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
=======
  const isSettings = pathname.startsWith("/settings");
>>>>>>> be28d6d1cdd56d5909cd093a5284dad3a24e43e0

  return (
    <div className="min-h-screen w-full flex flex-col bg-primary">
      {/* Navbar */}
      <DashNavBar activePath={pathname} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
<<<<<<< HEAD
        <DashSideBar activePath={pathname} viewedProfile={viewedProfile} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ viewedProfile, profileLoading, profileError }} />
=======
        {!isSettings ? <DashSideBar activePath={pathname} /> : null}

        {/* Content */}
        <main
          className={`flex-1 overflow-y-auto ${isSettings ? "p-0" : "p-6"}`}
        >
          <Outlet />
>>>>>>> be28d6d1cdd56d5909cd093a5284dad3a24e43e0
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
