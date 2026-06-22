import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getPfpByUserId } from "../api/apiProfile.js";

const AuthContext = createContext();

const normalizeAuthUser = (userData) => userData?.user || userData;

const getAuthUserId = (userData) => userData?.userId || userData?.user_id;

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyProfile = useCallback((profileData) => {
    setProfile(profileData);

    setAuthUser((currentUser) => {
      if (!currentUser || !profileData) return currentUser;

      const nextUser = {
        ...currentUser,
        userId: profileData.user_id || currentUser.userId,
        email: profileData.email || currentUser.email,
        username: profileData.username,
        role: profileData.role,
      };

      localStorage.setItem("authUser", JSON.stringify(nextUser));
      return nextUser;
    });
  }, []);

  const loadProfile = useCallback(async (userData) => {
    const userId = getAuthUserId(userData);

    if (!userId) {
      throw new Error("Missing authenticated user ID");
    }

    const res = await getPfpByUserId(userId);
    applyProfile(res.data);
    return res.data;
  }, [applyProfile]);

  // Restore session
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const user = localStorage.getItem("authUser");

        if (user) {
          const parsedUser = normalizeAuthUser(JSON.parse(user));

          setAuthUser(parsedUser);

          await loadProfile(parsedUser);
        }
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
      console.error("Failed to fetch profile:", err);
      setError(err.response?.data?.message || err.message);
      setAuthUser(null);
      setProfile(null);
      localStorage.removeItem("authUser");
      throw err;
    }
  };

  const updateUser = (profileData) => {
    applyProfile(profileData);
  };

  // Logout
  const logout = () => {
    setAuthUser(null);
    setProfile(null);
    setError(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        profile,
        login,
        logout,
        updateUser,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
