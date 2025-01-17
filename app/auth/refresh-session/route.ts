import { getAuthSession } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";
import { refreshAuthSession } from "@/lib/authv2";

export async function POST() {
  var authSession = await getAuthSession();
  if (!authSession.isLoggedIn) {
    return Response.json({ isLoggedIn: false } as PublicAuthSessionData);
  }

  authSession = await refreshAuthSession(authSession);

  await authSession.save();
  return Response.json({
    isLoggedIn: authSession.isLoggedIn,
    userInfo: authSession.userInfo
  } as PublicAuthSessionData);
}