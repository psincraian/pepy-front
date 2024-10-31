"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { signup } from "@/lib/auth";

interface SignupFormProps {
  onSignupSuccess: (username: string) => void;
}

export function SignupForm({ onSignupSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    signup({ username, email, password }, {
      onSuccess(success) {
        setIsLoading(false);
        onSignupSuccess(username);
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
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
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
          {isLoading ? "Creating account..." : "Create Account"}
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