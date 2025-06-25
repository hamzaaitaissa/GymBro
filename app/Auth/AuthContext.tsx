/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

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

const isTokenExpired = (token: string): boolean => {
  try {
    const decode: { exp?: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return !decode.exp || decode.exp < currentTime;
  } catch (error) {
    console.log("Invalid token", error);
    return true; // Assume expired if decoding fails
  }
};

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

        if (storedToken) {
          if (isTokenExpired(storedToken)) {
            console.log("token expired");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setConnectedUser(null);
            setIsAuthenticated(false);
          } else {
            setToken(storedToken);
            setConnectedUser(storedUser);
            setIsAuthenticated(true);
          }
        }else{
          console.log("No stored token")
        }

        
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

  //auto check
  useEffect(() => {
    if(!isAuthenticated || !token) return;
    console.log("token check..")
    //checkin every 60 sec
    setTimeout(() => {
      if(isTokenExpired(token)){
        console.log("token expired")
        logout()
      }
    }, 60*1000);

  }, [token, isAuthenticated]);

  const login = (userToken: string) => {
    setLoading(true);
    setError(null);
try {
      if (isTokenExpired(userToken)) {
        throw new Error('Cannot login with expired token');
      }

      console.log("Logging in with valid token");
      localStorage.setItem("token", userToken);
      setToken(userToken);
      setIsAuthenticated(true);
      
      const userItem = localStorage.getItem("user");
      const storedUser = userItem ? JSON.parse(userItem) : null;
      setConnectedUser(storedUser);
    } catch (error) {
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

  // const updateConnectedUser = (user: object | null) => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   }
  //   setConnectedUser(user);
  // }

  const authContextValue = useMemo(
    () => ({
      token,
      isAuthenticated,
      login,
      logout,
      // updateConnectedUser,
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
