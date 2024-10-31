"use client";

import { AlertTriangle, Github, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const params = useParams();
  const packageName = params?.project as string;

  useEffect(() => {
    console.error("Package Error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-red-500/20 mx-auto" />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-red-600">
          Something Went Wrong
        </h1>

        <p className="text-xl text-muted-foreground mb-4">
          We encountered an error while fetching data for{" "}
          <code className="px-2 py-1 bg-muted rounded font-mono">{packageName}</code>
        </p>

        <Alert variant="destructive" className="mb-8 max-w-xl mx-auto">
          <AlertDescription className="text-sm">
            Error: {error.message || "An unexpected error occurred"}
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="p-6 bg-muted/50 rounded-lg text-sm text-muted-foreground max-w-xl mx-auto">
            <p className="font-medium mb-3">What you can try:</p>
            <ol className="list-decimal list-inside space-y-2 text-left">
              <li>Refresh the page to try again</li>
              <li>Clear your browser cache and cookies</li>
              <li>Check your internet connection</li>
              <li>If the error persists, please report it on GitHub</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              asChild
            >
              <a
                href="https://github.com/psincraian/pepy/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="h-4 w-4 mr-2" />
                Report Issue
              </a>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Error ID: <code className="text-xs bg-muted px-2 py-1 rounded">{error.digest}</code>
          </p>
        </div>
      </div>
    </div>
  );
}