import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { User } from "lucide-react";
import { UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getUserSession } from "@/lib/authv2";
import { AuthSession } from "@/lib/auth-session";

export interface AppBarUserOptionsProps {
  isMobileView: boolean;
}

export const AppBarUserOptions = async ({ isMobileView }: AppBarUserOptionsProps) => {
  var sessionData = await getUserSession();
  const session = new AuthSession(sessionData);

  const isPro = session.isPro();

  function renderMobileView() {
    return session.isLoggedIn ? (
      <Link href="/user" passHref>
        <DropdownMenuItem className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          Profile
          {isPro && (
            <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              Pro
            </Badge>
          )}
        </DropdownMenuItem>
      </Link>
    ) : (
      <>
        <Link href="/auth/login" prefetch={false} data-cy="login-mobile" passHref>
          <DropdownMenuItem className="flex items-center">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </DropdownMenuItem>
        </Link>
        <Link href="/auth/login" passHref>
          <DropdownMenuItem className="font-medium text-blue-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Sign up
          </DropdownMenuItem>
        </Link>
      </>
    );
  }

  function renderDesktopView() {
    return session.isLoggedIn ? (
      <Link href="/user" passHref>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Profile</span>
          {isPro && (
            <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              Pro
            </Badge>
          )}
        </Button>
      </Link>
    ) : (
      <>
        <Link href="/auth/login" data-cy="login" passHref>
          <Button variant="ghost">
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </Button>
        </Link>
        <Link href="/auth/login" prefetch={false} passHref>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-5 w-5 mr-2" />
            Sign up
          </Button>
        </Link>
      </>
    );
  }

  return isMobileView ? renderMobileView() : renderDesktopView();
};
