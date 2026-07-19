import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Profile from "./profile.jsx";
import SettingSidebar from "./SettingSidebar.jsx";
import { useTheme } from "../../../context/ThemeContext";

const Setting = ({ className = "" }) => {
  const { authUser, profile, logout } = useAuth();
  const navigate = useNavigate();
  const { theme: appearance, setTheme: setAppearance } = useTheme();

  const [activeSection, setActiveSection] = useState("profile");

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
    <section className={`min-h-full bg-primary px-4 py-8 ${className}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <SettingSidebar
          profile={profile}
          authUser={authUser}
          activeSection={activeSection}
          sections={sections}
          onSelectSection={setActiveSection}
          onLogout={handleLogout}
          appearance={appearance}
        />

        <div className="min-w-0 pb-12">
          {activeSection === "profile" ? (
            <Profile profile={profile} authUser={authUser} />
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

const AppearancePanel = ({ appearance, onAppearanceChange }) => {
  return (
    <div className="max-w-3xl">
      <div className="border-b border-default pb-5">
        <h1 className="text-2xl font-semibold">Appearance</h1>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Switch between a deeper dark look and a clean white look.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <ThemeChoice
          title="Dark"
          description="A deep black look with subtle contrast."
          selected={appearance === "dark"}
          onClick={() => onAppearanceChange("dark")}
        />

        <ThemeChoice
          title="Light"
          description="A light theme with white surfaces, soft borders, and readable contrast."
          selected={appearance === "light"}
          onClick={() => onAppearanceChange("light")}
        />
      </div>

      <div className="mt-6 border-t border-default pt-5 text-sm text-gray-400">
        <p>
          This setting is saved in your browser and applied the next time you
          open GitHero.
        </p>
      </div>
    </div>
  );
};

const ThemeChoice = ({ title, description, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border p-4 text-left transition-colors ${
        selected
          ? "border-blue-500 bg-blue-500/10"
          : "border-default bg-surface hover:bg-surface-raised"
      }`}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-gray-400">{description}</p>
    </button>
  );
};

export default Setting;
