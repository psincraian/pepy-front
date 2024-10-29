"use client";

import { useState } from "react";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { CountryDownloadsData } from "@/app/projects/[project]/model";
import CountryDownloadsTable from "@/app/projects/[project]/components/country-downloads-table";
import CountryDownloadsChart from "@/app/projects/[project]/components/country-downloads-chart";

interface CountryDownloadsProps {
  project: string,
  view: "chart" | "table";
}

async function getCountryDownloadsData(project: string): Promise<CountryDownloadsData> {
  console.log("Fetching data for", project);
  const res = await fetch(`/api/v3/pro/projects/${project}/country-downloads`, {
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

  const downloadData: CountryDownloadsData = {};
  let response = await res.json();
  for (const [date, countryDownloads] of Object.entries(response.downloads)) {
    downloadData[date] = [];
    for (const { country, downloads } of Object.values(countryDownloads!)) {
      downloadData[date].push({ country: country, downloads: downloads });
    }
  }

  return downloadData;
}

function getDownloadsPerCountry(downloads: CountryDownloadsData): { [country: string]: number } {
  const downloadsPerCountry: { [country: string]: number } = {};
  for (const countryDownloads of Object.values(downloads)) {
    for (const { country, downloads } of countryDownloads) {
      downloadsPerCountry[country] = downloadsPerCountry[country] ? downloadsPerCountry[country] + downloads : downloads;
    }
  }
  console.log(downloadsPerCountry);
  return downloadsPerCountry;
}

export default function CountryDownloadsComponent(props: CountryDownloadsProps) {
  const [downloadData, setDownloadData] = useState<{ [country: string]: number }>({});

  useEffect(() => {
    getCountryDownloadsData(props.project).then((data) => {
      setDownloadData(getDownloadsPerCountry(data));
    });
  }, [props.project]);

  return (
    <>{
      props.view == "table" ?
        <CountryDownloadsTable data={downloadData} /> :
        <CountryDownloadsChart data={downloadData} />
    }</>
  );
}