import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#080808]">
      <AdminSidebar />
​​​​​​
      <main className="ml-72 min-h-screen px-20 py-15">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
