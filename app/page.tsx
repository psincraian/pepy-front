import { PopularPackages } from "@/components/popular-packages";
import { SearchBar } from "@/components/search-bar";
import React from "react";
import Logo from "@/components/logo";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Python Package Statistics",
  description: "View download statistics for Python packages"
};

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16">
              <Logo outlineWidth={40} />
            </div>
          </div>
          <h1
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Python Package Analytics
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Track downloads, analyze trends, and gain insights into the Python ecosystem
          </p>
          <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border mb-8">
            <SearchBar className="mb-4" />
            <PopularPackages />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">700K+</h2>
            <p className="text-muted-foreground">Python packages tracked</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">1B+</h2>
            <p className="text-muted-foreground">Daily downloads analyzed</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">50K+</h2>
            <p className="text-muted-foreground">Active developers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
