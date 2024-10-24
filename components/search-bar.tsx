"use client";

import { useState } from "react";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/project/${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="flex relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search Python packages (e.g., requests, pandas, numpy)..."
          className="pl-10 h-12"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}