import { jwtDecode } from "jwt-decode";
import {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
interface IAuthContext {
  accessToken: string;
  setAccessToken: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getToken: () => string | null;
  getUserFromToken: () => Record<string, any> | null;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContext");
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren<{}>> = ({
  children,
}): ReactElement => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem("userJWT") || ""
  );

  const login = useCallback((token: string): void => {
    console.log("Login token:", token);
    setAccessToken(token);
    localStorage.setItem("userJWT", token);
  }, []);

  const logout = useCallback((): void => {
    setAccessToken("");
    localStorage.removeItem("userJWT");
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem("userJWT");
  }, []);

  const isAuthenticated = (): boolean => {
    const location = useLocation();
    const token = localStorage.getItem("userJWT");

    // Retorna false se estiver na página de login
    if (location.pathname === "/login") return false;

    // Retorna false para todas as rotas da comissão (elas têm seu próprio sistema de layout)
    if (location.pathname.startsWith("/comissao")) return false;

    return Boolean(token && token.trim() !== "");
  };

  const getUserFromToken = (): Record<string, any> | null => {
    const token = getToken();
    const decoded = jwtDecode(token.replace("Bearer ", ""));
    return decoded;
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        logout,
        getToken,
        isAuthenticated,
        getUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
