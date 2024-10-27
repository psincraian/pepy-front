"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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

interface Project {
  id: string;
  name: string;
  notifications: {
    newVersions: boolean;
    weeklyStats: boolean;
    monthlyStats: boolean;
  };
}

export function ProjectSubscriptions() {
  const [showUnsubscribeDialog, setShowUnsubscribeDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "requests",
      notifications: {
        newVersions: true,
        weeklyStats: true,
        monthlyStats: false
      }
    },
    {
      id: "2",
      name: "pandas",
      notifications: {
        newVersions: true,
        weeklyStats: false,
        monthlyStats: true
      }
    }
  ]);

  const handleUnsubscribe = () => {
    if (selectedProjectId) {
      setProjects(projects.filter(project => project.id !== selectedProjectId));
    }
    setShowUnsubscribeDialog(false);
    setSelectedProjectId(null);
  };

  const toggleNotification = (projectId: string, type: keyof Project["notifications"]) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          notifications: {
            ...project.notifications,
            [type]: !project.notifications[type]
          }
        };
      }
      return project;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Project Subscriptions</h2>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search projects..."
            className="w-64"
          />
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{project.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setShowUnsubscribeDialog(true);
                  }}
                >
                  <BellOff className="h-4 w-4 mr-2" />
                  Unsubscribe
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={project.notifications.newVersions}
                    onCheckedChange={() => toggleNotification(project.id, "newVersions")}
                  />
                  <span className="text-sm">New Versions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={project.notifications.weeklyStats}
                    onCheckedChange={() => toggleNotification(project.id, "weeklyStats")}
                  />
                  <span className="text-sm">Weekly Stats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={project.notifications.monthlyStats}
                    onCheckedChange={() => toggleNotification(project.id, "monthlyStats")}
                  />
                  <span className="text-sm">Monthly Stats</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
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