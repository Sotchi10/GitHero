import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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

const DashSideBar = ({ activeUser, activePath, setActivePath }) => {
  const DashNavItems = [
    {
      section: "Workspace",
      items: [
        { id: 1, itemName: "Dashboard", icon: RxDashboard, path: "/dashboard" },
        {
          id: 2,
          itemName: "Repository",
          icon: PiGitBranch,
          path: "/repository",
        },
        {
          id: 3,
          itemName: "Codespaces",
          icon: FaLaptopCode,
          path: "/codespaces",
        },
      ],
    },
    {
      section: "Resources",
      items: [
        {
          id: 4,
          itemName: "Quick References",
          icon: RiTodoLine,
          path: "/references",
        },
        {
          id: 5,
          itemName: "Community",
          icon: TbBuildingCommunity,
          path: "/community",
        },
        {
          id: 6,
          itemName: "Modules",
          icon: MdOutlinePlayLesson,
          path: "/modules",
        },
        { id: 7, itemName: "Quizes", icon: FaQuestionCircle, path: "/quizes" },
      ],
    },
    {
      section: "Settings",
      items: [
        { id: 8, itemName: "Setting", icon: TbSettings, path: "/setting" },
      ],
    },
  ];

  return (
    <aside className="left-0 w-75 px-5 bg-[#0D0D0D] flex flex-col border-r border-default py-10">
      {/* User */}
      <NavLink to="/profile" onClick={() => setActivePath("/profile")}>
        <DashNavItem itemName={activeUser} className="w-1/2 cursor-pointer" />
      </NavLink>

      {/* Nav */}
      {DashNavItems.map((section) => (
        <div key={section.section} className="mt-4">
          <p className="text-xs text-gray-300 uppercase mb-2">
            {section.section}
          </p>

          <ul className="flex flex-col gap-1">
            {section.items.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={() => setActivePath(item.path)}
                >
                  <DashNavItem
                    icon={item.icon}
                    itemName={item.itemName}
                    className={
                      activePath === item.path
                        ? "bg-[#161616] rounded-[10px] font-semibold"
                        : ""
                    }
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Bottom */}
      <div className="mt-auto pt-4 border-default">
        <DashNavItem icon={PiSignOut} itemName="Signout" />
      </div>
    </aside>
  );
};
export default DashSideBar;
