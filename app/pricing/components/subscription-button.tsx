import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserSession } from "@/lib/authv2";
import { AuthSession } from "@/lib/auth-session";

export async function SubscriptionButtons() {
  const sessionData = await getUserSession();
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
      <Link href="/payment/start?planFrequency=MONTHLY">
        Subscribe Monthly
      </Link>
    </Button>
    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
      <Link href="/payment/start?planFrequency=YEARLY">
        Subscribe Yearly (Save 17%)
      </Link>
    </Button>
  </>;
}