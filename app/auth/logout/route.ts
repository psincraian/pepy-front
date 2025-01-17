import {
  clientConfig,
  defaultAuthSession,
  getAuthSession,
  getClientConfig,
  getRefreshTokenSession
} from "@/lib/authv2";
import { defaultRefreshTokenSession } from "@/lib/authv2";
import * as client from "openid-client";

export async function GET() {
  const authSession = await getAuthSession();
  const refreshTokenSession = await getRefreshTokenSession();
  const openIdClientConfig = await getClientConfig();
  const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
    logout_uri: clientConfig.post_logout_redirect_uri
  });
  authSession.isLoggedIn = defaultAuthSession.isLoggedIn;
  authSession.access_token = defaultAuthSession.access_token;
  refreshTokenSession.refresh_token = defaultRefreshTokenSession.refresh_token;
  authSession.sub = defaultAuthSession.sub;
  authSession.access_token_expires_at = defaultAuthSession.access_token_expires_at;
  authSession.userInfo = defaultAuthSession.userInfo;
  authSession.code_verifier = defaultAuthSession.code_verifier;
  authSession.state = defaultAuthSession.state;
  await authSession.save();
  await refreshTokenSession.save();
  return Response.redirect(endSessionUrl.href);
}