"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/app/components/input";

export const AppBarSearchComponent: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const handleSearchAction = () => {
    router.push(`/projects/${searchValue}`);
  };

  return (
    <div className="flex relative w-full">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
      <Input
        placeholder="Search packages..."
        className="pl-10"
        suppressHydrationWarning
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSearchAction()}
        type={"search"}
      />
    </div>
  );
};
