"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Crown } from "lucide-react";
import { VersionDropdown } from "@/app/projects/[project]/components/version-dropdown";
import { Version } from "@/app/projects/[project]/components/version-dropdown";
import { DisplayStyle } from "@/app/projects/[project]/model";

interface StatsControlsProps {
  showCI: boolean;
  setShowCI: (value: boolean) => void;
  viewType: "chart" | "table";
  setViewType: (value: "chart" | "table") => void;
  versions: Version[];
  selectedVersions: Version[];
  setSelectedVersions: (value: Version[]) => void;
  timeRange: string;
  setTimeRange: (value: string) => void;
  granularity: DisplayStyle;
  setGranularity: (value: DisplayStyle) => void;
  category: string;
  setCategory: (value: string) => void;
}

export function StatsControls({
                                showCI,
                                setShowCI,
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
                                setCategory
                              }: StatsControlsProps) {
  return (
    <Card className="p-6 h-full min-h-200 overflow-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Time Range</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="4m" className="flex items-center">
                4 months
                <Crown className="ml-2 h-4 w-4 text-yellow-500" />
              </SelectItem>
              <SelectItem value="12m" className="flex items-center">
                12 months
                <Crown className="ml-2 h-4 w-4 text-yellow-500" />
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
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="version">By Version</SelectItem>
              <SelectItem value="country" className="flex items-center">
                By Country
                <Crown className="ml-2 h-4 w-4 text-yellow-500" />
              </SelectItem>
              <SelectItem value="python" className="flex items-center">
                By Python Version
                <Crown className="ml-2 h-4 w-4 text-yellow-500" />
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Package Version</Label>
          <VersionDropdown versions={versions} maxSelections={5} initialVersions={selectedVersions}
                           onSelectVersions={setSelectedVersions} />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="ci-mode" className="flex items-center gap-2">
            Include CI Downloads
            <Crown className="h-4 w-4 text-yellow-500" />
          </Label>
          <Switch
            id="ci-mode"
            checked={showCI}
            onCheckedChange={setShowCI}
            disabled={true}
          />
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
      </div>
    </Card>
  );
}