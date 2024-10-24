import { DownloadData, Project, VersionDownloads } from "@/app/projects/[project]/model";
import React, { Suspense } from "react";
import ProjectSummary from "@/app/projects/[project]/components/project_summary";
import { retrieveTotalDownloadsSince } from "@/app/projects/[project]/helper/compute_downloads";
import { Grid, Typography } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardActions } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import Ads from "@/app/projects/[project]/components/ads";
import BadgesComponent from "@/app/projects/[project]/components/badge_component";
import { notFound } from "next/navigation";
import { PEPY_HOST } from "@/app/constants";
import { ResolvingMetadata } from "next";
import { Metadata } from "next";
import { SubscribeButton } from "@/app/projects/[project]/components/subscribe_button";
import StatsTab from "@/app/projects/[project]/components/stats_tab";
import { Alert } from "@mui/lab";

export const runtime = "edge";

export async function generateMetadata(
  { params }: ProjectProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: params.project + " download stats",
    description: "View download stats for the " + params.project + " python package. Download stats are updated daily"
  };
}

async function getData(project: string): Promise<Project> {
  console.log("Fetching data for", project);
  const res = await fetch(PEPY_HOST + `/api/v2/projects/${project}`, {
    headers: {
      "X-Api-Key": process.env.PEPY_API_KEY!
    },
    next: { revalidate: 3600 }
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

  return {
    name: response.id,
    totalDownloads: response.total_downloads,
    downloads: downloadData,
    versions: response.versions
  };
}

type ProjectProps = {
  params: { project: string };
};
export default async function Page({
                                     params
                                   }: ProjectProps) {
  const project = await getData(params.project);
  const totalDownloads30Days = retrieveTotalDownloadsSince(
    project.downloads,
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const totalDownloads7Days = retrieveTotalDownloadsSince(
    project.downloads,
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  const shouldShowNotification = Date.now() <= Date.parse("2024-04-07 23:59");
  var notification = null;
  if (shouldShowNotification) {
    notification = (
      <Grid item xs={12}>
        <Alert severity="info">New Feature: download stats per country are available to Pro users</Alert>
      </Grid>
    );
  }

  return (
    <>
      <main>
        <Grid container rowSpacing={4} columnSpacing={2}  justifyContent="space-between">
          {notification}
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              {project.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Suspense fallback={"Loading project data..."}>
              <ProjectSummary
                name={project.name}
                totalDownloads={project.totalDownloads}
                totalDownloads30Days={totalDownloads30Days}
                totalDownloads7Days={totalDownloads7Days}
              />
            </Suspense>
          </Grid>

          <Grid item xs={12} sm={6} lg={4} >
            <Card sx={{ height: 190 }}>
              <CardHeader title={"Subscribe to " + params.project} />
              <CardContent>
                Get a monthly newsletter with download stats about this project.
              </CardContent>
              <CardActions >
                <SubscribeButton project={params.project} />
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} lg="auto">
            <Ads />
          </Grid>
          <Grid item xs={12}>
            <BadgesComponent project={params.project} />
          </Grid>


          <Grid item xs={12}>
            <StatsTab project={project} />
          </Grid>
        </Grid>
      </main>
    </>
  );
}
