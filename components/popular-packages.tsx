"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function PopularPackages() {
  const router = useRouter();

  const navigateToPackage = (packageName: string) => {
    router.push(`/projects/${packageName}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
      <span>Popular packages:</span>
      <Button
        variant="link"
        className="p-0 h-auto"
        onClick={() => navigateToPackage("requests")}
      >
        requests
      </Button>
      <Button
        variant="link"
        className="p-0 h-auto"
        onClick={() => navigateToPackage("pandas")}
      >
        pandas
      </Button>
      <Button
        variant="link"
        className="p-0 h-auto"
        onClick={() => navigateToPackage("numpy")}
      >
        numpy
      </Button>
    </div>
  );
}