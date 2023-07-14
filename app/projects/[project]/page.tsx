import Link from "next/dist/client/link";

import type {InferGetStaticPropsType, GetStaticProps} from 'next'

type Project = {
    name: string
}

async function getData() :  Promise<Project> {
    const res = await fetch('https://api.pepy.tech/api/v2/projects/requests')
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const response = await res.json();
    return {name: response.id}
}

export default async function Page() {
    const project = await getData();

    return (
        <>
            <h1>{project.name}</h1>
            <Link href={"/projects"}>Back</Link>
        </>
    )
}
