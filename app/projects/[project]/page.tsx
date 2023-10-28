import {
  DownloadData,
  Project,
  VersionDownloads,
} from "@/app/projects/[project]/model";
import DownloadsComponent from "@/app/projects/[project]/components/downloads_component";
import React, { Suspense } from "react";
import AppBar from "@/app/components/app_bar";
import ProjectSummary from "@/app/projects/[project]/components/project_summary";
import { retrieveTotalDownloadsSince } from "@/app/projects/[project]/helper/compute_downloads";
import { Grid, Typography } from "@mui/material";
import Ads from "@/app/projects/[project]/components/ads";
import BadgesComponent from "@/app/projects/[project]/components/badge_component";
import { notFound } from "next/navigation";
import { PEPY_HOST } from "@/app/constants";

export const runtime = "edge";

async function getData(project: string): Promise<Project> {
  console.log("Fetching data for", project);
  const res = await fetch(PEPY_HOST + `/api/v2/projects/${project}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) {
    console.log("Response", await res.json());
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

  return {
    name: response.id,
    totalDownloads: response.total_downloads,
    downloads: downloadData,
    versions: response.versions,
  };
}

export default async function Page({
  params,
}: {
  params: { project: string };
}) {
  const project = await getData(params.project);
  console.log("Project", project);
  const totalDownloads30Days = retrieveTotalDownloadsSince(
    project.downloads,
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  );
  const totalDownloads7Days = retrieveTotalDownloadsSince(
    project.downloads,
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  );

  return (
    <>
      <AppBar />
      <main>
        <Grid container rowSpacing={4} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              {project.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Suspense fallback={"Loading project data..."}>
              <ProjectSummary
                name={project.name}
                totalDownloads={project.totalDownloads}
                totalDownloads30Days={totalDownloads30Days}
                totalDownloads7Days={totalDownloads7Days}
              />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={4}>
            <BadgesComponent project={params.project} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Ads />
          </Grid>
          <Grid item xs={12}>
            <DownloadsComponent
              versions={project.versions}
              data={project.downloads}
            />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
