"use client";
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { DollarSign } from "lucide-react";
import { FileCode2 } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { AppBarSearchComponent } from "@/app/components/app_bar_search_component";
import { AppBarUserOptions } from "@/app/components/app_bar_user_options.";
import { DropdownMenu } from "@/app/components/dropdown-menu";
import { DropdownMenuTrigger } from "@/app/components/dropdown-menu";
import { DropdownMenuContent } from "@/app/components/dropdown-menu";
import { DropdownMenuItem } from "@/app/components/dropdown-menu";

interface SearchAppBarProps {
  withSearch?: boolean;
}

const AppBar: React.FC<SearchAppBarProps> = ({ withSearch = true }) => {
  // State variables for search value and mobile menu control
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function renderDesktopView() {
    return <nav className="hidden md:flex items-center space-x-6">
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
    return <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Newsletter
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DollarSign className="h-4 w-4 mr-2" />
            Pricing
          </DropdownMenuItem>
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
            <Link href={"/"}>
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

export default AppBar;
