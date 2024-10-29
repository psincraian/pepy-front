import { DisplayStyle, DownloadData, VersionDownloads } from "@/app/projects/[project]/model";
import { minimatch } from "minimatch";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

interface BaseDownloadsResponse {
  total: number;
  sum: number;
  date: string;
}

export type DownloadsResponse = BaseDownloadsResponse & {
  [key: string]: number;
};

function retrieveDayDownloads(download: VersionDownloads) {
  return Object.values(download).reduce((total, current) => total + current, 0);
}

export const retrieveTotalDownloadsSince = (
  downloads: DownloadData,
  since: Date,
): number => {
  var total = 0;
  Object.keys(downloads).forEach((date) => {
    if (new Date(date) >= since) {
      total += retrieveDayDownloads(downloads[date]);
    }
  });

  return total;
};

const aggregateData = (
  data: DownloadsResponse[],
  getDateIndex: (date: dayjs.Dayjs) => string,
  selectedVersions: string[],
): DownloadsResponse[] => {
  const aggregatedData: { [key: string]: DownloadsResponse } = {};

  data.forEach((currentDay) => {
    const dateIndex = getDateIndex(dayjs(currentDay.date));

    if (!aggregatedData[dateIndex]) {
      // @ts-ignore
      aggregatedData[dateIndex] = {
        date: currentDay.date,
        total: 0,
        sum: 0,
      };

      selectedVersions.forEach((selectedVersion) => {
        aggregatedData[dateIndex][selectedVersion] = 0;
      });
    }

    aggregatedData[dateIndex].total += currentDay.total;
    aggregatedData[dateIndex].sum += currentDay.sum;

    selectedVersions.forEach((selectedVersion) => {
      aggregatedData[dateIndex][selectedVersion] += currentDay[selectedVersion];
    });
  });

  return Object.values(aggregatedData);
};

export const retrieveDownloads = (
  downloads: DownloadData,
  selectedVersions: string[],
  displayStyle: DisplayStyle,
) => {
  const data: DownloadsResponse[] = [];

  Object.keys(downloads).forEach((date) => {
    const row: { [key: string]: number | string } = {
      total: 0,
      sum: 0,
      date: date,
    };

    selectedVersions.forEach((selectedVersion) => {
      const versionDownloads = shouldAddVersion(
        selectedVersion,
        downloads[date],
      )
        ? retrieveVersionDownloads(selectedVersion, downloads[date])
        : 0;

      row[selectedVersion] = versionDownloads;
      // @ts-ignore
      row["sum"] += versionDownloads;
    });

    row["total"] = retrieveDayDownloads(downloads[date]);
    data.push(row as DownloadsResponse);
  });

  if (displayStyle !== DisplayStyle.DAILY) {
    const getDateIndex =
      displayStyle === DisplayStyle.WEEKLY
        ? (date: dayjs.Dayjs) => date.year() + "-" + date.isoWeek()
        : (date: dayjs.Dayjs) => date.year() + "-" + date.month();

    return aggregateData(data, getDateIndex, selectedVersions);
  }

  return data;
};

export function computeTotalDownloadsByVersion(downloadData: DownloadData) {
  const totalDownloadsByVersion: VersionDownloads = {};

  for (const date in downloadData) {
    const versionDownloads = downloadData[date];

    for (const version in versionDownloads) {
      if (!totalDownloadsByVersion[version]) {
        totalDownloadsByVersion[version] = 0;
      }
      totalDownloadsByVersion[version] += versionDownloads[version];
    }
  }

  return totalDownloadsByVersion;
}

const shouldAddVersion = (
  selectedVersion: string,
  downloads: VersionDownloads,
) => {
  if (!selectedVersion.includes("*")) {
    return selectedVersion in downloads;
  }

  const versions = Object.keys(downloads);
  for (const version of versions) {
    if (minimatch(version, selectedVersion)) {
      return true;
    }
  }

  return false;
};

const retrieveVersionDownloads = (
  selectedVersion: string,
  download: VersionDownloads,
): number => {
  if (!selectedVersion.includes("*")) {
    return download[selectedVersion];
  }

  let total = 0;
  for (const [version, value] of Object.entries(download)) {
    if (minimatch(version, selectedVersion)) {
      total += value;
    }
  }
  return total;
};
