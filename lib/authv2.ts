import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import * as client from "openid-client";

export const clientConfig = {
  url: process.env.NEXT_PUBLIC_API_URL,
  audience: process.env.NEXT_PUBLIC_API_URL,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  scope: process.env.NEXT_PUBLIC_SCOPE,
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
  post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}`,
  response_type: "code",
  grant_type: "authorization_code",
  post_login_route: `${process.env.NEXT_PUBLIC_APP_URL}`,
  code_challenge_method: "S256"
};

export interface AuthSessionData {
  isLoggedIn: boolean;
  access_token?: string;
  access_token_expires_at?: number;
  code_verifier?: string;
  state?: string;
  userInfo?: {
    email: string;
    username: string;
    groups: string[];
  };
}

export const defaultAuthSession: AuthSessionData = {
  isLoggedIn: false,
  access_token: undefined,
  access_token_expires_at: undefined,
  code_verifier: undefined,
  state: undefined,
  userInfo: undefined
};

export interface RefreshTokenSessionData {
  refresh_token?: string;
}

export const defaultRefreshTokenSession: RefreshTokenSessionData = {
  refresh_token: undefined
};

export const authSessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 1 year
};

export const refreshTokenSessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "refresh_token_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 30 days
};

export async function getAuthSession(): Promise<IronSession<AuthSessionData>> {
  const cookiesList = await cookies();
  let session = await getIronSession<SessionData>(cookiesList, authSessionOptions);
  if (!session.isLoggedIn) {
    session.access_token = defaultAuthSession.access_token;
    session.userInfo = defaultAuthSession.userInfo;
  } else {
    await checkAndRefreshToken(session);
  }
  return session;
}

export async function getRefreshTokenSession(): Promise<IronSession<RefreshTokenSessionData>> {
  const cookiesList = await cookies();
  return await getIronSession<AuthSessionData>(cookiesList, refreshTokenSessionOptions);
}

export async function checkAndRefreshToken(session: IronSession<AuthSessionData>) {
  if (!session.access_token || !session.access_token_expires_at) return;

  const currentTime = Date.now();
  const expirationTime = session.access_token_expires_at;

  // Refresh the token if it is about to expire in the next minute
  if (expirationTime - currentTime < 60 * 1000) {
    console.log("Refreshing token");
    await refreshAccessToken(session);
  }
}

export async function refreshAccessToken(authSession: IronSession<AuthSessionData>) {
  const refreshTokenSession = await getRefreshTokenSession();
  const openIdClientConfig = await getClientConfig();

  if (!refreshTokenSession.refresh_token) {
    throw new Error("No refresh token available");
  }

  const tokenSet = await client.refreshTokenGrant(openIdClientConfig, refreshTokenSession.refresh_token);

  const { access_token, refresh_token, expires_in } = tokenSet;
  authSession.access_token = access_token;
  authSession.access_token_expires_at = Date.now() + expires_in! * 1000;
  refreshTokenSession.refresh_token = refresh_token;

  await authSession.save();
  await refreshTokenSession.save();
}

export async function getClientConfig() {
  return await client.discovery(new URL(clientConfig.url!), clientConfig.client_id!);
}
