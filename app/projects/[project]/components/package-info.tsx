import { Card } from "@/components/ui/card";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Tag } from "lucide-react";
import { Calendar } from "lucide-react";
import { User } from "lucide-react";
import { Home } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Github } from "lucide-react";
import { Package } from "lucide-react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { AlertDescription } from "@/components/ui/alert";

export interface PyPiInfo {
  packageName: string,
  summary: string
  lastRelease: string,
  releaseDate: string,
  homepageUrl: string | null,
  sourceUrl: string | null,
  author: string,
}

export function PackageInfo({
                              packageName,
                              summary,
                              author,
                              homepageUrl,
                              sourceUrl,
                              lastRelease,
                              releaseDate
                            }: PyPiInfo) {
  const pipCommand = `pip install ${packageName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pipCommand);
  };

  return <Card className="p-6">
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Package Information</h2>
        <p className="text-muted-foreground">{summary}</p>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between ml-2">
          <code className="bg-muted px-2 py-1 rounded">{pipCommand}</code>
          <Button variant="outline" className="active:scale-95" size="sm" onClick={copyToClipboard}>
            Copy
          </Button>
        </AlertDescription>
      </Alert>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Latest Version</h3>
              <p className="text-sm text-muted-foreground">{lastRelease}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Release Date</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Author</h3>
              <p className="text-sm text-muted-foreground">{author ?? "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {homepageUrl && (
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
                <Home className="h-4 w-4 mr-2" />
                Homepage
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          )}

          {sourceUrl && (
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Source Code
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          )}

          <Button variant="outline" className="w-full justify-start" asChild>
            <a
              href={`https://pypi.org/project/${packageName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="h-4 w-4 mr-2" />
              PyPI Package
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </Card>;
}