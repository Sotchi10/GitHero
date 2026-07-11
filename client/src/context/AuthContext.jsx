import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPfpByUserId, updateCurrentProfile } from "../api/apiProfile.js";

const AuthContext = createContext();

// Normalize user shape to always use user_id
const normalizeAuthUser = (userData) => {
  const user = userData?.user || userData;

  return {
    user_id: user.user_id || user.userId,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyProfile = useCallback((profileData) => {
    if (!profileData) return;

    setProfile(profileData);

    const updatedUser = {
      user_id: profileData.user_id,
      username: profileData.username,
      email: profileData.email,
      role: profileData.role,
    };

    setAuthUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  }, []);

  const loadProfile = useCallback(
    async (userData) => {
      const userId = userData?.user_id;

      if (!userId) throw new Error("Missing authenticated user ID");

      const res = await getPfpByUserId(userId);
      applyProfile(res.data);
      return res.data;
    },
    [applyProfile],
  );

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = localStorage.getItem("authUser");

        if (!storedUser) {
          setLoading(false);
          return;
        }

        const parsedUser = normalizeAuthUser(JSON.parse(storedUser));
        setAuthUser(parsedUser);

        await loadProfile(parsedUser);
      } catch (err) {
        console.error("Failed to restore session:", err);

        setError(err.response?.data?.message || err.message);
        setAuthUser(null);
        setProfile(null);

        localStorage.removeItem("authUser");
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [loadProfile]);

  const login = async (userData) => {
    try {
      setError(null);

      const normalizedUser = normalizeAuthUser(userData);

      setAuthUser(normalizedUser);
      localStorage.setItem("authUser", JSON.stringify(normalizedUser));

      await loadProfile(normalizedUser);
    } catch (err) {
      console.error("Login failed:", err);

      setError(err.response?.data?.message || err.message);
      setAuthUser(null);
      setProfile(null);

      localStorage.removeItem("authUser");

      throw err;
    }
  };

  const logout = () => {
    setAuthUser(null);
    setProfile(null);
    setError(null);

    localStorage.removeItem("authUser");
  };

  const updateProfile = async (data) => {
    try {
      if (!profile?.user_id) throw new Error("Profile not loaded");

      const res = await updateCurrentProfile(profile.user_id, data);
      const updatedProfile = res?.data?.profile || res?.data || res;

      if (!updatedProfile) {
        throw new Error("Invalid profile response from server");
      }

      applyProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error("updateProfile error:", err);
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        profile,
        login,
        logout,
        updateProfile,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
