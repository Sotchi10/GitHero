import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminRoute = () => {
  const { authUser, loading } = useAuth();
  const role = (authUser?.role || "").toLowerCase();

  if (loading) return <div>Loading...</div>;

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
