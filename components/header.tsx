"use client";
import React from "react";
import { Mail } from "lucide-react";
import { DollarSign } from "lucide-react";
import { FileCode2 } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppBarSearchComponent } from "@/components/app-bar-search-component";
import { AppBarUserOptions } from "@/components/app-bar-user-options.";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface SearchAppBarProps {
  withSearch?: boolean;
}

const Header: React.FC<SearchAppBarProps> = ({ withSearch = true }) => {
  function renderDesktopView() {
    return <nav className="hidden lg:flex items-center space-x-6">
      <Link href="/newsletter" passHref>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Newsletter</span>
        </Button>
      </Link>
      <Link href="/pricing" passHref>
        <Button variant="ghost" className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Pricing</span>
        </Button>
      </Link>
      <Link href="/pepy-api" passHref>
        <Button variant="ghost" className="flex items-center space-x-2">
          <FileCode2 className="h-5 w-5" />
          <span>API</span>
        </Button>
      </Link>
      <AppBarUserOptions isMobileView={false} />
    </nav>;
  }

  function renderMobileView() {
    return <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <Link href="/newsletter" passHref>
            <DropdownMenuItem className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Newsletter
            </DropdownMenuItem>
          </Link>
          <Link href="/pricing" passHref>
            <DropdownMenuItem>
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </DropdownMenuItem>
          </Link>
          <Link href="/pepy-api" passHref>
            <DropdownMenuItem>
              <FileCode2 className="h-4 w-4 mr-2" />
              <span>API</span>
            </DropdownMenuItem>
          </Link>
          <AppBarUserOptions isMobileView={true} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>;
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 w-full">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">pepy.tech</span>
              </div>
            </Link>
            {withSearch && <AppBarSearchComponent />}
          </div>
          {renderDesktopView()}
          {renderMobileView()}
        </div>
      </div>
    </header>
  );
};

export default Header;
