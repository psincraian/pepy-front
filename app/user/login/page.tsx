"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { login } from "@/lib/auth";
import { UserAction } from "@/app/user/UserContext";
import { useUserDispatch } from "@/app/user/UserContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Check } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useUserDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const recovered = searchParams.get("recovered");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    login({ email: email, password: password }, {
      onSuccess(success) {
        dispatch({ type: UserAction.LOGIN_SUCCESS, user: success });
        setIsLoading(false);
        router.push("/user");
      },
      onFailure(err) {
        console.error("Login failed:", err);
        setError(err);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {verified && (
          <Alert variant="success" className="mb-6">
            <Check className="h-4 w-4" />
            <AlertDescription>Registration succeeded</AlertDescription>
          </Alert>
        )}

        {recovered && (
          <Alert variant="success" className="mb-6">
            <Check className="h-4 w-4" />
            <AlertDescription>Password recovery succeeded</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href="/user/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button id="login-button" disabled={isLoading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/user/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}