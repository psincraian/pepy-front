"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDownloads } from "@/app/projects/[project]/helper/number_format";
import { getDownloadColor } from "@/app/projects/[project]/helper/downloads-color";

export interface Version {
  version: string;
  downloads: number;
}

interface VersionPattern {
  pattern: string;
  type: "pattern";
}

interface VersionDropdownProps {
  versions: Version[];
  initialVersions: Version[];
  maxSelections?: number;
  onSelectVersions: (versions: Version[]) => void;
}

type Selection = Version | VersionPattern;

function matchesPattern(version: string, pattern: string): boolean {
  if (!pattern.includes("*")) return version === pattern;
  const regex = new RegExp(
    "^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$"
  );
  return regex.test(version);
}

function isVersionPattern(selection: Selection): selection is VersionPattern {
  return "type" in selection && selection.type === "pattern";
}

function VersionDropdownChip(props: {
  color: string,
  selection: Selection,
  onKeyDown: (e: any) => void,
  onMouseDown: (e: any) => void,
  onClick: () => void
}) {
  return <Badge

    variant="outline"
    className={cn(
      "flex items-center gap-1 border-0",
      props.color.replace("bg-", "bg-opacity-20 ")
    )}
  >
    <div className={cn("w-2 h-2 rounded-full", props.color)} />
    {isVersionPattern(props.selection) ? props.selection.pattern : props.selection.version}
    {!isVersionPattern(props.selection) && (
      <span className="text-xs text-muted-foreground">
                    ({formatDownloads(props.selection.downloads)})
                  </span>
    )}
    <button
      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      onKeyDown={props.onKeyDown}
      onMouseDown={props.onMouseDown}
      onClick={props.onClick}
    >
      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
    </button>
  </Badge>;
}

export function VersionDropdown({
                                  versions,
                                  initialVersions,
                                  maxSelections = 5,
                                  onSelectVersions
                                }: VersionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selections, setSelections] = useState<Selection[]>(initialVersions);

  const selectedVersions = useMemo(() => {
    const directVersions = selections.filter((s): s is Version => !isVersionPattern(s));
    const patterns = selections.filter(isVersionPattern);

    const matchedVersions = versions.filter(version =>
      patterns.some(p => matchesPattern(version.version, p.pattern))
    );

    return [...directVersions, ...matchedVersions];
  }, [selections, versions]);

  const filteredVersions = useMemo(() => {
    if (!search) return versions;
    return versions.filter(v =>
      v.version.toLowerCase().includes(search.toLowerCase())
    );
  }, [versions, search]);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredVersions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5
  });

  const addSelection = useCallback((selection: Selection) => {
    setSelections(prev => {
      if (prev.length >= maxSelections) return prev;
      if (isVersionPattern(selection)) {
        if (prev.some(s => isVersionPattern(s) && s.pattern === selection.pattern)) {
          return prev;
        }
      } else {
        if (prev.some(s => !isVersionPattern(s) && s.version === selection.version)) {
          return prev;
        }
      }
      const newSelections = [...prev, selection];
      const newPatterns = newSelections
        .filter((s) => isVersionPattern(s))
        .map(s => {
          return { version: s.pattern, downloads: 0 } as Version;
        });
      const newVersions = newSelections
        .filter((s): s is Version => !isVersionPattern(s))
        .concat(newPatterns)
      onSelectVersions(newVersions);
      return newSelections;
    });
  }, [versions, maxSelections, onSelectVersions]);

  const removeSelection = useCallback((selection: Selection) => {
    setSelections(prev => {
      const newSelections = prev.filter(s =>
        isVersionPattern(s)
          ? !isVersionPattern(selection) || s.pattern !== selection.pattern
          : isVersionPattern(selection) || s.version !== selection.version
      );
      const newPatterns = newSelections
        .filter((s) => isVersionPattern(s))
        .map(s => {
          return { version: s.pattern, downloads: 0 } as Version;
        });
      const newVersions = newSelections
        .filter((s): s is Version => !isVersionPattern(s))
        .concat(newPatterns)
      onSelectVersions(newVersions);
      return newSelections;
    });
  }, [versions, onSelectVersions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim()) {
      e.preventDefault();
      if (search.includes("*")) {
        addSelection({ pattern: search.trim(), type: "pattern" });
      } else {
        const exactVersion = versions.find(v => v.version === search.trim());
        if (exactVersion) {
          addSelection(exactVersion);
        }
      }
      setSearch("");
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring pr-16"
            placeholder="Type version or pattern"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={() => setIsOpen(true)}
          />
          <div className="absolute right-1 flex items-center gap-1">

          <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronUp className="h-4 w-4 opacity-50" /> : <ChevronDown className="h-4 w-4 opacity-50" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {selections.map((selection) => {
            const color = isVersionPattern(selection)
              ? "bg-blue-500"
              : getDownloadColor(selection.downloads);

            return (
              <VersionDropdownChip key={isVersionPattern(selection) ? selection.pattern : selection.version}
                                   color={color} selection={selection}
                                   onKeyDown={(e) => {
                                     if (e.key === "Enter") removeSelection(selection);
                                   }}
                                   onMouseDown={(e) => {
                                     e.preventDefault();
                                     e.stopPropagation();
                                   }}
                                   onClick={() => removeSelection(selection)} />
            );
          })}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute w-full z-50 mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <div
            ref={parentRef}
            className="relative max-h-[300px] overflow-auto"
            style={{
              height: `${Math.min(300, filteredVersions.length * 40)}px`
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative"
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const version = filteredVersions[virtualRow.index];
                const isSelected = selectedVersions.some(
                  v => v.version === version.version
                );
                const color = getDownloadColor(version.downloads);
                return (
                  <div
                    key={virtualRow.index}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    className={cn(
                      "absolute top-0 left-0 w-full",
                      "flex items-center px-3 py-2 cursor-pointer",
                      isSelected ? "bg-accent" : "hover:bg-muted"
                    )}
                    style={{
                      transform: `translateY(${virtualRow.start}px)`
                    }}
                    onClick={() => addSelection(version)}
                  >
                    <div className={cn("w-2 h-2 rounded-full mr-3", color)} />
                    <span className="flex-1">{version.version}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDownloads(version.downloads)}
                    </span>
                    {isSelected && (
                      <Check className="h-4 w-4 ml-2 text-primary" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}