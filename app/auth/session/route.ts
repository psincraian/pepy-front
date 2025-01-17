import { getAuthSession } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";

export async function GET() {
  try {
    const authSession = await getAuthSession();
    if (!authSession.isLoggedIn) {
      return Response.json({ isLoggedIn: false } as PublicAuthSessionData);
    }

    return Response.json({
      isLoggedIn: authSession.isLoggedIn,
      userInfo: authSession.userInfo
    } as PublicAuthSessionData)
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}