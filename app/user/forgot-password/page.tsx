"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecoverPasswordForm from "@/app/user/forgot-password/components/recover-password-form";
import { ConfirmPasswordForm } from "@/app/user/forgot-password/components/confirm-password-form";

export default function LoginPage() {
  const [step, setStep] = useState<"first" | "verify">("first");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignupSuccess = (email: string) => {
    setEmail(email);
    setStep("verify");
  };

  const handleVerificationComplete = () => {
    router.push("/user/login?recovered=true");
  };

  const handleResendCode = async () => {
    // Add resend verification code logic here
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {step === "first" ? (
        <RecoverPasswordForm onCodeRequested={handleSignupSuccess} />
      ) : (
        <ConfirmPasswordForm
          email={email}
          onConfirmationSuccess={handleVerificationComplete}
        />
      )}
    </div>
  );
}