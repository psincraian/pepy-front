"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Copy, Plus } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Alert } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";

interface ApiKey {
  id: string;
  name: string;
  apiKey: string;
  createdAt: string;
}

async function getApiKeys() {
  console.log("Start fetching api keys");
  const response = await fetch("/api/v3/user/api-keys", {
    method: "GET",
    headers: {}
  });
  const body = await response.json();
  console.log("Api keys fetched", body);
  return body.map((key: any) => key as ApiKey);
}

async function createKey(apiKeyName: string) {
  const response = await fetch("/api/v3/user/api-keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name: apiKeyName
    })
  });

  if (response.ok) {
    return response.json();
  }

  const body = await response.json();
  throw new Error("Failed to create key: " + body["error"]);
}

export function ApiKeys() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [creationError, setCreationError] = useState("");
  const [newKeyName, setNewKeyName] = useState("");
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  useEffect(() => {
    getApiKeys().then((keys) => setApiKeys(keys));
  }, []);

  const handleCreateKey = () => {
    createKey(newKeyName).then((key: ApiKey) => {
      setShowCreateDialog(false);
      setNewKeyName("");
      setCreationError("");
      setApiKeys([...apiKeys, key]);
    }).catch((error: Error) => {
      console.error("Failed to create key", error);
      setCreationError(error.message);
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">API Keys</h2>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Key
        </Button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-1">
              <p className="font-medium">{key.name}</p>
              <div className="flex items-center space-x-2">
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  {key.apiKey}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(key.apiKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(key.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Give your API key a name to help you identify it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            {creationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{creationError}</AlertDescription>
              </Alert>
            )}
            <Input
              placeholder="API Key Name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateKey}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}