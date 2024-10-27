import * as d3 from "d3";
import { GeoGeometryObjects } from "d3";
import { GeoPermissibleObjects } from "d3";
import { WORLD } from "@/app/projects/[project]/components/world";
import { useState } from "react";
import { useRef } from "react";
import { useDimensions } from "@/components/useDimension";
import { Tooltip } from "@/app/projects/[project]/components/tooltip";

interface CountryDownloadsChart {
  data: { [country: string]: number };
}

interface TooltipData {
  x: number;
  y: number;
  title: string;
  visible: boolean;
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


export default function CountryDownloadsChart(props: CountryDownloadsChart) {
  const [mouseOverCountry, setMouseOverCountry] = useState<string>("null");
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0, title: "", visible: false } as TooltipData);
  const chartRef = useRef(null);
  const { width, height } = useDimensions(chartRef);
  const downloadData = props.data;
  const totalDownloads = Object.values(downloadData).reduce((acc, curr) => acc + curr, 0);
  const maxDownloads = Math.max(...Object.values(downloadData));


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