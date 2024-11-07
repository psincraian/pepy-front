"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { validatePackageName } from "@/lib/validators";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AppBarSearchComponent() {
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString() || "";

    const validation = validatePackageName(query);
    if (!validation.isValid && validation.error) {
      setError("Invalid package name format");
      inputRef.current?.focus();
      return;
    }

    setError(null);
    window.location.href = `/projects/${query.trim()}`;
  };

  const handleInputChange = () => {
    if (error) setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex relative w-full max-w-md">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground pointer-events-none" />
      <TooltipProvider>
        <Tooltip open={!!error}>
          <TooltipTrigger asChild>
            <Input
              ref={inputRef}
              name="query"
              type="search"
              placeholder="Search packages..."
              className={cn(
                "pl-9 sm:pl-10 h-9 sm:h-10 text-sm font-mono",
                error && "border-destructive focus-visible:ring-destructive"
              )}
              autoComplete="off"
              spellCheck="false"
              aria-label="Search packages"
              onChange={handleInputChange}
              suppressHydrationWarning
            />
          </TooltipTrigger>
          {error && (
            <TooltipContent
              className="bg-destructive text-destructive-foreground text-xs p-2"
              side="bottom"
            >
              <p>{error}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}