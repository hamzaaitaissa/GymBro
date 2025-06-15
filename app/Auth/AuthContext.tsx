/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; 
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: unknown;
  connectedUser?: string | null;
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
    const [connectedUser, setConnectedUser] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      setConnectedUser(storedUser);
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setIsInitialized(true)
    }
  }, []);
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (userToken:string) => {
    setLoading(true);
    setError(null);
    try {
      localStorage.setItem("token", userToken);
      setToken(userToken);
    } catch (error) {
        setLoading(false)
        setError(error)
    }finally{
        setLoading(false)
    }
  };

  const logout = ()=>{
    setLoading(true)
    setError(null)
    try {
        localStorage.removeItem("token")
        setToken(null)
    } catch (error) {
        setLoading(false)
        setError(error)
    }finally{
        setLoading(false)
    }
  }

  const authContextValue = useMemo(()=>({
    token,
    isAuthenticated,
    login,
    logout,
    isLoading,
    connectedUser,
    error,
  }),[token, isAuthenticated, isLoading, error])
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider
