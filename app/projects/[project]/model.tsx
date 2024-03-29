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

export interface OptionType {
  title: string;
  value: string;
}

export enum DisplayStyle {
  DAILY,
  WEEKLY,
  MONTHLY,
}

export enum Range {
  FOUR_MONTHS,
  ONE_YEAR,
}
