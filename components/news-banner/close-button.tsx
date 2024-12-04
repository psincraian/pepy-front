import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CloseButtonProps {
  onClick: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      <X className="h-3 w-3" />
      <span className="sr-only">Close banner</span>
    </Button>
  );
}