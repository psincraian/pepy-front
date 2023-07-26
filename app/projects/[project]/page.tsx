import Link from "next/dist/client/link";
import {DownloadData, Project, VersionDownloads} from "@/app/components/model";
import DownloadsComponent from "@/app/components/downloads_component";

export const runtime = 'nodejs'

async function getData() :  Promise<Project> {
    const res = await fetch('https://api.pepy.tech/api/v2/projects/requests')
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

export default async function Page() {
    const project = await getData();

    return (
        <>
            <h1>{project.name}</h1>
            <Link href={"/projects"}>Back</Link>
            <DownloadsComponent versions={project.versions} data={project.downloads} />
        </>
    )
}
