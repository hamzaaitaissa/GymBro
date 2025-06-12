/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; 
import React, { useContext, useEffect, useMemo, useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (userToken:string) => {
    setLoading(true);
    setError("");
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
