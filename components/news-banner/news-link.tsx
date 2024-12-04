import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsLinkProps {
  text: string;
  url: string;
}

export function NewsLink({ text, url }: NewsLinkProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="px-2 py-1 h-auto font-normal"
      asChild
    >
      <a href={url} className="flex items-center gap-1" rel={url.startsWith("https") ? "noopener nofollow" : undefined}
         target={url.startsWith("https") ? "_blank" : undefined}>
        {text}
        <ArrowRight className="h-3 w-3" />
      </a>
    </Button>
  );
}