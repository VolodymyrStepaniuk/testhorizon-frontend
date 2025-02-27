import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, clearTokens } from "../utils/auth.utils";
import { API } from "../services/api.service";
import { UserResponse } from "../models/user/UserResponse";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
  logout: () => void;
  user: UserResponse | null;
  fetchUser: () => Promise<void>;
  isUserLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const fetchUser = async () => {
    setIsUserLoading(true);
    try {
      const { data } = await API.users.getMe();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchUser();
    }
  }, [isAuth]);

  const logout = () => {
    clearTokens();
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        logout,
        user,
        fetchUser,
        isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
