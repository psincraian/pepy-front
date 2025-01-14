import { defaultAuthSession, getAuthSession } from "@/lib/authv2";

export async function GET() {
  try {
    const authSession = await getAuthSession();
    if (!authSession.isLoggedIn) {
      return Response.json({ defaultSession: defaultAuthSession });
    }
    return Response.json({
      isLoggedIn: authSession.isLoggedIn,
      userInfo: authSession.userInfo
    });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}