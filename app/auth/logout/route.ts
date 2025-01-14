import { clientConfig, defaultSession, getClientConfig, getSession } from "@/lib/authv2";
import * as client from "openid-client";

export async function GET() {
  const session = await getSession();
  const openIdClientConfig = await getClientConfig();
  const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
    logout_uri: clientConfig.post_logout_redirect_uri
  });
  session.isLoggedIn = defaultSession.isLoggedIn;
  session.access_token = defaultSession.access_token;
  session.refresh_token = defaultSession.refresh_token;
  session.access_token_expires_at = defaultSession.access_token_expires_at;
  session.userInfo = defaultSession.userInfo;
  session.code_verifier = defaultSession.code_verifier;
  session.state = defaultSession.state;
  await session.save();
  return Response.redirect(endSessionUrl.href);
}
