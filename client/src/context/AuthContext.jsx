import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getPfpByUserId, updateCurrentProfile } from "../api/apiProfile.js";

const AuthContext = createContext();

const normalizeAuthUser = (userData) => userData?.user || userData;
const getAuthUserId = (userData) => userData?.userId || userData?.user_id;

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply profile
  const applyProfile = useCallback((profileData) => {
    if (!profileData) return;

    setProfile(profileData);

    setAuthUser((currentUser) => {
      if (!currentUser) {
        const fallbackUser = {
          userId: profileData.user_id,
          username: profileData.username,
          email: profileData.email,
          role: profileData.role,
        };

        localStorage.setItem("authUser", JSON.stringify(fallbackUser));
        return fallbackUser;
      }

      const nextUser = {
        ...currentUser,
        userId: profileData.user_id,
        email: profileData.email,
        username: profileData.username,
        role: profileData.role,
      };

      localStorage.setItem("authUser", JSON.stringify(nextUser));
      return nextUser;
    });
  }, []);

  // Load profile
  const loadProfile = useCallback(
    async (userData) => {
      const userId = getAuthUserId(userData);

      if (!userId) throw new Error("Missing authenticated user ID");

      const res = await getPfpByUserId(userId);
      applyProfile(res.data);
      return res.data;
    },
    [applyProfile],
  );

  // Restore session
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = localStorage.getItem("authUser");

        if (!stored) {
          setLoading(false);
          return;
        }

        const parsedUser = normalizeAuthUser(JSON.parse(stored));
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

  // Login
  const login = async (userData) => {
    const normalizedUser = normalizeAuthUser(userData);

    try {
      setError(null);
      setAuthUser(normalizedUser);
      localStorage.setItem("authUser", JSON.stringify(normalizedUser));

      await loadProfile(normalizedUser);
    } catch (err) {
      console.error("Login profile fetch failed:", err);
      setError(err.response?.data?.message || err.message);
      setAuthUser(null);
      setProfile(null);
      localStorage.removeItem("authUser");
      throw err;
    }
  };

  // Logout
  const logout = () => {
    setAuthUser(null);
    setProfile(null);
    setError(null);
    localStorage.removeItem("authUser");
  };

  //  updateProfile
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
