import { getAuthSession } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";
import { refreshAuthSession } from "@/lib/authv2";

export async function GET() {
  try {
    const authSession = await getAuthSession();
    if (!authSession.isLoggedIn) {
      return Response.json({ isLoggedIn: false } as PublicAuthSessionData);
    }

    // check and refresh if needed
    const now = Date.now();
    if (authSession.access_token_expires_at! - now < 1000 * 60 * 5) {
      const authToken = await refreshAuthSession(authSession);

      await authSession.save();
    }

    return Response.json({
      isLoggedIn: authSession.isLoggedIn,
      userInfo: authSession.userInfo
    } as PublicAuthSessionData)
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}