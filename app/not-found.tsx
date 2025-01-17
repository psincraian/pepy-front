import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      {/* Python logo with animation */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 animate-spin-slow">
          <PackageSearch className="w-24 h-24 text-blue-500" />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600">
          Oops! Looks like this package got lost in the Python ecosystem.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Link href="/">
              Return to PyPI Stats
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

