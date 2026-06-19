import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import DashNavItem from "../../features/dashboard/components/dashboard-ui/DashNavItem";

import { RxDashboard } from "react-icons/rx";
import { PiGitBranch } from "react-icons/pi";
import { FaLaptopCode } from "react-icons/fa6";
import { RiTodoLine } from "react-icons/ri";
import { TbBuildingCommunity } from "react-icons/tb";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import { PiSignOut } from "react-icons/pi";
import Button from "../../components/ui/Button";

const DashSideBar = ({ activeUser, activePath }) => {
  const isProfileSection =
    activePath.startsWith("/profile") || activePath.startsWith("/settings");

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
        { name: "Quizzes", icon: FaQuestionCircle, path: "/quizzes" },
      ],
    },
    {
      section: "Settings",
      items: [{ name: "Setting", icon: TbSettings, path: "/settings" }],
    },
  ];

  return (
    <aside className="w-75 px-5 bg-[#0D0D0D] flex flex-col border-r border-default py-10">
      {isProfileSection ? (
        // ================= PROFILE SECTION =================
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-3 items-center">
            <div className="w-60 h-60 rounded-full bg-gray-400" />

            <div className="text-center">
              <h4 className="text-[20px]">{activeUser || "Username"}</h4>
              <p className="text-gray-300 text-[14px]">he/him</p>
            </div>
          </div>

          <hr className="border-gray-600 w-full my-4" />

          <p className="text-sm text-center">BIO HERE...</p>

          <div className="mt-4">
            <Button bcolor="outline" text="Edit Profile" />
          </div>
        </div>
      ) : (
        // ================= DASHBOARD NAV =================
        <>
          <NavLink to="/profile">
            <DashNavItem
              itemName={activeUser}
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
