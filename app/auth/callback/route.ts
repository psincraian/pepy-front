import { clientConfig, getClientConfig, getUserSession } from "@/lib/authv2";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import * as client from "openid-client";

export async function GET(request: NextRequest) {
  const userSession = await getUserSession();
  const openIdClientConfig = await getClientConfig();
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host") || "localhost";
  const protocol = headerList.get("x-forwarded-proto") || "https";
  const currentUrl = new URL(
    `${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  const tokenSet = await client.authorizationCodeGrant(openIdClientConfig, currentUrl, {
    pkceCodeVerifier: userSession.code_verifier,
    expectedState: userSession.state
  });
  delete userSession.code_verifier;
  delete userSession.state;

  const { access_token, refresh_token, expires_in } = tokenSet;
  userSession.isLoggedIn = true;
  let claims = tokenSet.claims()!;
  const { sub, email } = claims;
  userSession.sub = sub;
  userSession.accessTokenExpiresAt = Date.now() + expires_in! * 1000;
  // store userinfo in session
  userSession.userInfo = {
    username: claims["cognito:username"] as string,
    email: email as string,
    groups: claims["cognito:groups"] as string[]
  };

  await userSession.save();
  var cookieSet = await cookies();
  cookieSet.set("access_token", access_token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: expires_in!
  });
  cookieSet.set("refresh_token", refresh_token!, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 365 * 24 * 60 * 60,
    path: "/auth/refresh-session"
  });
  return Response.redirect(clientConfig.post_login_route);
}