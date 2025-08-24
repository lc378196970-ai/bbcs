import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  cdkVerified: false,
  setIsAuthenticated: (value: boolean) => {},
  setIsAdmin: (value: boolean) => {},
  setCdkVerified: (value: boolean) => {},
  logout: () => {},
});