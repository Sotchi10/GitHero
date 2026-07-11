import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Palette, User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Profile from "./profile.jsx";
import SettingSidebar from "./SettingSidebar.jsx";

const Setting = ({ className = "" }) => {
  const { authUser, profile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");
  const [appearance, setAppearance] = useState(() => {
    return localStorage.getItem("githero-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = appearance;
    localStorage.setItem("githero-theme", appearance);
  }, [appearance]);

  useEffect(() => {
    document.body.classList.toggle("theme-white", appearance === "white");
    document.body.classList.toggle("theme-dark", appearance !== "white");
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
    <section
      className={`min-h-full bg-primary px-4 py-6 text-white ${className}`}
    >
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
        <SettingSidebar
          profile={profile}
          authUser={authUser}
          activeSection={activeSection}
          sections={sections}
          onSelectSection={setActiveSection}
          onLogout={handleLogout}
          appearance={appearance}
        />

        <div className="rounded-[28px] border border-white/10 bg-surface p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6">
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
    <div className="flex min-h-140 flex-col rounded-3xl border border-white/10 bg-primary p-6">
      <div className="border-b border-white/10 pb-5">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Appearance
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Choose your theme</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
          Switch between a deeper dark look and a clean white look.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ThemeChoice
          title="Dark"
          description="A deep black look with subtle contrast."
          selected={appearance === "dark"}
          onClick={() => onAppearanceChange("dark")}
        />

        <ThemeChoice
          title="White"
          description="A light theme with white surfaces, soft borders, and readable contrast."
          selected={appearance === "white"}
          onClick={() => onAppearanceChange("white")}
        />
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-surface p-5 text-sm text-white/70">
        <p className="text-xs uppercase tracking-[0.3em] text-white/45">
          Current mode
        </p>
        <p className="mt-3 text-lg font-medium text-white">
          {appearance === "white" ? "White" : "Dark"}
        </p>
        <p className="mt-2 leading-6 text-white/60">
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
      className={`rounded-3xl border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-cyan-400/40 bg-cyan-400/10 shadow-[0_16px_40px_rgba(24,73,168,0.15)]"
          : "border-white/10 bg-white/5 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
    </button>
  );
};

export default Setting;
