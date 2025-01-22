import { clientConfig, getClientConfig, getUserSession } from "@/lib/authv2";
import * as client from "openid-client";

export async function GET() {
  const authSession = await getUserSession();
  let code_verifier = client.randomPKCECodeVerifier();
  let code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
  const openIdClientConfig = await getClientConfig();
  console.log("Public APP URL (login): ", process.env.NEXT_PUBLIC_APP_URL);
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