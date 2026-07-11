import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiGitBranch } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import { TbBuildingCommunity } from "react-icons/tb";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";

import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import DashNavItem from "../../features/dashboard/components/dashboard-ui/DashNavItem";
import Avatar from "../../features/profile/components/Avatar";
import { useState, useEffect } from "react";
import { updateCurrentProfile } from "../../api/apiProfile";

const DashSideBar = () => {
  const { profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isProfileSection = pathname.startsWith("/profile");
  const isRepoSection = pathname.startsWith("/repository");

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    bio: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        username: profile.username || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setError("");
    setIsEditing(false);
    setForm({
      username: profile?.username || "",
      bio: profile?.bio || "",
    });
  };

  const handleSave = async () => {
    if (!profile?.user_id || saving) return;

    if (!form.username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const updatedProfile = await updateProfile({
        username: form.username.trim(),
        bio: form.bio.trim(),
      });

      setIsEditing(false);

      if (
        updatedProfile?.username &&
        updatedProfile.username !== profile.username
      ) {
        navigate(`/profile/${updatedProfile.username}`, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <div className="w-full px-8 py-5 border border-default mt-4 rounded-[8px]">
        <p>Profile data is unavailable.</p>
      </div>
    );
  }

  const navItems = [
    {
      section: "Workspace",
      items: [
        { name: "Dashboard", icon: RxDashboard, path: "/dashboard" },
        { name: "Repository", icon: PiGitBranch, path: "/repository" },
        { name: "Codespaces", icon: FaLaptopCode, path: "/codespaces" },
      ],
    },
    {
      section: "Resources",
      items: [
        { name: "Quick References", icon: RiTodoLine, path: "/references" },
        { name: "Community", icon: TbBuildingCommunity, path: "/community" },
        { name: "Modules", icon: MdOutlinePlayLesson, path: "/modules" },
        { name: "Quizzes", icon: FaQuestionCircle, path: "/quiz" },
      ],
    },
    {
      section: "Settings",
      items: [{ name: "Setting", icon: TbSettings, path: "/settings" }],
    },
  ];

  return (
    <aside
      className={`${
        isProfileSection
          ? "w-95 bg-[#080808] px-20"
          : "w-75 border-r border-default bg-[#0D0D0D] px-5"
      } h-auto py-10`}
    >
      {isProfileSection ? (
        // ===== PROFILE SECTION =====
        <div className="w-full flex flex-col items-start gap-3">
          <Avatar profile={profile} size="2xl" />

          {!isEditing ? (
            <>
              <div className="flex flex-col">
                <h4 className="text-[24px]">
                  {profile.full_name || profile.username}
                </h4>

                <p className="text-gray-400 text-[15px]">
                  @{profile.username} - {profile.role}
                </p>

                <p className="text-sm">{profile.bio || "BIO HERE..."}</p>
              </div>

              <Button
                bcolor="outline"
                text="Edit Profile"
                className="w-full mt-4"
                onClick={handleEdit}
              />
            </>
          ) : (
            <>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full rounded border border-[#242424] bg-transparent p-2 text-sm"
                placeholder="Username"
              />

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full rounded border border-[#242424] bg-transparent p-2 text-sm"
                placeholder="Short bio"
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-2 w-full">
                <Button
                  bcolor="outline"
                  text="Cancel"
                  className="w-full"
                  onClick={handleCancel}
                />
                <Button
                  bcolor="primary"
                  text={saving ? "Saving..." : "Save"}
                  className="w-full"
                  onClick={handleSave}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        // ===== DASHBOARD NAV =====
        <>
          <div className="flex items-center gap-2">
            <NavLink to={`/profile/${profile.username}`}>
              <div className="flex items-center gap-2">
                <Avatar profile={profile} size="sm" />
                <p className="text-[13px]">{profile.username}</p>
              </div>
            </NavLink>
          </div>

          {navItems.map((section) => (
            <div key={section.section} className="mt-4">
              <p className="text-xs text-gray-400 uppercase mb-2">
                {section.section}
              </p>

              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink to={item.path}>
                      {({ isActive }) => (
                        <DashNavItem
                          icon={item.icon}
                          itemName={item.name}
                          className={
                            isActive
                              ? "bg-[#161616] rounded-[3px] font-semibold"
                              : ""
                          }
                        />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

export default DashSideBar;
