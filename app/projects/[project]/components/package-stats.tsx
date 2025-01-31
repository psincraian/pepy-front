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
import { DashboardState, Project, Version } from "@/app/projects/[project]/model";
import { DisplayStyle } from "@/app/projects/[project]/model";
import { DownloadData } from "@/app/projects/[project]/model";
import { VersionDownloads } from "@/app/projects/[project]/model";
import { Range } from "@/app/projects/[project]/model";
import { computeTotalDownloadsByVersion } from "@/app/projects/[project]/helper/compute_downloads";
import { retrieveDownloads } from "@/app/projects/[project]/helper/compute_downloads";
import DownloadsChart from "@/app/projects/[project]/components/downloads-chart";
import { notFound } from "next/navigation";
import DownloadsTable from "@/app/projects/[project]/components/downloads-table";
import { formatDownloads } from "@/app/projects/[project]/helper/number_format";
import CountryDownloadsComponent from "@/app/projects/[project]/components/country-downloads";
import { BadgeConfigurator } from "@/app/projects/[project]/components/badge-configurator";
import { PyPiInfo } from "@/app/projects/[project]/components/package-info";
import { PackageInfo } from "@/app/projects/[project]/components/package-info";
import { SubscribeButton } from "@/components/subscribe-button";
import Ads from "@/app/projects/[project]/components/ads";
import { InteractiveTooltip } from "@/components/ui/interactive-tooltip";
import { useParamsUrl } from "@/hooks/use-params-url";
import { ProDialogLinkSharing } from "@/app/projects/[project]/components/pro-dialog-link-sharing";
import useSessionContext from "@/hooks/session-context";

async function getProDownloadsData(project: string, range: Range, includeCIDownloads: boolean): Promise<DownloadData> {
  const rangeValue = range == Range.ONE_YEAR ? "ONE_YEAR" : "FOUR_MONTHS";
  const res = await fetch(`/api/v3/pro/projects/${project}/downloads?timeRange=${rangeValue}&includeCIDownloads=${includeCIDownloads}`, {
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
    summary: response.info.summary,
    lastRelease: response.info.version,
    releaseDate: getLatestReleaseDateForVersion(response)!,
    homepageUrl: response.info.home_page ?? null,
    sourceUrl: response.info.project_urls?.Source ?? null,
    author: response.info.author ?? response.info.maintainer ?? response.info.author_email ?? null
  };
}


export function PackageStats({ project }: { project: Project }) {
  const { session, loading } = useSessionContext();
  const { getParam, getParamValue, getListParam, updateMultipleParams } = useParamsUrl();
  const [downloadsData, setDownloadsData] = useState(project.downloads);


  // Initialize versions
  const versionDownloads = computeTotalDownloadsByVersion(downloadsData);
    const allVersions: Version[] = project.versions
      .toReversed()
      .map(value => ({ 
        version: value, 
        downloads: versionDownloads[value] 
      }));

    const versionsFromUrl: Version[] = getListParam("versions", [])
      .map(value => ({ 
        version: value, 
        downloads: versionDownloads[value] 
      }));

    const initialVersions = versionsFromUrl.length > 0 
      ? versionsFromUrl
      : allVersions
          .filter(v => !v.version.includes("a") && !v.version.includes("b"))
          .slice(0, 3);


  // Initialize dashboard state with URL params
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    packages: [project.name],
    viewType: getParam("viewType", "chart") as "chart" | "table",
    timeRange: getParamValue("timeRange", Range, Range.THREE_MONTHS),
    granularity: getParamValue("granularity", DisplayStyle, DisplayStyle.DAILY),
    category: getParam("category", "version") as "country" | "version",
    includeCIDownloads: getParam("includeCIDownloads", "true").toLowerCase() === "true",
    selectedVersions: initialVersions,
    versions: allVersions
  });

  const [isProDialogOpen, setProDialogOpen] = useState(false);
  const [pypiInfo, setPypiInfo] = useState<PyPiInfo>({
    packageName: project.name,
    summary: "",
    lastRelease: "",
    releaseDate: "",
    homepageUrl: null,
    sourceUrl: null,
    author: ""
  });

  // Check pro features on initial load
  useEffect(() => {
    if (loading) return;

    const hasProFeatures =
      dashboardState.timeRange === Range.ONE_YEAR ||
      dashboardState.category === "country" ||
      !dashboardState.includeCIDownloads;

    if (hasProFeatures && !session.isPro()) {
      setProDialogOpen(true);
      setDashboardState(prev => ({
        ...prev,
        timeRange: Range.THREE_MONTHS,
        category: "version",
        includeCIDownloads: true
      }));
    }
  }, [loading, session]);

  // Load PyPI info
  useEffect(() => {
    getPypiInfo(project.name).then(setPypiInfo);
  }, [project.name]);

  // Load pro downloads data
  useEffect(() => {
    if (!session.isPro() || loading) return;

    getProDownloadsData(
      project.name,
      dashboardState.timeRange,
      dashboardState.includeCIDownloads
    ).then(setDownloadsData);
  }, [
    project.name,
    dashboardState.timeRange,
    dashboardState.includeCIDownloads,
    session,
    loading
  ]);

  
    useEffect(() => {
      updateMultipleParams({
        timeRange: dashboardState.timeRange.key,
        category: dashboardState.category,
        includeCIDownloads: dashboardState.includeCIDownloads,
        granularity: dashboardState.granularity.key,
        viewType: dashboardState.viewType,
        versions: dashboardState.selectedVersions.map(v => v.version)
      });
    }, [dashboardState, updateMultipleParams]);

  const downloadsCache = useMemo(() => {
    return retrieveDownloads(
      downloadsData,
      dashboardState.selectedVersions.map(v => v.version),
      dashboardState.granularity
    );
  }, [downloadsData, dashboardState.selectedVersions, dashboardState.granularity]);

  const handleDashboardStateChange = (newState: Partial<DashboardState>) => {
    setDashboardState(prev => {
      const updated = { ...prev, ...newState };
      
      // Additional logic for timeRange changes
      if (newState.timeRange === Range.ONE_YEAR && prev.granularity === DisplayStyle.DAILY) {
        updated.granularity = DisplayStyle.WEEKLY;
      }

      return updated;
    });
  };

  console.log("Selected versions (parent)", dashboardState.selectedVersions);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {pypiInfo.lastRelease}
              </Badge>
              <InteractiveTooltip content={
                <p>{project.name} has been downloaded {project.totalDownloads.toLocaleString()} times!</p>
              }>
                <Badge variant="secondary" className="text-sm">
                  <Download className="h-4 w-4 mr-1 inline" />
                  {formatDownloads(project.totalDownloads)}
                </Badge>
              </InteractiveTooltip>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            {pypiInfo.summary || "Loading package information..."}
          </p>
          <SubscribeButton
            project={project.name}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          />
        </div>

        <div className="flex flex-col md:flex-row items-end gap-4 w-full md:w-auto">
          {!loading && !session.isPro() && (
            <Card
              className="w-full md:min-h-[100px] md:w-[400px] bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
              <Ads />
            </Card>
          )}
        </div>
      </div>

      <Tabs defaultValue="downloads" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="badge">Badge</TabsTrigger>
        </TabsList>

        <TabsContent value="downloads">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <StatsControls
            state={dashboardState}
            onStateChange={handleDashboardStateChange}
            isUserPro={session.isPro() ?? false}
          />
          <div className="lg:col-span-3 h-full">
            <Card className="p-6 h-full">
              {dashboardState.category === "country" && session.isPro() ? (
                <CountryDownloadsComponent 
                  view={dashboardState.viewType} 
                  project={project.name} 
                />
              ) : dashboardState.viewType === "table" ? (
                <DownloadsTable 
                  selectedVersions={dashboardState.selectedVersions.map(v => v.version)}
                  data={downloadsCache} 
                />
              ) : (
                <DownloadsChart
                  selectedVersions={dashboardState.selectedVersions.map(v => v.version)}
                  data={downloadsCache}
                />
              )}
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
      <ProDialogLinkSharing isOpen={isProDialogOpen} setIsOpen={setProDialogOpen} />
    </div>
  );
}