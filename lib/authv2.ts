import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import * as client from "openid-client";

console.log("Public APP URL: ", process.env.NEXT_PUBLIC_APP_URL);
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
  access_token_expires_at: undefined,
  code_verifier: undefined,
  state: undefined,
  userInfo: undefined
};

export const authSessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 365 days
};

export const refreshTokenSessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "refresh_token_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 365 days
};

export async function getUserSession(): Promise<IronSession<AuthSessionData>> {
  const cookiesList = await cookies();
  let session = await getIronSession<AuthSessionData>(cookiesList, authSessionOptions);
  if (!session.isLoggedIn) {
    session.access_token_expires_at = defaultAuthSession.access_token_expires_at;
    session.userInfo = defaultAuthSession.userInfo;
  }

  return session;
}

export interface RefreshAuthSessionResponse {
  authSession: IronSession<AuthSessionData>;
  accessToken: string;
  expiresIn: number;
}

export async function refreshAuthSession(refreshToken: string): Promise<RefreshAuthSessionResponse> {
  const authSession = await getUserSession();
  const clientConfig = await getClientConfig();
  const tokenSet = await client.refreshTokenGrant(clientConfig, refreshToken!);
  const { access_token, expires_in } = tokenSet;
  authSession.isLoggedIn = true;
  authSession.access_token_expires_at = Date.now() + expires_in! * 1000;
  let claims = tokenSet.claims()!;
  const { sub, email } = claims;
  authSession.sub = sub;
  // store userinfo in session
  authSession.userInfo = {
    username: claims["cognito:username"] as string,
    email: email as string,
    groups: claims["cognito:groups"] as string[]
  };

  return { authSession, accessToken: access_token, expiresIn: expires_in } as RefreshAuthSessionResponse;
}

export async function getClientConfig() {
  return await client.discovery(new URL(clientConfig.url!), clientConfig.client_id!);
}
