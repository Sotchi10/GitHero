import { NavLink } from "react-router-dom";
import { FiSearch, FiUsers } from "react-icons/fi";
import {
  MdDashboard,
  MdLibraryBooks,
  MdOutlinePlayLesson,
} from "react-icons/md";
import ThemeToggle from "../../components/ui/ThemeToggle";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: MdDashboard },
  { label: "Modules", path: "/admin/modules", icon: MdLibraryBooks },
  { label: "Lessons", path: "/admin/lessons", icon: MdOutlinePlayLesson },
  { label: "Users", path: "/admin/users", icon: FiUsers },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-75 flex-col justify-between border-r border-default bg-[#0D0D0D] px-8 py-20">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-normal">GitHero Admin</h1>
          <p className="mt-1 text-sm leading-6 text-gray-400">LMS management</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#161616] text-white"
                      : "text-gray-400 hover:bg-[#161616] hover:text-white"
                  }`
                }
              >
                <Icon className="text-lg" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-default pt-5">
        <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
          <span>Theme</span>
          <ThemeToggle />
        </div>
        <p className="text-xs uppercase text-gray-500">Signed in as</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-btn-primary font-semibold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold leading-5">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
