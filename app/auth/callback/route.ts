import { clientConfig, getAuthSession, getClientConfig, getRefreshTokenSession } from "@/lib/authv2";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import * as client from "openid-client";

export async function GET(request: NextRequest) {
  const authSession = await getAuthSession();
  const refreshTokenSession = await getRefreshTokenSession();
  const openIdClientConfig = await getClientConfig();
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host") || "localhost";
  const protocol = headerList.get("x-forwarded-proto") || "https";
  const currentUrl = new URL(
    `${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  const tokenSet = await client.authorizationCodeGrant(openIdClientConfig, currentUrl, {
    pkceCodeVerifier: authSession.code_verifier,
    expectedState: authSession.state
  });
  delete authSession.code_verifier;
  delete authSession.state;

  console.log("tokenSet", tokenSet);
  const { access_token, refresh_token, expires_in } = tokenSet;
  authSession.isLoggedIn = true;
  authSession.access_token = access_token;
  authSession.access_token_expires_at = Date.now() + expires_in! * 1000;
  refreshTokenSession.refresh_token = refresh_token;
  let claims = tokenSet.claims()!;
  console.log("claims", claims);
  const { sub, email } = claims;
  // store userinfo in session
  authSession.userInfo = {
    username: claims["cognito:username"] as string,
    email: email as string,
    groups: claims["cognito:groups"] as string[]
  };

  await authSession.save();
  await refreshTokenSession.save();
  return Response.redirect(clientConfig.post_login_route);
}