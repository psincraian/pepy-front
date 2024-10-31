import { useState } from "react";
import { forgotPassword } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

interface RecoverPasswordFormProps {
  onCodeRequested: (email: string) => void;
}

export default function RecoverPasswordForm({ onCodeRequested }: RecoverPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    forgotPassword({ email: email }, {
      onSuccess(success) {
        setIsLoading(false);
        onCodeRequested(email);
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
        <h1 className="text-2xl font-bold text-center mb-6">Recover password</h1>

        {error &&
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        }
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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