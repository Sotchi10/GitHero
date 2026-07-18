import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import SettingSidebar from "./components/SettingSidebar.jsx";
import ProfilePanel from "./components/ProfilePanel.jsx";
import AppearancePanel from "./components/AppearancePanel.jsx";

const Setting = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");
  const [appearance, setAppearance] = useState(
    () => localStorage.getItem("githero-theme") || "dark",
  );

useEffect(() => {
  document.documentElement.dataset.theme = appearance;
  localStorage.setItem("githero-theme", appearance);
}, [appearance]);

  const sections = useMemo(
    () => [
      { id: "profile", label: "Public profile", icon: User },
      { id: "appearance", label: "Appearance", icon: Palette },
    ],
    [],
  );

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <section className="min-h-full w-full bg-gray-50 px-4 py-6 text-gray-900 dark:bg-[#0b0b0f] dark:text-white">
      <div className="grid w-full min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <SettingSidebar
          activeSection={activeSection}
          sections={sections}
          onSelectSection={setActiveSection}
          onLogout={handleLogout}
        />

        <div className="min-w-0 w-full rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#14141a] dark:shadow-none sm:p-6">
          {activeSection === "profile" ? (
            <ProfilePanel />
          ) : (
            <AppearancePanel
              appearance={appearance}
              onAppearanceChange={setAppearance}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Setting;