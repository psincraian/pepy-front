"use client"
import React, {useState} from 'react';
import DownloadsChart from "@/app/components/downloads_chart";
import {DisplayStyle, DownloadData} from "@/app/components/model";
import VersionSearchBox from "@/app/components/version_search_box";
import {defaultSelectedVersions} from "@/app/helper/versions_helper";
import {retrieveDownloads} from "@/app/helper/compute_downloads";

interface DownloadsChartProps {
    versions: string[];
    data: DownloadData;
}

const DownloadsComponent: React.FC<DownloadsChartProps> = (props) => {

    const [selectedVersions, setSelectedVersions] = useState(defaultSelectedVersions(props.versions.reverse()));
    const versions = props.versions.map((version) => ({title: version, value: version}));
    const mappedSelectedVersions = selectedVersions.map((version) => ({title: version, value: version}));
    const downloads = retrieveDownloads(props.data, selectedVersions, DisplayStyle.DAILY);
    return (
        <>
            <VersionSearchBox versions={versions} selectedVersions={mappedSelectedVersions} downloads={downloads}
                              onChange={setSelectedVersions}/>
            <DownloadsChart selectedVersions={selectedVersions} data={props.data}/>
        </>
    )
}

export default DownloadsComponent;