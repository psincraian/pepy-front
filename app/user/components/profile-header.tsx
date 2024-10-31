"use client";

import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
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
import { signout } from "@/lib/auth";
import { UserAction } from "@/app/user/UserContext";
import { useUserDispatch } from "@/app/user/UserContext";

interface ProfileHeaderProps {
  user: {
    username: string;
    email: string;
    isPro: boolean;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const router = useRouter();
  const dispatch = useUserDispatch();

  const handleSignOut = () => {
    signout();
    dispatch({ type: UserAction.LOGOUT });
    router.push("/user/login");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center">
          <User className="h-10 w-10 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          {user.isPro && (
            <Badge className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              Pro
            </Badge>
          )}
        </div>
      </div>

      <Button
        variant="outline"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => setShowSignOutDialog(true)}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>

      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out of your account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}