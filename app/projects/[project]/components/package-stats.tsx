"use client";

import { useState } from "react";
import { useMemo } from "react";
import React from "react";
import { useEffect } from "react";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsControls } from "@/app/projects/[project]/components/stats-controls";
import { Project } from "@/app/projects/[project]/model";
import { DisplayStyle } from "@/app/projects/[project]/model";
import { DownloadData } from "@/app/projects/[project]/model";
import { VersionDownloads } from "@/app/projects/[project]/model";
import { Range } from "@/app/projects/[project]/model";
import { Version } from "@/app/projects/[project]/components/version-dropdown";
import { computeTotalDownloadsByVersion } from "@/app/projects/[project]/helper/compute_downloads";
import { retrieveDownloads } from "@/app/projects/[project]/helper/compute_downloads";
import DownloadsChart from "@/app/projects/[project]/components/downloads_chart";
import { notFound } from "next/navigation";
import { useUser } from "@/app/user/UserContext";
import DownloadsTable from "@/app/projects/[project]/components/downloads_table";
import { formatDownloads } from "@/app/projects/[project]/helper/number_format";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import CountryDownloadsComponent from "@/app/projects/[project]/components/country-downloads";
import { BadgeConfigurator } from "@/app/projects/[project]/components/badge-configurator";
import { PyPiInfo } from "@/app/projects/[project]/components/PackageInfo";
import { PackageInfo } from "@/app/projects/[project]/components/PackageInfo";
import { SubscribeButton } from "@/components/subscribe-button";

async function getOneYearDownloadsData(project: string): Promise<DownloadData> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/pro/projects/${project}/downloads`, {
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!
    },
    next: { revalidate: 3600 }
  });
  if (res.status === 404) {
    notFound();
  } else if (res.status !== 200) {
    throw new Error(`Server error: ${res.status}`);
  }

  const downloadData: DownloadData = {};
  let response = await res.json();
  for (const [date, downloads] of Object.entries(response.downloads)) {
    const verionDownloads: VersionDownloads = {};
    for (const [version, count] of Object.entries(downloads!)) {
      verionDownloads[version] = count;
    }

    downloadData[date] = verionDownloads;
  }

  return downloadData;
}

// Function to get the latest release date for the version in `info`
function getLatestReleaseDateForVersion(data: any): string | null {
  const version = data.info.version;
  const releases = data.releases[version];

  if (!releases || releases.length === 0) {
    return null; // No release data for the specified version
  }

  // Find the latest date for this specific version
  let latestDate = new Date(releases[0].upload_time_iso_8601);
  for (const release of releases) {
    const releaseDate = new Date(release.upload_time_iso_8601);
    if (releaseDate > latestDate) {
      latestDate = releaseDate;
    }
  }

  return latestDate.toISOString();
}

async function getPypiInfo(project: string): Promise<PyPiInfo> {
  console.log("Fetching data for", project);
  const res = await fetch(`https://pypi.org/pypi/${project}/json`, {
    next: { revalidate: 24 * 60 * 60 }
  });
  if (res.status !== 200) {
    return {
      packageName: project,
      summary: "No summary found",
      lastRelease: "No last release found",
      releaseDate: "No release date found",
      homepageUrl: null,
      sourceUrl: null,
      author: "N/A"
    };
  }

  const response = await res.json();
  return {
    packageName: project,
    summary: response["info"]["summary"],
    lastRelease: response["info"]["version"],
    releaseDate: getLatestReleaseDateForVersion(response)!,
    homepageUrl: response["info"]["home_page"],
    sourceUrl: response["info"]["project_urls"]["Source"],
    author: response["info"]["author"]
  };
}


export function PackageStats({ project }: { project: Project }) {
  const { user } = useUser();
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [timeRange, setTimeRange] = useState(Range.FOUR_MONTHS);
  const [granularity, setGranularity] = useState<DisplayStyle>(DisplayStyle.DAILY);
  const [category, setCategory] = useState<"version" | "country">("version");
  const [downloadsData, setDownloadsData] = useState(project.downloads);
  const [pypiInfo, setPypiInfo] = useState<PyPiInfo>({
    packageName: project.name,
    summary: "",
    lastRelease: "",
    releaseDate: "",
    homepageUrl: null,
    sourceUrl: null,
    author: ""
  });

  useEffect(() => {
    getPypiInfo(project.name).then(data => {
      setPypiInfo(data);
    });
  }, [project.name]);

  const versionDownloadsCache = useMemo(() => {
    return computeTotalDownloadsByVersion(downloadsData);
  }, [downloadsData]);

  const versions = project.versions
    .toReversed()
    .map(value => ({ version: value, downloads: versionDownloadsCache[value] }));
  const [selectedVersions, setSelectedVersions] = useState<Version[]>(versions.slice(0, 3));

  function handleRangeChange(range: Range) {
    setTimeRange(range);
    if (range !== Range.ONE_YEAR) {
      setDownloadsData(project.downloads);
      return;
    }

    if (granularity == DisplayStyle.DAILY) {
      setGranularity(DisplayStyle.WEEKLY);
    }

    getOneYearDownloadsData(project.name).then(data => {
      setDownloadsData(data);
    });
  }

  const downloadsCache = useMemo(() => {
    return retrieveDownloads(
      downloadsData,
      selectedVersions.map((value) => value.version),
      granularity
    );
  }, [downloadsData, selectedVersions, granularity]);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <p className="text-muted-foreground mb-4">
              {pypiInfo.summary}
            </p>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {pypiInfo.lastRelease}
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger type="button" className="ml-2">
                    <Badge variant="secondary" className="text-sm">
                      <Download className="h-4 w-4 mr-1 inline" />
                      {formatDownloads(project.totalDownloads)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{project.name} has been downloaded {project.totalDownloads} times!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <SubscribeButton project={project.name} className="bg-blue-600 hover:bg-blue-700" />
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
              viewType={viewType}
              setViewType={setViewType}
              versions={versions}
              selectedVersions={selectedVersions}
              setSelectedVersions={setSelectedVersions}
              timeRange={timeRange}
              setTimeRange={handleRangeChange}
              granularity={granularity}
              setGranularity={setGranularity}
              category={category}
              setCategory={setCategory}
              isUserPro={user?.isPro ?? false} />
            <div className="lg:col-span-3 h-full">
              <Card className="p-6 h-[600px] ">
                {


                  category == "country" ?
                    <CountryDownloadsComponent view={viewType} project={project.name} /> :
                    viewType == "table" ?
                      <DownloadsTable selectedVersions={selectedVersions.map(value => value.version)}
                                      data={downloadsCache} /> :
                      <DownloadsChart selectedVersions={selectedVersions.map(value => value.version)}
                                      data={downloadsCache} />
                }
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <PackageInfo packageName={project.name} summary={pypiInfo.summary} author={pypiInfo.author}
                       homepageUrl={pypiInfo.homepageUrl}
                       lastRelease={pypiInfo.lastRelease} releaseDate={pypiInfo.releaseDate}
                       sourceUrl={pypiInfo.sourceUrl} />
        </TabsContent>

        <TabsContent value="badge">
          <BadgeConfigurator packageName={project.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
}