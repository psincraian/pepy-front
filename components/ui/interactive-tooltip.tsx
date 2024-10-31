"use client";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface InteractiveTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function InteractiveTooltip({
                                     content,
                                     children,
                                     className
                                   }: InteractiveTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild onClick={() => setIsOpen(!isOpen)}>
          <div className={cn("cursor-pointer inline-flex", className)}>
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[300px] text-sm bg-white dark:bg-slate-800 shadow-lg"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}