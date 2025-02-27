export const TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
import { jwtDecode } from "jwt-decode";
import { AuthorityName } from "../constants/enum/authorityNames";

interface Authority {
  authority: string;
}

interface MyJwtPayload {
  authorities?: Authority[];
  sub?: string;
}

export const setTokensToStorage = (
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean
) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAutoritiesFromToken = (): AuthorityName[] => {
  const token = getAccessToken();

  if (!token) {
    return [];
  }

  try {
    const decodedToken = jwtDecode(token) as MyJwtPayload;
    return decodedToken.authorities
      ? decodedToken.authorities.map(
          (auth) => AuthorityName[auth.authority as keyof typeof AuthorityName]
        )
      : [];
  } catch (error) {
    console.error("Token decoding error: ", error);
    return [];
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY)
  );
};

export const isAuthenticated = () => !!getAccessToken();
