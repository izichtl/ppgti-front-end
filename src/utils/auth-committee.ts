import { jwtDecode } from 'jwt-decode';

interface CommitteeTokenPayload {
  id: string;
  matricula: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export const getCommitteeToken = (): string | null => {
  return localStorage.getItem('userJWT');
};

export const setCommitteeToken = (token: string): void => {
  localStorage.setItem('userJWT', token);
};

export const removeCommitteeToken = (): void => {
  localStorage.removeItem('userJWT');
};

export const isCommitteeAuthenticated = (): boolean => {
  const token = getCommitteeToken();

  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode<CommitteeTokenPayload>(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    if (decoded.exp < currentTime) {
      removeCommitteeToken();
      return false;
    }

    return true;
  } catch (error) {
    // Invalid token
    removeCommitteeToken();
    return false;
  }
};

export const getCommitteeUserInfo = (): CommitteeTokenPayload | null => {
  const token = getCommitteeToken();

  if (!token || !isCommitteeAuthenticated()) {
    return null;
  }

  try {
    return jwtDecode<CommitteeTokenPayload>(token);
  } catch (error) {
    return null;
  }
};

export const formatTokenForRequest = (token: string): string => {
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};
