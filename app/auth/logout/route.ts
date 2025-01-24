import { clientConfig, defaultAuthSession, getClientConfig, getUserSession } from "@/lib/authv2";
import * as client from "openid-client";
import { cookies } from "next/headers";

export async function GET() {
  const userSession = await getUserSession();
  const openIdClientConfig = await getClientConfig();
  const endSessionUrl = client.buildEndSessionUrl(openIdClientConfig, {
    logout_uri: clientConfig.post_logout_redirect_uri
  });
  userSession.isLoggedIn = defaultAuthSession.isLoggedIn;
  userSession.sub = defaultAuthSession.sub;
  userSession.accessTokenExpiresAt = defaultAuthSession.accessTokenExpiresAt;
  userSession.userInfo = defaultAuthSession.userInfo;
  userSession.code_verifier = defaultAuthSession.code_verifier;
  userSession.state = defaultAuthSession.state;
  await userSession.save();
  const cookiesStore = await cookies();
  cookiesStore.delete("access_token");
  cookiesStore.delete("refresh_token");
  return Response.redirect(endSessionUrl.href);
}