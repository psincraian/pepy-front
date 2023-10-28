import { DisplayStyle, DownloadData } from "@/app/projects/[project]/model";
import {
  DownloadsResponse,
  retrieveDownloads,
  retrieveTotalDownloadsSince,
} from "@/app/projects/[project]/helper/compute_downloads"; // Replace with your actual module path
import { expect } from "@jest/globals";

describe("Download methods", () => {
  describe("retrieveTotalDownloadsSince", () => {
    it("should handle an empty download object", () => {
      const downloads: DownloadData = {};
      const since = new Date("2023-09-10");
      const result = retrieveTotalDownloadsSince(downloads, since);
      expect(result).toBe(0);
    });

    it("should retrieve total downloads since a given date", () => {
      const downloads: DownloadData = {
        "2023-09-10": { "v1.0": 10 },
        "2023-09-11": { "v1.0": 10, "v1.1": 5 },
        "2023-09-12": { "v1.0": 10 },
      };
      const since = new Date("2023-09-11");
      const result = retrieveTotalDownloadsSince(downloads, since);
      expect(result).toBe(25);
    });

    it("should return 0 when no downloads since the given date", () => {
      const downloads: DownloadData = {
        "2023-09-10": { "v1.0": 10 },
      };
      const since = new Date("2023-09-11");
      const result = retrieveTotalDownloadsSince(downloads, since);
      expect(result).toBe(0);
    });
  });

  describe("retrieveDownloads", () => {
    it("should handle an empty download object", () => {
      const downloads: DownloadData = {};
      const selectedVersions = ["v1.0"];
      const displayStyle = DisplayStyle.DAILY;
      const result = retrieveDownloads(
        downloads,
        selectedVersions,
        displayStyle,
      );
      expect(result).toStrictEqual([]);
    });

    it("should handle empty selected versions", () => {
      const downloads: DownloadData = {
        "2023-09-10": { "v1.0": 10 },
      };
      const selectedVersions: string[] = [];
      const displayStyle = DisplayStyle.DAILY;
      const result = retrieveDownloads(
        downloads,
        selectedVersions,
        displayStyle,
      );
      expect(result).toStrictEqual([{ date: "2023-09-10", total: 10, sum: 0 }]);
    });

    it("should return data based on selectedVersions and displayStyle (DAILY)", () => {
      const downloads: DownloadData = {
        "2023-09-10": { "v1.0": 10, "v1.1": 5 },
        "2023-09-11": { "v1.0": 15, "v1.1": 7, "v2.0": 10 },
      };
      const selectedVersions = ["v1.0", "v1.1"];
      const displayStyle = DisplayStyle.DAILY;
      const result = retrieveDownloads(
        downloads,
        selectedVersions,
        displayStyle,
      );
      expect(result).toStrictEqual([
        { date: "2023-09-10", total: 15, sum: 15, "v1.0": 10, "v1.1": 5 },
        { date: "2023-09-11", total: 32, sum: 22, "v1.0": 15, "v1.1": 7 },
      ]);
    });

    it("should return data based on selectedVersions and displayStyle (WEEKLY)", () => {
      const downloads: DownloadData = {
        "2023-09-10": { "v1.0": 10, "v1.1": 5 }, // Sunday
        "2023-09-11": { "v1.0": 15, "v1.1": 7 }, // Monday (Next week)
        "2023-09-12": { "v1.0": 5, "v1.1": 3 }, // Tuesday (Next week)
      };
      const selectedVersions = ["v1.0", "v1.1"];
      const displayStyle = DisplayStyle.WEEKLY;
      const result = retrieveDownloads(
        downloads,
        selectedVersions,
        displayStyle,
      );

      // Assuming weeks start from Monday and end on Sunday
      // The first week has only '2023-09-10' -> sum = 15, total = 15
      // The second week has '2023-09-11' and '2023-09-12' -> sum = 30, total = 30
      expect(result).toStrictEqual([
        { date: "2023-09-10", total: 15, sum: 15, "v1.0": 10, "v1.1": 5 },
        { date: "2023-09-11", total: 30, sum: 30, "v1.0": 20, "v1.1": 10 },
      ]);
    });
  });
});
