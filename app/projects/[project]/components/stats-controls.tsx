"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown } from "lucide-react";
import { VersionDropdown } from "@/app/projects/[project]/components/version-dropdown";
import { Version } from "@/app/projects/[project]/components/version-dropdown";
import { DisplayStyle } from "@/app/projects/[project]/model";
import { Range } from "@/app/projects/[project]/model";
import { ProDialog } from "@/components/ProDialog";
import { useState } from "react";

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
  category: string;
  setCategory: (value: string) => void;
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
                                isUserPro
                              }: StatsControlsProps) {

  const [isProDialogOpen, setProDialogOpen] = useState(false);

  function handleTimeRangeChange(range: Range) {
    if (range === Range.ONE_YEAR && !isUserPro) {
      setProDialogOpen(true);
      return;
    }

    setTimeRange(range);
  }

  function handleCategoryChange(category: string) {
    if (category === "country" && !isUserPro) {
      setProDialogOpen(true);
      return;
    }

    setCategory(category);
  }

  return (
    <Card className="p-6 h-full min-h-200 overflow-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Time Range</Label>
          <Select value={Range[timeRange]} onValueChange={(v) => handleTimeRangeChange(Range[v as keyof typeof Range])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Range[Range.FOUR_MONTHS]}>4 months</SelectItem>
              <SelectItem value={Range[Range.ONE_YEAR]}>
                <div className="flex flex-row items-center">
                  <span>12 months</span>
                  <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>View Type</Label>
          <RadioGroup value={viewType} onValueChange={(value: "chart" | "table") => setViewType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="chart" id="chart" />
              <Label htmlFor="chart">Chart</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="table" id="table" />
              <Label htmlFor="table">Table</Label>
            </div>
          </RadioGroup>
        </div>

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
          <Label>Time Granularity</Label>
          <Select value={DisplayStyle[granularity]} onValueChange={(v: string) => {
            const granularity: DisplayStyle = DisplayStyle[v as keyof typeof DisplayStyle];
            setGranularity(granularity);
          }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DisplayStyle[DisplayStyle.DAILY]}>Daily</SelectItem>
              <SelectItem value={DisplayStyle[DisplayStyle.WEEKLY]}>Weekly</SelectItem>
              <SelectItem value={DisplayStyle[DisplayStyle.MONTHLY]}>Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Package Version</Label>
          <VersionDropdown versions={versions} maxSelections={5} initialVersions={selectedVersions}
                           onSelectVersions={setSelectedVersions} />
        </div>

      </div>
      <ProDialog isOpen={isProDialogOpen} setIsOpen={setProDialogOpen} />
    </Card>
  );
}