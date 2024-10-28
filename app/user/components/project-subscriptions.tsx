"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
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

interface Subscription {
  project: string;
}

async function getSubscriptions() {
  console.log("Start fetching subscriptions");
  const response = await fetch("/api/v3/subscriptions", {
    method: "GET",
    headers: {}
  });
  const body = await response.json();
  console.log("Api keys fetched", body);
  return body.map((subscription: any) => subscription as Subscription);
}

async function deleteSubscription(project: string) {
  console.log("Start fetching subscriptions");
  const response = await fetch("/api/v3/subscriptions/" + project, {
    method: "DELETE",
    headers: {}
  });

  return response.status === 200 ? "success" : "error";
}

export function ProjectSubscriptions() {
  const [showUnsubscribeDialog, setShowUnsubscribeDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [deleteError, setDeleteError] = useState("");

  const handleUnsubscribe = () => {

    deleteSubscription(selectedProjectId!).then(() => {
        if (selectedProjectId) {
          setSubscriptions(subscriptions.filter(project => project.project !== selectedProjectId));
        }
        setShowUnsubscribeDialog(false);
        setSelectedProjectId(null);
        setDeleteError("");
      }
    ).catch((err: string) => {
      setDeleteError(err);
    });
  };

  useEffect(() => {
    getSubscriptions()
      .then((result) => {
        setSubscriptions(result);
      })
      .catch((err: Error) => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex sm:flex-col items-center justify-between">
        <h2 className="text-xl self-start font-semibold">Project Subscriptions</h2>
        <div className="flex-1 items-center space-x-2">
          <Input
            placeholder="Search projects..."
            className="w-64 sm:w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        {subscriptions.map(({ project }) => (
          <div
            key={project}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{project}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setSelectedProjectId(project);
                    setShowUnsubscribeDialog(true);
                  }}
                >
                  <BellOff className="h-4 w-4 mr-2" />
                  Unsubscribe
                </Button>
              </div>
            </div>
          </div>
        ))}

        {subscriptions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-4 opacity-50" />
            <p>You haven&apos;t subscribed to any projects yet.</p>
            <p className="text-sm">Search for a project to start receiving updates.</p>
          </div>
        )}
      </div>

      <AlertDialog open={showUnsubscribeDialog} onOpenChange={setShowUnsubscribeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsubscribe from Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to unsubscribe from this project? You&apos;ll no longer receive any notifications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{deleteError}</AlertDescription>
            </Alert>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUnsubscribe}
              className="bg-red-600 hover:bg-red-700"
            >
              Unsubscribe
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}