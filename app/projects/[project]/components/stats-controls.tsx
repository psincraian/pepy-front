"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown } from "lucide-react";
import { HelpCircle } from "lucide-react";
import { BarChart2 } from "lucide-react";
import { Table2 } from "lucide-react";
import { VersionDropdown } from "@/app/projects/[project]/components/version-dropdown";
import { Version } from "@/app/projects/[project]/components/version-dropdown";
import { DisplayStyle } from "@/app/projects/[project]/model";
import { Range } from "@/app/projects/[project]/model";
import { ProDialog } from "@/components/pro-dialog";
import { useState } from "react";
import React from "react";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { InteractiveTooltip } from "@/components/ui/interactive-tooltip";
import { Switch } from "@/components/ui/switch";
import { useParamsUrl } from "@/hooks/use-params-url";

interface StatsControlsProps {
  viewType: "chart" | "table";
  setViewType: (value: "chart" | "table") => void;
  versions: Version[];
  selectedVersions: Version[];
  setSelectedVersions: (value: Version[]) => void;
  timeRange: Range;
  setTimeRange: (value: Range) => void;
  granularity: DisplayStyle;
  setGranularity: (value: DisplayStyle) => void;
  category: "version" | "country";
  setCategory: (value: "version" | "country") => void;
  includeCIDownloads: boolean;
  setIncludeCIDownloads: (value: boolean) => void;
  isUserPro: boolean,
}

export function StatsControls({
                                viewType,
                                setViewType,
                                versions,
                                selectedVersions,
                                setSelectedVersions,
                                timeRange,
                                setTimeRange,
                                granularity,
                                setGranularity,
                                category,
                                setCategory,
                                includeCIDownloads,
                                setIncludeCIDownloads,
                                isUserPro
                              }: StatsControlsProps) {

  const [isProDialogOpen, setProDialogOpen] = useState(false);
  const { updateUrl } = useParamsUrl();

  function handleTimeRangeChange(range: Range) {
    if (range === Range.ONE_YEAR && !isUserPro) {
      setProDialogOpen(true);
      return;
    }

    updateUrl("timeRange", range.key);
    setTimeRange(range);
  }

  function handleCategoryChange(category: "version" | "country") {
    if (category === "country" && !isUserPro) {
      setProDialogOpen(true);
      return;
    }

    updateUrl("category", category);
    setCategory(category);
  }

  function handleCIDownloadsFilterChange(value: boolean) {
    if (!isUserPro) {
      setProDialogOpen(true);
      return;
    }

    updateUrl("includeCIDownloads", value);
    setIncludeCIDownloads(value);
  }

  function handleGranularity(granularity: DisplayStyle) {
    updateUrl("granularity", granularity.key);
    setGranularity(granularity);
  }

  function handleVersionChange(versions: Version[]) {
    updateUrl("versions", versions.map(v => v.version));
    setSelectedVersions(versions);
  }

  function handleViewType(viewType: "chart" | "table") {
    updateUrl("viewType", viewType);
    setViewType(viewType);
  }

  return (
    <Card className="p-6 overflow-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="version">By Version</SelectItem>
              <SelectItem value="country" className="flex items-center">
                <div className="flex flex-row items-center">
                  By Country
                  <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>View Type</Label>
          <ToggleGroup type="single" value={viewType} onValueChange={handleViewType} className="justify-start">
            <ToggleGroupItem value="chart" aria-label="Chart view">
              <BarChart2 className="h-4 w-4 mr-2" />
              Chart
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <Table2 className="h-4 w-4 mr-2" />
              Table
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Separator */}
        <Separator className="my-4" />


        {category === "version" && (
          <div className="space-y-6">

            <div className="space-y-2">
              <Label>Time Range</Label>
              <Select value={timeRange.key}
                      onValueChange={(v) => handleTimeRangeChange(Range.fromKey(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Range.THREE_MONTHS.key}>3 months</SelectItem>
                  <SelectItem value={Range.ONE_YEAR.key}>
                    <div className="flex flex-row items-center">
                      <span>12 months</span>
                      <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Granularity</Label>
              <Select value={granularity.key} onValueChange={(v: string) => {
                handleGranularity(DisplayStyle.fromKey(v));
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DisplayStyle.DAILY.key}>Daily</SelectItem>
                  <SelectItem value={DisplayStyle.WEEKLY.key}>Weekly</SelectItem>
                  <SelectItem value={DisplayStyle.MONTHLY.key}>Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex flex-row">
                <Label>Include CI Downloads</Label>
                <Crown className="ml-2 h-4 w-4 text-yellow-500" />
              </div>
              <Switch checked={includeCIDownloads} onCheckedChange={handleCIDownloadsFilterChange} />
            </div>

            <div className="space-y-2">
              <div className="flex flex-row items-center">
                <Label>Package Version</Label>
                <InteractiveTooltip content={
                  <>
                    <p>Type exact version or use patterns (e.g., 2.* or 1.2.*)</p>
                    <p>Press Enter to add</p>
                  </>
                }>
                  <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground" />
                </InteractiveTooltip>
              </div>
              <VersionDropdown versions={versions} maxSelections={5} initialVersions={selectedVersions}
                               onSelectVersions={handleVersionChange} />
            </div>
          </div>)}

      </div>
      <ProDialog isOpen={isProDialogOpen} setIsOpen={setProDialogOpen} />
    </Card>
  );
}