import { Version } from "./components/version-dropdown";

export interface VersionDownloads {
  [version: string]: number;
}

export interface DownloadData {
  [date: string]: VersionDownloads;
}

export interface CountryDownloads {
  country: string;
  downloads: number
}

export interface CountryDownloadsData {
  [date: string]: CountryDownloads[]
}

export interface Project {
  name: string;
  totalDownloads: number;
  downloads: DownloadData;
  versions: string[];
}

// Base interface for parameter values with a static factory method
export interface IParamValue {
  readonly key: string;
  readonly name: string;

  toString(): string;
}

// Abstract base class to ensure consistent implementation
export abstract class BaseParamValue implements IParamValue {
  constructor(
    public readonly key: string,
    public readonly name: string
  ) {
  }

  toString(): string {
    return this.key;
  }

  // Equality check
  equals(other: IParamValue): boolean {
    return this.key === other.key;
  }
}

// Specific parameter value classes
export class Range extends BaseParamValue {
  static readonly THREE_MONTHS = new Range("threeMonths", "Last 3 Months");
  static readonly ONE_YEAR = new Range("oneYear", "Last Year");

  // Static method to get all values
  static values(): Range[] {
    return [
      Range.THREE_MONTHS,
      Range.ONE_YEAR
    ];
  }

  // Static method to find by key
  static fromKey(key: string): Range {
    const found = this.values().find(v => v.key === key);
    if (!found) {
      throw new Error(`Invalid RangeValue key: ${key}`);
    }
    return found;
  }
}

export class DisplayStyle extends BaseParamValue {
  static readonly DAILY = new DisplayStyle("daily", "Daily View");
  static readonly WEEKLY = new DisplayStyle("weekly", "Weekly View");
  static readonly MONTHLY = new DisplayStyle("monthly", "Monthly View");

  // Static method to get all values
  static values(): DisplayStyle[] {
    return [
      DisplayStyle.DAILY,
      DisplayStyle.WEEKLY,
      DisplayStyle.MONTHLY
    ];
  }

  // Static method to find by key
  static fromKey(key: string): DisplayStyle {
    const found = this.values().find(v => v.key === key);
    if (!found) {
      throw new Error(`Invalid DisplayValue key: ${key}`);
    }
    return found;
  }
}

export interface Version {
  version: string;
  downloads: number;
}

export interface VersionPattern {
  pattern: string;
  type: "pattern";
}

export type Selection = Version | VersionPattern;


export type DashboardState = {
  packages: string[];
  category: "version" | "country";
  viewType: "chart" | "table";
  timeRange: Range;
  granularity: DisplayStyle;
  includeCIDownloads: boolean;
  versions: Version[];
  selectedVersions: Version[];
}