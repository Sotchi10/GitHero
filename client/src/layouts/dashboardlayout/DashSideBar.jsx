import { NavLink } from "react-router-dom";
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
import DashNavItem from "./../../features/dashboard/components/dashboard-ui/DashNavItem";

const DashSideBar = ({ activePath }) => {
  const { profile } = useAuth();
  const profilePath = profile?.username ? `/profile/${profile.username}` : "/dashboard";
  const isProfileSection =
    activePath === profilePath ||
    activePath.startsWith(`/settings`);

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

  const isPfp = "w-95 bg-[#080808] px-20";
  const isNav = "w-75 border-r border-default bg-[#0D0D0D] px-5";
  return (
    <aside className={`${isProfileSection ? isPfp : isNav} h-auto py-10`}>
      {isProfileSection ? (
        // ================= PROFILE SECTION =================
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-3 items-start">
            {/*Pfp pic*/}
            <div className="w-80 h-80 rounded-full bg-gray-400" />

            <div>
              <h4 className="text-[24px]">
                {profile?.username || "Username"}
              </h4>
              <p className="text-gray-300 text-[18px]">{profile?.role}</p>
            </div>
          </div>

          <hr className="border-gray-600 w-full my-4" />

          <p className="text-sm text-center">{profile?.bio || "BIO HERE..."}</p>

          <div className="mt-4">
            <Button bcolor="outline" text="Edit Profile" />
          </div>
        </div>
      ) : (
        // ================= DASHBOARD NAV =================
        <>
          <NavLink className="font-semibold" to={profilePath}>
            <DashNavItem
              itemName={profile?.username}
              className="w-1/2 cursor-pointer"
            />
          </NavLink>
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
                              ? "bg-[#161616] rounded-[10px] font-semibold"
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
