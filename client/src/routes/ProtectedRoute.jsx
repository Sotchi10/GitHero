import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const ProtectedRoute = () => {
  const { authUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;