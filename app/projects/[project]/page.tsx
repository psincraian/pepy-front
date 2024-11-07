import { DownloadData, Project, VersionDownloads } from "@/app/projects/[project]/model";
import React from "react";
import { notFound } from "next/navigation";
import { PEPY_HOST } from "@/app/constants";
import { ResolvingMetadata } from "next";
import { Metadata } from "next";
import { PackageStats } from "@/app/projects/[project]/components/package-stats";
import { validatePackageName } from "@/lib/validators";

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
  const validationResult = validatePackageName(project);
  if (!validationResult.isValid) {
    notFound();
  }

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

  return (
      <PackageStats project={project} />
  );
}
