import {DownloadData, Project, VersionDownloads} from "@/app/components/model";
import DownloadsComponent from "@/app/components/downloads_component";
import React, {Suspense} from "react";

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
        downloads: downloadData,
        versions: response.versions
    };
}

export default async function Page({params}: { params: { project: string } }) {
    const project = await getData(params.project);

    return (
        <>
            <h1>{params.project}</h1>
            <Suspense fallback={"Loading downloads..."}>
                <DownloadsComponent versions={project.versions} data={project.downloads}/>
            </Suspense>
        </>
    )
}
