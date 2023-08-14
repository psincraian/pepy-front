import {DisplayStyle, DownloadData, VersionDownloads} from "@/app/components/model";
import minimatch from "minimatch";
import dayjs from "dayjs";


interface BaseDownloadsResponse {
    total: number;
    sum: number;
    date: string;
}

export type DownloadsResponse = BaseDownloadsResponse & {
    [key: string]: number;
}

function retrieveDayDownloads(download: VersionDownloads) {
    return Object.values(download).reduce((total, current) => total + current, 0);
}

export const retrieveTotalDownloadsSince = (downloads: DownloadData, since: Date): number => {
    var total = 0;
    Object.keys(downloads).forEach((date) => {
        if (new Date(date) >= since) {
            total += retrieveDayDownloads(downloads[date]);
        }
    })

    return total;
}

export const retrieveDownloads = (downloads: DownloadData, selectedVersions: string[], displayStyle: DisplayStyle) => {
    var data : DownloadsResponse[] = [];
    Object.keys(downloads).forEach((date) => {
        let row : {[key: string]: number|string} = {total: 0, sum: 0, date: date}
        let sum = 0;
        selectedVersions.forEach((selectedVersion) => {
            if (shouldAddVersion(selectedVersion, downloads[date])) {
                const versionDownloads = retrieveVersionDownloads(
                    selectedVersion,
                    downloads[date]
                );
                row[selectedVersion] = versionDownloads;
                sum += versionDownloads;
            } else {
                row[selectedVersion] = 0;
            }
        });
        row["sum"] = sum
        data.push(row as DownloadsResponse);
    });

    if (displayStyle !== DisplayStyle.DAILY) {
        let getDateIndex = displayStyle === DisplayStyle.WEEKLY ?
            (date: dayjs.Dayjs) : string => date.month() + '-' + date.day():
            (date: dayjs.Dayjs) => date.year() + '-' + date.month();

        const reducedData = data.reduce((data : {[key: string]: DownloadsResponse}, currentDay) => {
            const date = dayjs(currentDay.date);
            const dateIndex = getDateIndex(date);
            if (!data[dateIndex]) {
                data[dateIndex] = {
                    date: currentDay.date,
                    total: 0,
                    sum: 0,
                } as DownloadsResponse;
                selectedVersions.forEach((selectedVersion) => {
                    data[dateIndex][selectedVersion] = 0;
                });
            }
            data[dateIndex].total += currentDay.total;
            data[dateIndex].sum += currentDay.sum;
            selectedVersions.forEach((selectedVersion) => {
                data[dateIndex][selectedVersion] += currentDay[selectedVersion];
            });
            return data;
        }, {});
        data = Object.values(reducedData);
    }
    return data;
}

const shouldAddVersion = (selectedVersion: string, downloads: VersionDownloads) => {
    if (!selectedVersion.includes('*')) {
        return selectedVersion in downloads;
    }

    const versions = Object.keys(downloads);
    for (const version of versions) {
        if (minimatch(version, selectedVersion)) {
            return true;
        }
    }

    return false;
}

const retrieveVersionDownloads = (selectedVersion: string, download: VersionDownloads): number => {
    if (!selectedVersion.includes('*')) {
        return download[selectedVersion];
    }

    let total = 0;
    for (const [version, value] of Object.entries(download)) {
        if (minimatch(version, selectedVersion)) {
            total += value;
        }
    }
    return total;
}