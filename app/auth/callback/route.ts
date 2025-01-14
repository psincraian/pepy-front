import { clientConfig, getClientConfig, getSession } from "@/lib/authv2";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import * as client from "openid-client";

export async function GET(request: NextRequest) {
  const session = await getSession();
  const openIdClientConfig = await getClientConfig();
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host") || "localhost";
  const protocol = headerList.get("x-forwarded-proto") || "https";
  const currentUrl = new URL(
    `${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  const tokenSet = await client.authorizationCodeGrant(openIdClientConfig, currentUrl, {
    pkceCodeVerifier: session.code_verifier,
    expectedState: session.state
  });
  delete session.code_verifier;
  delete session.state;

  console.log("tokenSet", tokenSet);
  const { access_token, refresh_token, expires_in } = tokenSet;
  session.isLoggedIn = true;
  session.access_token = access_token;
  session.refresh_token = refresh_token;
  session.access_token_expires_at = Date.now() + expires_in! * 1000;
  let claims = tokenSet.claims()!;
  console.log("claims", claims);
  const { sub, email } = claims;
  // store userinfo in session
  session.userInfo = {
    username: claims["cognito:username"] as string,
    email: email as string,
    groups: claims["cognito:groups"] as string[]
  };

  await session.save();
  return Response.redirect(clientConfig.post_login_route);
}
