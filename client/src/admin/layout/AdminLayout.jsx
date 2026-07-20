import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#080808]">
      <button type="button" onClick={() => setIsSidebarOpen(true)} className="fixed left-4 top-4 z-10 rounded-lg border border-default p-2 lg:hidden" aria-label="Open admin navigation"><FiMenu /></button>
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && <button type="button" className="fixed inset-0 z-10 bg-black/50 lg:hidden" aria-label="Close admin navigation" onClick={() => setIsSidebarOpen(false)} />}
      <main className="min-h-screen px-4 py-16 sm:px-6 lg:ml-72 lg:px-12 lg:py-15 xl:px-20"><Outlet /></main>
    </div>
  );
};

export default AdminLayout;
