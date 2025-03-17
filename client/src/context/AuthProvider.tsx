import { createContext, useState } from "react";

import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  auth: {
    username: string;
    roles: number[];
    accessToken: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      username: string;
      roles: number[];
      accessToken: string;
    }>
  >;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{
    username: string;
    roles: number[];
    accessToken: string;
  }>({ username: "", roles: [], accessToken: "" });
  const [persist, setPersist] = useState<boolean>(
    localStorage.getItem("persist") === "true"
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
