"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { validatePackageName } from "@/lib/validators";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim();

    if (!query) return;

    const validation = validatePackageName(query);
    if (!validation.isValid && validation.error) {
      setError(validation.error);
      inputRef.current?.focus();
      return;
    }

    setError(null);
    window.location.href = `/projects/${query}`;
  };

  const handleInputChange = () => {
    if (error) setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-2xl mx-auto", className)}
    >
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <TooltipProvider>
          <Tooltip open={!!error}>
            <TooltipTrigger asChild>
              <Input
                ref={inputRef}
                name="query"
                placeholder="Search Python packages (e.g., requests, pandas)..."
                className={cn(
                  "pl-10 h-11 sm:h-12 text-sm sm:text-base font-mono",
                  error && "border-destructive focus-visible:ring-destructive"
                )}
                autoComplete="off"
                spellCheck="false"
                aria-label="Search packages"
                onChange={handleInputChange}
              />
            </TooltipTrigger>
            {error && (
              <TooltipContent
                className="bg-destructive text-destructive-foreground text-xs sm:text-sm max-w-[90vw] sm:max-w-md p-2 sm:p-3"
                side="bottom"
              >
                <p>{error}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  );
}