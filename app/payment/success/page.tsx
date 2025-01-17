"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { withRetry } from "@/lib/retry";
import Link from "next/link";
import useSession from "@/hooks/use-session";

const RETRY_CONFIG = {
  maxAttempts: 5,
  baseDelay: 1000,
  maxDelay: 10000,
  timeout: 30000
};

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const { session, refreshSession } = useSession();

  useEffect(() => {
    async function verifyProStatus() {
      setIsVerifying(true);
      setError(null);

      try {
        // Verify pro status with retries
        await withRetry(async () => {
          await refreshSession();
          if (!session.isPro()) {
            console.log("User data or Pro status not reflected:", session);
            throw new Error("Pro status not yet reflected");
          }
        }, RETRY_CONFIG);

        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
        setError(
          "We're having trouble confirming your Pro status. Please contact support@pepy.tech if this persists."
        );
        console.error("Error verifying pro status:", err);
      }
    }

    // Call verifyProStatus once on component mount
    verifyProStatus();
  }, []); // No dependencies to prevent re-running

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Verification Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/profile")}
            >
              Go to Profile
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Support: <a href="mailto:support@pepy.tech" className="text-blue-600 hover:underline">
              support@pepy.tech
            </a>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">
            Verifying Your Purchase
          </h1>
          <p className="text-muted-foreground">
            Please wait while we confirm your Pro status...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Payment Successful!
        </h1>

        <p className="text-muted-foreground mb-8">
          Thank you for upgrading to Pro! Your account has been updated with all premium features.
        </p>

        <div className="space-y-4">
          <Link href="/user">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              View Your Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Return to Homepage
          </Button>
        </div>
      </Card>
    </div>
  );
}