import { getAuthSession } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";
import { getClientConfig } from "@/lib/authv2";
import { getRefreshTokenSession } from "@/lib/authv2";
import * as client from "openid-client";

export async function POST() {
  const authSession = await getAuthSession();
  const refreshTokenSession = await getRefreshTokenSession();
  if (!authSession.isLoggedIn) {
    return Response.json({ isLoggedIn: false } as PublicAuthSessionData);
  }

  const clientConfig = await getClientConfig();
  const tokenSet = await client.refreshTokenGrant(clientConfig, refreshTokenSession.refresh_token!);
  const { access_token, expires_in } = tokenSet;
  authSession.isLoggedIn = true;
  authSession.access_token = access_token;
  authSession.access_token_expires_at = Date.now() + expires_in! * 1000;
  let claims = tokenSet.claims()!;
  console.log("claims", claims);
  const { sub, email } = claims;
  authSession.sub = sub;
  // store userinfo in session
  authSession.userInfo = {
    username: claims["cognito:username"] as string,
    email: email as string,
    groups: claims["cognito:groups"] as string[]
  };

  await authSession.save();
  return Response.json({
    isLoggedIn: authSession.isLoggedIn,
    userInfo: authSession.userInfo
  } as PublicAuthSessionData);
}