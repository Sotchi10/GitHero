import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import Repository from "./features/repository/pages/Repository";
import Reference from "./features/reference/pages/Reference";
import Codespaces from "./features/codespace/pages/Codespaces";
import Community from "./features/community/pages/Community";
import Module from "./features/modules/pages/Module";
import QuizzesPage from "./features/quiz/pages/QuizzesPage.jsx";
import Setting from "./features/setting/pages/Setting";
import Profile from "./features/profile/pages/Profile";
import Quiz from "./features/quiz/pages/QuizzesPage.jsx";
import Article from "./features/articles/pages/Article";
import Developers from "./features/developers/pages/Developers";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import CommunityPost from './features/community/pages/CommunityPost';
import RepositoryDetail from "./features/repository/pages/RepositoryDetail";

function App() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/repository/:username/:reponame" element={<RepositoryDetail />} />
            <Route path="/references" element={<Reference />} />
            <Route path="/codespaces" element={<Codespaces />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/posts" element={<CommunityPost />} />
            <Route path="/:username/post/:id" element={<Article />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/modules" element={<Module />} />
            <Route path="/quiz" element={<QuizzesPage />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
