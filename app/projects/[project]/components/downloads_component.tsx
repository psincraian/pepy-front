"use client";
import React, {useState} from 'react';
import DownloadsChart from "@/app/projects/[project]/components/downloads_chart";
import {DisplayStyle, DownloadData} from "@/app/projects/[project]/model";
import VersionSearchBox from "@/app/projects/[project]/components/version_search_box";
import {defaultSelectedVersions} from "@/app/projects/[project]/helper/versions_helper";
import {retrieveDownloads} from "@/app/projects/[project]/helper/compute_downloads";
import styles from "./downloads_component.module.css";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import DownloadsTable from "@/app/projects/[project]/components/downloads_table";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {DisplayStyleToggle} from "@/app/projects/[project]/components/DisplayStyleToggle";
import {Grid} from "@mui/material";


interface DownloadsChartProps {
    versions: string[];
    data: DownloadData;
}

const updateSelectedVersions = (router: AppRouterInstance, pathname: string, setSelectedVersions: React.Dispatch<React.SetStateAction<string[]>>, versions: string[]) => {
    router.push(pathname + '?versions=' + versions.join('&versions='), {scroll: false,})
    setSelectedVersions(versions);
}

const DownloadsComponent: React.FC<DownloadsChartProps> = (props) => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const userVersions = searchParams.has('versions') ? searchParams.getAll('versions') : undefined;

    const [selectedVersions, setSelectedVersions] = useState(userVersions ?? defaultSelectedVersions(props.versions));
    const [displayStyle, setDisplayStyle] = useState(DisplayStyle.DAILY);

    const versions = props.versions.map((version) => ({title: version, value: version}));
    const mappedSelectedVersions = selectedVersions.map((version) => ({title: version, value: version}));
    const downloads = retrieveDownloads(props.data, selectedVersions, displayStyle);
    return (
        <div className={styles.root}>
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs>
                    <VersionSearchBox versions={versions} selectedVersions={mappedSelectedVersions}
                                      downloads={downloads}
                                      onChange={(versions) => updateSelectedVersions(router, pathname, setSelectedVersions, versions)}/>
                </Grid>
                <Grid item>
                    <DisplayStyleToggle displayStyle={displayStyle} handleChange={setDisplayStyle}/>
                </Grid>
            </Grid>
            <DownloadsChart selectedVersions={selectedVersions} data={downloads}/>
            <DownloadsTable selectedVersions={selectedVersions} data={downloads}/>
        </div>
    )
}

export default DownloadsComponent;