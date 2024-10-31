"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { LucideMailOpen } from "lucide-react";
import Link from "next/link";
import { confirmPassword } from "@/lib/auth";

interface SignupFormProps {
  email: string;
  onConfirmationSuccess: (username: string) => void;
}

export function ConfirmPasswordForm({ email, onConfirmationSuccess }: SignupFormProps) {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    confirmPassword({ code, email, newPassword: password }, {
      onSuccess(success) {
        setIsLoading(false);
        onConfirmationSuccess(code);
      },
      onFailure(error) {
        console.log(error);
        setIsLoading(false);
        setError(error);
      }
    });
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Change password</h1>

      {error !== "" ?
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert> :
        <Alert variant="success" className="mb-6">
          <LucideMailOpen className="h-4 w-4" />
          <AlertDescription>Confirmation code sent, check your inbox</AlertDescription>
        </Alert>
      }

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="email"
            value={email}
            disabled={true}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Changing password..." : "Change password"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/user/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}