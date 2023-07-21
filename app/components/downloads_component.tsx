"use client"
import React, {useState} from 'react';
import DownloadsChart from "@/app/components/downloads_chart";
import {DownloadData} from "@/app/components/model";
import VersionSearchBox from "@/app/components/version_search_box";

interface DownloadsChartProps {
    versions: string[];
    data: DownloadData;
}

const DownloadsComponent: React.FC<DownloadsChartProps> = (props) => {

    const [selectedVersions, setSelectedVersions] = useState(props.versions.slice(1, 3));

    console.log(selectedVersions);
    return (
        <>
            <VersionSearchBox versions={props.versions} selectedVersions={selectedVersions} downloads={props.data} onChange={setSelectedVersions}/>
            <DownloadsChart selectedVersions={selectedVersions} data={props.data}/>
        </>
    )
}

export default DownloadsComponent;