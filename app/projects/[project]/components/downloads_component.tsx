"use client";
import React, { useState } from "react";
import DownloadsChart from "@/app/projects/[project]/components/downloads_chart";
import { DisplayStyle, DownloadData } from "@/app/projects/[project]/model";
import VersionSearchBox from "@/app/projects/[project]/components/version_search_box";
import { defaultSelectedVersions } from "@/app/projects/[project]/helper/versions_helper";
import { retrieveDownloads } from "@/app/projects/[project]/helper/compute_downloads";
import styles from "./downloads_component.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DownloadsTable from "@/app/projects/[project]/components/downloads_table";
import { DisplayStyleToggle } from "@/app/projects/[project]/components/display_style_toggle";
import { Grid } from "@mui/material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Project } from "@/app/projects/[project]/model";
import { PEPY_HOST } from "@/app/constants";
import { notFound } from "next/navigation";
import { VersionDownloads } from "@/app/projects/[project]/model";
import { useEffect } from "react";
import { DownloadsResponse } from "@/app/projects/[project]/helper/compute_downloads";
import { Range } from "@/app/projects/[project]/model";
import { RangeToggle } from "@/app/projects/[project]/components/range_toggle";

interface DownloadsChartProps {
  versions: string[];
  data: DownloadData;
}

const updateSelectedVersions = (
  router: AppRouterInstance,
  pathname: string,
  setSelectedVersions: React.Dispatch<React.SetStateAction<string[]>>,
  versions: string[],
) => {
  router.push(pathname + "?versions=" + versions.join("&versions="), {
    scroll: false,
  });
  setSelectedVersions(versions);
};

async function getData(project: string): Promise<DownloadData> {
  console.log("Fetching data for", project);
  const res = await fetch( `/api/v3/pro/projects/${project}/downloads`, {
    headers: {
      'X-Api-Key': process.env.PEPY_API_KEY!,
    },
    next: { revalidate: 3600 },
  });
  if (res.status === 404) {
    notFound();
  } else if (res.status !== 200) {
    throw new Error(`Server error: ${res.status}`);
  }

  const downloadData: DownloadData = {};
  let response = await res.json();
  for (const [date, downloads] of Object.entries(response.downloads)) {
    const verionDownloads: VersionDownloads = {};
    for (const [version, count] of Object.entries(downloads!)) {
      verionDownloads[version] = count;
    }

    downloadData[date] = verionDownloads;
  }

  return downloadData;
}

const DownloadsComponent: React.FC<DownloadsChartProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userVersions = searchParams.has("versions")
    ? searchParams.getAll("versions")
    : undefined;

  const [downloads, setDownloads] = useState<DownloadsResponse[]>([])



  const [selectedVersions, setSelectedVersions] = useState(
    userVersions ?? defaultSelectedVersions(props.versions),
  );
  const [displayStyle, setDisplayStyle] = useState(DisplayStyle.WEEKLY);
  const [range, setRange] = useState(Range.FOUR_MONTHS);

  useEffect(() => {
    getData("requests").then(data => {
      const response = retrieveDownloads(data, selectedVersions, displayStyle);
      setDownloads(response)
    });
  }, [selectedVersions, displayStyle, range])

  const versions = props.versions.map((version) => ({
    title: version,
    value: version,
  }));
  const mappedSelectedVersions = selectedVersions.map((version) => ({
    title: version,
    value: version,
  }));

  return (
    <div className={styles.root}>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12} sm>
          <VersionSearchBox
            versions={versions}
            selectedVersions={mappedSelectedVersions}
            downloads={downloads}
            onChange={(versions) =>
              updateSelectedVersions(
                router,
                pathname,
                setSelectedVersions,
                versions,
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm="auto">
          <RangeToggle
            selected={range}
            handleChange={setRange}
          />
        </Grid>
        <Grid item xs={12} sm="auto">
          <DisplayStyleToggle
            selected={displayStyle}
            handleChange={setDisplayStyle}
          />
        </Grid>
      </Grid>
      <DownloadsChart selectedVersions={selectedVersions} data={downloads} />
      <DownloadsTable selectedVersions={selectedVersions} data={downloads} />
    </div>
  );
};

export default DownloadsComponent;
