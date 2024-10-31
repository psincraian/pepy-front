"use client";
import { Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PackageNotFound() {
  const params = useParams();
  const packageName = params?.project as string;

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative mb-8">
          <Package className="h-24 w-24 text-muted-foreground/20 mx-auto" />
          <Search
            className="h-12 w-12 text-blue-600 absolute bottom-0 right-1/2 translate-x-8 translate-y-2 transform" />
        </div>

        <h1
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Package Not Found
        </h1>

        <p className="text-xl text-muted-foreground mb-4">
          We couldn&apos;t find the Python package <code
          className="px-2 py-1 bg-muted rounded font-mono">{packageName}</code>
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          It might not exist on PyPI, or there could be a typo in the name.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            <p className="font-medium mb-2">Common reasons for this error:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>The package name is misspelled</li>
              <li>The package is new and we don&apos;t have data</li>
              <li>The package name uses different characters (e.g., underscore vs hyphen)</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/" className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search for packages
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://pypi.org" target="_blank" rel="noopener noreferrer">
                Visit PyPI
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}