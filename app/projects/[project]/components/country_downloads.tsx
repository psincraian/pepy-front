import * as d3 from "d3";
import { GeoGeometryObjects } from "d3";
import { GeoPermissibleObjects } from "d3";
import { WORLD } from "@/app/projects/[project]/components/world";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDimensions } from "@/components/useDimension";
import { Tooltip } from "@/app/projects/[project]/components/tooltip";
import { notFound } from "next/navigation";
import { CountryDownloadsData } from "@/app/projects/[project]/model";

interface CountryDownloadsProps {
  project: string,
}

interface TooltipData {
  x: number;
  y: number;
  title: string;
  visible: boolean;
}

async function getCountryDownloadsData(project: string): Promise<CountryDownloadsData> {
  console.log("Fetching data for", project);
  const res = await fetch( `/api/v3/pro/projects/${project}/country-downloads`, {
    headers: {
      'X-Api-Key': process.env.PEPY_API_KEY!,
    },
    next: { revalidate: 3600 },
  });
  if (res.status === 404) {
    notFound();
  } else if (res.status !== 200) {
    throw new Error(`Server error: ${res.status}`);
  }

  const downloadData: CountryDownloadsData = {};
  let response = await res.json();
  for (const [date, countryDownloads] of Object.entries(response.downloads)) {
    downloadData[date] = []
    for (const {country, downloads} of Object.values(countryDownloads!)) {
      downloadData[date].push({country: country, downloads: downloads})
    }
  }

  return downloadData;
}

function getDownloadsPerCountry(downloads: CountryDownloadsData): {[country: string] : number} {
  const downloadsPerCountry : {[country: string] : number} = {};
  for (const countryDownloads of Object.values(downloads)) {
    for (const { country, downloads } of countryDownloads) {
      downloadsPerCountry[country] = downloadsPerCountry[country] ? downloadsPerCountry[country] + downloads : downloads;
    }
  }
  console.log(downloadsPerCountry);
  return downloadsPerCountry;
}

function calculatePercentiles(data: number[], numBuckets: number): number[] {
  // Sort the data in ascending order
  const sortedData = data.slice().sort((a, b) => a - b);

  // Calculate the number of elements in each bucket
  const bucketSize = Math.ceil(sortedData.length / numBuckets);

  // Initialize an array to store the percentiles
  const percentiles: number[] = [];

  // Iterate through each bucket
  for (let i = 1; i < numBuckets; i++) {
    // Calculate the index corresponding to the boundary of the current bucket
    const index = Math.ceil(i * bucketSize) - 1;

    // Add the value at the index to the percentiles array
    percentiles.push(sortedData[index]);
  }

  // Add the maximum value to the percentiles array
  percentiles.push(sortedData[sortedData.length - 1]);

  return percentiles;
}


export default function CountryDownloadsComponent(props: CountryDownloadsProps) {
  const [mouseOverCountry, setMouseOverCountry] = useState<string>("null");
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0, title: "", visible: false } as TooltipData);
  const chartRef = useRef(null);
  const { width, height } = useDimensions(chartRef);
  const [downloadData, setDownloadData] = useState<{[country: string] : number}>({ });
  const totalDownloads = Object.values(downloadData).reduce((acc, curr) => acc + curr, 0);
  const maxDownloads = Math.max(...Object.values(downloadData));

  useEffect(() => {
    getCountryDownloadsData(props.project).then((data) => {
      setDownloadData(getDownloadsPerCountry(data));
    });
  }, [props.project]);


  const domain = calculatePercentiles(Object.values(downloadData), 6);
  domain.push(maxDownloads)
  var colorScale = d3
    .scaleThreshold<number, string>()
    .domain(domain)
    .range(d3.schemeBlues[7]);

  const svgHeight = width / 2;
  const projection = d3
    .geoEqualEarth()
    .fitSize([width, svgHeight], WORLD as GeoGeometryObjects);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = WORLD.features
    .filter((shape) => shape.id !== "ATA")
    .map((shape) => {
      var countryDownloads = 0;
      if (shape.id in downloadData) {
        countryDownloads = downloadData[shape.id];
      }

      //console.log(shape.id, countryDownloads)
      var color = colorScale(countryDownloads);
      var opacity = mouseOverCountry === shape.id ? 0.7 : 1;

      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape as GeoPermissibleObjects) as string}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill={color}
          fillOpacity={opacity}
          onMouseOver={() => setMouseOverCountry(shape.id)}
          onClick={(event) => {
            const percentOfDownloads = countryDownloads / totalDownloads * 100;
            const tooltipTitle = `${shape.properties.name}: ${percentOfDownloads.toFixed(2)}%`;
            setTooltipData({ x: event.pageX, y: event.pageY - 35, visible: true, title: tooltipTitle});
            setMouseOverCountry(shape.id);
          }
          }
          onMouseLeave={() => {
            setMouseOverCountry("null");
          }}
        />
      );
    });

  return (
    <div ref={chartRef} onMouseLeave={() => {
      setTooltipData({ ...tooltipData, visible: false });
    }}>
      <Tooltip x={tooltipData.x} y={tooltipData.y} text={tooltipData.title} showTooltip={tooltipData.visible} />
      <svg width={width} height={svgHeight}>
        {allSvgPaths}
      </svg>
    </div>
  );
}