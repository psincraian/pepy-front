import { clientConfig, getAuthSession, getClientConfig } from "@/lib/authv2";
import * as client from "openid-client";

export async function GET() {
  const authSession = await getAuthSession();
  let code_verifier = client.randomPKCECodeVerifier();
  let code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
  const openIdClientConfig = await getClientConfig();
  let parameters: Record<string, string> = {
    redirect_uri: clientConfig.redirect_uri,
    scope: clientConfig.scope!,
    code_challenge,
    code_challenge_method: clientConfig.code_challenge_method
  };
  let state!: string;
  if (!openIdClientConfig.serverMetadata().supportsPKCE()) {
    state = client.randomState();
    parameters.state = state;
  }
  let redirectTo = client.buildAuthorizationUrl(openIdClientConfig, parameters);
  authSession.code_verifier = code_verifier;
  authSession.state = state;
  await authSession.save();
  return Response.redirect(redirectTo.href);
}