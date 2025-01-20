import { NextRequest } from "next/server";
import { getUserSession } from "@/lib/authv2";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const session = await getUserSession();

  if (!session.isLoggedIn) {
    redirect("/auth/login");
  }

  const searchParams = request.nextUrl.searchParams;
  const planFrequency = searchParams.get("planFrequency")!;
  const accessToken = request.cookies.get("access_token")!;

  const url = `${process.env.PEPY_HOST}/api/v3/checkout/session/${planFrequency}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken.value}`,
      "X-Api-Key": process.env.PEPY_API_KEY!
    }
  });

  if (!response.ok) {
    console.log("Error getting data", response.status);
    throw new Error("Failed to fetch session URL from the server.");
  }

  const data = await response.json();
  return redirect(data.sessionUrl);
}
