import { getAuthSession } from "@/lib/authv2";
import { AuthSession } from "@/lib/auth-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function SubscriptionButtonsServer(monthlyLink: string, yearlyLink: string) {
  const sessionData = await getAuthSession();
  const session = new AuthSession(sessionData);

  if (session.isPro()) {
    return <>
      <p className="text-green-500 text-center">You are already subscribed!</p>
      <Button className="w-full bg-blue-600 hover:bg-blue-700">
        <Link href="/user">
          View Your Profile
        </Link>
      </Button>
    </>;
  }

  return <>
    <Button className="w-full bg-blue-600 hover:bg-blue-700">
      <Link href={monthlyLink}>
        Subscribe Monthly
      </Link>
    </Button>
    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
      <Link
        href={yearlyLink}>
        Subscribe Yearly (Save 17%)
      </Link>
    </Button>
  </>;
}