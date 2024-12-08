"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BadgeConfiguratorProps {
  packageName: string;
}

export function BadgeConfigurator({ packageName }: BadgeConfiguratorProps) {
  const [period, setPeriod] = useState<"monthly" | "weekly" | "total">("total");
  const [format, setFormat] = useState("markdown");

  const getBadgeUrl = () => {
    var periodUrl = "";
    if (period === "weekly") {
      periodUrl = "/week";
    } else if (period === "monthly") {
      periodUrl = "/month";
    }
    return `https://static.pepy.tech/badge/${packageName}${periodUrl}`;
  };

  const getMarkdown = () => {
    return `[![PyPI Downloads](${getBadgeUrl()})](https://pepy.tech/projects/${packageName})`;
  };

  const getHtml = () => {
    return `<a href="https://pepy.tech/projects/${packageName}"><img src="${getBadgeUrl()}" alt="PyPI Downloads"></a>`;
  };

  const getBadgeCode = () => {
    switch (format) {
      case "markdown":
        return getMarkdown();
      case "html":
        return getHtml();
      case "url":
        return getBadgeUrl();
      default:
        return "";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getBadgeCode());
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Badge Configuration</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Customize your download badge and add it to your README or website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Period</Label>
              <Select value={period} onValueChange={(v: "weekly" | "monthly" | "total") => setPeriod(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="total">Total</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Tabs value={format} onValueChange={setFormat}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <img src={getBadgeUrl()} alt="Badge Preview" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Code</Label>
              <div className="relative">
                <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto">
                  <code>{getBadgeCode()}</code>
                </pre>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}