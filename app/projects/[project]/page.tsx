import {DownloadData, Project, VersionDownloads} from "@/app/components/model";
import DownloadsComponent from "@/app/components/downloads_component";
import React, {Suspense} from "react";
import SearchAppBar from "@/app/components/search_app_bar";
import ProjectSummary from "@/app/components/project_summary";
import {retrieveTotalDownloadsSince} from "@/app/helper/compute_downloads";
import {Grid} from "@mui/material";
import Ads from "@/app/components/ads";

export const runtime = 'edge';

async function getData(project: string): Promise<Project> {
    const res = await fetch(`https://api.pepy.tech/api/v2/projects/${project}`, {next: {revalidate: 3600}})
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const downloadData: DownloadData = {};
    let response = await res.json();
    for (const [date, downloads] of Object.entries(response.downloads)) {
        const verionDownloads: VersionDownloads = {}
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

export default async function Page({params}: { params: { project: string } }) {
    const project = await getData(params.project);
    const totalDownloads30Days = retrieveTotalDownloadsSince(project.downloads, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const totalDownloads7Days = retrieveTotalDownloadsSince(project.downloads, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

    return (
        <>
            <SearchAppBar/>
            <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                    <h1>{params.project}</h1>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Suspense fallback={"Loading project data..."}>
                        <ProjectSummary name={params.project}
                                        totalDownloads={project.totalDownloads}
                                        totalDownloads30Days={totalDownloads30Days}
                                        totalDownloads7Days={totalDownloads7Days}/>
                    </Suspense>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Ads/>
                </Grid>
                <Grid item xs={12}>
                    <Suspense fallback={"Loading downloads..."}>
                        <DownloadsComponent versions={project.versions} data={project.downloads}/>
                    </Suspense>
                </Grid>
            </Grid>
        </>
    )
};
