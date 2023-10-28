export interface VersionDownloads {
  [version: string]: number;
}

export interface DownloadData {
  [date: string]: VersionDownloads;
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
