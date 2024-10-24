import Link from "next/link";
import { useUser } from "@/app/user/UserContext";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { User } from "lucide-react";
import { UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface AppBarUserOptionsProps {
  isMobileView: boolean;
}

export const AppBarUserOptions = ({ isMobileView }: AppBarUserOptionsProps) => {
  const { user } = useUser();

  const isPro = !!user?.isPro;

  function renderMobileView() {
    return user ? (
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
        <Link href="/user/login" passHref>
          <DropdownMenuItem className="flex items-center">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </DropdownMenuItem>
        </Link>
        <Link href="/user/signup" passHref>
          <DropdownMenuItem className="font-medium text-blue-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Sign up
          </DropdownMenuItem>
        </Link>
      </>
    );
  }

  function renderDesktopView() {
    return user ? (
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
        <Link href="/user/login" passHref>
          <Button variant="ghost">
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </Button>
        </Link>
        <Link href="/user/signup" passHref>
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
