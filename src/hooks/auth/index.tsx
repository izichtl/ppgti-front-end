import {
  createContext,
  FC,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
  useCallback,
} from 'react';

interface IAuthContext {
  accessToken: string;
  setAccessToken: (token: string) => void;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }
  return context;
};

export const AuthProvider: FC<PropsWithChildren<{}>> = ({
  children,
}): ReactElement => {
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem('userJWT') || ''
  );

  const login = useCallback((token: string): void => {
    setAccessToken(token);
    localStorage.setItem('userJWT', token);
  }, []);

  const logout = useCallback((): void => {
    setAccessToken('');
    localStorage.removeItem('userJWT');
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem('userJWT');
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, login, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
