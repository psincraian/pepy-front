import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import * as client from "openid-client";

export const clientConfig = {
  url: process.env.COGNITO_URL,
  audience: process.env.COGNITO_URL,
  client_id: process.env.COGNITO_CLIENT_ID,
  scope: "email openid phone",
  redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
  post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}`,
  response_type: "code",
  grant_type: "authorization_code",
  post_login_route: `${process.env.NEXT_PUBLIC_APP_URL}`,
  code_challenge_method: "S256"
};

export interface AuthSessionData {
  isLoggedIn: boolean;
  sub?: string;
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

export interface PublicAuthSessionData {
  isLoggedIn: boolean;
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
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 1 year
};

export const refreshTokenSessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "refresh_token_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 30 days
};

export async function getAuthSession(): Promise<IronSession<AuthSessionData>> {
  const cookiesList = await cookies();
  let session = await getIronSession<AuthSessionData>(cookiesList, authSessionOptions);
  if (!session.isLoggedIn) {
    session.access_token = defaultAuthSession.access_token;
    session.userInfo = defaultAuthSession.userInfo;
  }

  return session;
}

export async function getRefreshTokenSession(): Promise<IronSession<RefreshTokenSessionData>> {
  const cookiesList = await cookies();
  return await getIronSession<AuthSessionData>(cookiesList, refreshTokenSessionOptions);
}


export async function getClientConfig() {
  return await client.discovery(new URL(clientConfig.url!), clientConfig.client_id!);
}
