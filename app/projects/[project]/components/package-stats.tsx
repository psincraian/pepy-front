"use client";

import { useState } from "react";
import { useMemo } from "react";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsControls } from "@/app/projects/[project]/components/stats-controls";
import { Project } from "@/app/projects/[project]/model";
import { Version } from "@/app/projects/[project]/components/version-dropdown";
import { computeTotalDownloadsByVersion } from "@/app/projects/[project]/helper/compute_downloads";

export function PackageStats({ project }: { project: Project }) {
  const [showCI, setShowCI] = useState(false);
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [selectedVersions, setSelectedVersions] = useState<Version[]>([]);
  const [timeRange, setTimeRange] = useState("30d");
  const [granularity, setGranularity] = useState("daily");
  const [category, setCategory] = useState("version");

  const versionDownloadsCache = useMemo(() => {
    return computeTotalDownloadsByVersion(project.downloads);
  }, [project.downloads]);
  console.log(versionDownloadsCache);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <p className="text-muted-foreground mb-4">
              {"TODO: Package description loading..."}
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Star className="h-4 w-4 mr-1 inline" />
                TODO
              </Badge>
              <Badge variant="secondary" className="text-sm">
                TODO
              </Badge>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Subscribe to Updates
          </Button>
        </div>
      </div>

      <Tabs defaultValue="downloads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="badge">Badge</TabsTrigger>
        </TabsList>

        <TabsContent value="downloads">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
            <StatsControls
              showCI={showCI}
              setShowCI={setShowCI}
              viewType={viewType}
              setViewType={setViewType}
              versions={project.versions.map(value => ({ version: value, downloads: versionDownloadsCache[value] }))}
              selectedVersions={selectedVersions}
              setSelectedVersions={setSelectedVersions}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              granularity={granularity}
              setGranularity={setGranularity}
              category={category}
              setCategory={setCategory}
            />
            <div className="lg:col-span-3 h-full">
              <Card className="p-6 h-full">
                TODO
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Package Information</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {"Package information loading..."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Latest Version</h3>
                  <p className="text-muted-foreground">TODO</p>
                </div>
                <div>
                  <h3 className="font-semibold">Release Date</h3>
                  <p className="text-muted-foreground">TODO</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="badge">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Badge Generator</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Generate badges to show your package statistics in your README
                or documentation.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold">Markdown</h3>
                <Input
                  readOnly
                  value={`![Python Downloads](https://pepy.tech/badge/${project.name})`}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}