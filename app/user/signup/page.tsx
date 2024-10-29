"use client";

import { useState } from "react";
import { SignupForm } from "@/app/user/signup/components/signup-form";
import { VerificationForm } from "@/app/user/signup/components/verification-form";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignupSuccess = (username: string) => {
    setUsername(username);
    setStep("verify");
  };

  const handleVerificationComplete = () => {
    router.push("/user/login?verified=true");
  };

  const handleResendCode = async () => {
    // Add resend verification code logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {step === "signup" ? (
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      ) : (
        <VerificationForm
          username={username}
          onVerificationComplete={handleVerificationComplete}
          onResendCode={handleResendCode}
        />
      )}
    </div>
  );
}