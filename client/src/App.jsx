import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import DashboardHome from "./features/dashboard/pages/DashboardHome";
import Layout from "./layouts/DashboardLayout";
import Repository from "./features/repository/pages/Repository";
import Reference from "./features/reference/pages/Reference";
import Codespaces from "./features/codespace/pages/Codespaces";
import Community from "./features/community/pages/Community";
import Module from "./features/modules/pages/Module";
import Setting from "./features/setting/pages/Setting";
import Profile from "./features/profile/pages/Profile";
import Quiz from "./features/quiz/pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard layout wrapper */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/references" element={<Reference />} />
          <Route path="/codespaces" element={<Codespaces />} />
          <Route path="/community" element={<Community />} />
          <Route path="/modules" element={<Module />} />
          <Route path="/quizes" element={<Quiz />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
