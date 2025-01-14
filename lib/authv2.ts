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

export interface SessionData {
  isLoggedIn: boolean;
  access_token?: string;
  access_token_expires_at?: number;
  refresh_token?: string;
  code_verifier?: string;
  state?: string;
  userInfo?: {
    email: string
    username: string
    groups: string[]
  };
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  access_token: undefined,
  access_token_expires_at: undefined,
  refresh_token: undefined,
  code_verifier: undefined,
  state: undefined,
  userInfo: undefined
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production"
  },
  ttl: 60 * 60 * 24 * 365 // 1 year
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookiesList = await cookies();
  let session = await getIronSession<SessionData>(cookiesList, sessionOptions);
  if (!session.isLoggedIn) {
    session.access_token = defaultSession.access_token;
    session.userInfo = defaultSession.userInfo;
  } else {
    await checkAndRefreshToken(session);
  }
  return session;
}

export async function checkAndRefreshToken(session: IronSession<SessionData>) {
  if (!session.access_token || !session.access_token_expires_at) return;

  const currentTime = Date.now();
  const expirationTime = session.access_token_expires_at;

  // Refresh the token if it is about to expire in the next minute
  if (expirationTime - currentTime < 60 * 1000) {
    console.log("Refreshing token");
    await refreshAccessToken(session);
  }
}

export async function refreshAccessToken(session: IronSession<SessionData>) {
  const openIdClientConfig = await getClientConfig();
  const tokenSet = await client.refreshTokenGrant(openIdClientConfig, session.refresh_token!);
  session.access_token = tokenSet.access_token;
  session.refresh_token = tokenSet.refresh_token;
  session.access_token_expires_at = Date.now() + tokenSet.expires_in! * 1000;
  await session.save();
  return tokenSet;
}

export async function getClientConfig() {
  return await client.discovery(new URL(clientConfig.url!), clientConfig.client_id!);
}
