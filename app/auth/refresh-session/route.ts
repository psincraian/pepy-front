import { getUserSession } from "@/lib/authv2";
import { PublicAuthSessionData } from "@/lib/authv2";
import { refreshAuthSession } from "@/lib/authv2";
import { cookies } from "next/headers";

export async function POST() {
  var authSession = await getUserSession();
  if (!authSession.isLoggedIn) {
    return Response.json({ isLoggedIn: false } as PublicAuthSessionData);
  }

  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refresh_token")!;
  const { authSession: newAuthSession, accessToken, expiresIn } = await refreshAuthSession(refreshToken.value);

  await newAuthSession.save();
  cookiesStore.set("access_token", accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: expiresIn!
  });
  return Response.json({
    isLoggedIn: authSession.isLoggedIn,
    userInfo: authSession.userInfo
  } as PublicAuthSessionData);
}