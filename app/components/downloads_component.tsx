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

    const [selectedVersions, setSelectedVersions] = useState(props.versions.slice(0, 3));
    const versions = props.versions.map((version) => ({title: version, value: version}));
    const mappedSelectedVersions = selectedVersions.map((version) => ({title: version, value: version}));


    return (
        <>
            <VersionSearchBox versions={versions} selectedVersions={mappedSelectedVersions} downloads={props.data}
                              onChange={setSelectedVersions}/>
            <DownloadsChart selectedVersions={selectedVersions} data={props.data}/>
        </>
    )
}

export default DownloadsComponent;