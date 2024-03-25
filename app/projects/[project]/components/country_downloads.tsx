import * as d3 from "d3";
import { POPULATION } from "@/app/projects/[project]/components/population";
import { WORLD } from "@/app/projects/[project]/components/world";
import { useState } from "react";
import { useRef } from "react";
import { useDimensions } from "@/app/components/useDimension";
import { Tooltip } from "@/app/projects/[project]/components/tooltip";

interface CountryDownloadsProps {
  project: string,
}

interface TooltipData {
  x: number;
  y: number;
  title: string;
  visible: boolean;
}

export default function CountryDownloads(props: CountryDownloadsProps) {
  const [mouseOverCountry, setMouseOverCountry] = useState<string>("null");
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0, title: "", visible: false } as TooltipData);
  const chartRef = useRef(null);
  const {width, height} = useDimensions(chartRef);

  var colorScale = d3
    .scaleThreshold<number, string>()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);

  const svgHeight = width / 2;
  const projection = d3
    .geoEqualEarth()
    .fitSize([width, svgHeight], WORLD);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = WORLD.features
    .filter((shape) => shape.id !== "ATA")
    .map((shape) => {
      const regionData = POPULATION.find((region) => region.code === shape.id);

      var color = regionData ? colorScale(regionData?.pop) : "lightgrey";
      var opacity = mouseOverCountry === shape.id ? 0.7 : 1;

      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill={color}
          fillOpacity={opacity}
          onMouseEnter={(event) => {
            setTooltipData({ x: event.pageX, y: event.pageY - 35, visible: true, title: shape.properties.name });
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
    <div ref={chartRef} onMouseLeave={() => {setTooltipData({ ...tooltipData, visible: false });}}>
      <Tooltip x={tooltipData.x} y={tooltipData.y} text={tooltipData.title} showTooltip={tooltipData.visible} />
      <svg width={width} height={svgHeight} >
        {allSvgPaths}
      </svg>
    </div>
  );
}