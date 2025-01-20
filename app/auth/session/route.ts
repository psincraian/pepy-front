import { getUserSession } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";
import { refreshAuthSession } from "@/lib/authv2";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const authSession = await getUserSession();
    if (!authSession.isLoggedIn) {
      return Response.json({ isLoggedIn: false } as PublicAuthSessionData);
    }

    // check and refresh if needed
    const now = Date.now();
    if (authSession.access_token_expires_at! - now < 1000 * 60 * 5) {
      const cookiesStore = await cookies();
      const requestCookie = cookiesStore.get("refresh_token")!;
      const { authSession, expiresIn, accessToken } = await refreshAuthSession(requestCookie.value);
      cookiesStore.set("access_token", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        maxAge: expiresIn!
      });
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