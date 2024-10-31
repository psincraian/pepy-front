"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { confirmSignUp } from "@/lib/auth";

interface VerificationFormProps {
  username: string;
  onVerificationComplete: () => void;
  onResendCode: () => Promise<void>;
}

export function VerificationForm({ username, onVerificationComplete, onResendCode }: VerificationFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    confirmSignUp(
      { code: code, username: username },
      {
        onSuccess(success) {
          console.log("Success confirmation", success);
          onVerificationComplete();
          setIsLoading(false);
        },
        onFailure(error) {
          console.log("Error confirmation", error);
          setError(error);
          setIsLoading(false);
        }
      }
    );
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResendCode();
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
        <p className="text-muted-foreground mb-6">
          We&apos;ve sent a verification code to <strong>{username}</strong>
        </p>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-w-[250px] mx-auto">
            <Input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="text-center text-lg tracking-widest"
              maxLength={6}
              disabled={isLoading}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Didn&apos;t receive the code? Check your spam folder or{" "}
          <Button
            variant="link"
            className="p-0 h-auto font-normal"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Sending..." : "click here to resend"}
          </Button>
        </p>
      </div>
    </Card>
  );
}