/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  connectedUser?: object | null;
  isInitialized?: boolean;
  login: (userToken: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  connectedUser: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [connectedUser, setConnectedUser] = useState<object | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        const storedToken = localStorage.getItem("token");
        const userItem = localStorage.getItem("user");
        const storedUser = userItem ? JSON.parse(userItem) : null;

        console.log("Stored token:", !!storedToken);
        console.log("Stored user:", storedUser);

        setToken(storedToken);
        setConnectedUser(storedUser);
        console.log("connectedUser:", storedUser);
        setIsAuthenticated(!!storedToken);

        console.log("Auth initialized - authenticated:", !!storedToken);
      } catch (error) {
        setError(error);
        console.error("Error during initialization:", error);
      } finally {
        setLoading(false);
        setIsInitialized(true);
        console.log("Auth initialization complete");
      }
    };

    initializeAuth();
  }, []);
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (userToken: string) => {
    setLoading(true);
    setError(null);
    try {
      localStorage.setItem("token", userToken);
      setToken(userToken);
      setIsAuthenticated(true);
      const userItem = localStorage.getItem("user");
      const storedUser = userItem ? JSON.parse(userItem) : null;
      setConnectedUser(storedUser);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    setError(null);
    try {
      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      setConnectedUser(null);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const authContextValue = useMemo(
    () => ({
      token,
      isAuthenticated,
      login,
      logout,
      isLoading,
      connectedUser,
      isInitialized,
      error,
    }),
    [token, isAuthenticated, isLoading, connectedUser, error, isInitialized]
  );
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
