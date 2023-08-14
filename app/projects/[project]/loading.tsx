import React from "react";
import AppBar from "@/app/components/app_bar";

export const runtime = 'edge';


export default async function Loading() {
    return (
        <>
            <AppBar/>
            <main>
                Loading...
            </main>
        </>
    )
};
