"use client";

import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatDownloads } from "../helper/number_format";
import { DownloadsResponse } from "@/app/projects/[project]/helper/compute_downloads";

interface DownloadsChartProps {
  selectedVersions: string[];
  data: DownloadsResponse[];
}

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
];

const DownloadsChart: React.FC<DownloadsChartProps> = (props) => {

  // Transforming the data to fit into LineChart
  const transformedData = Object.entries(props.data).map(
    ([d, versionDownloads]) =>
      ({
        ...versionDownloads
      }) as DownloadsResponse
  );

  return (
    <div className="h-full w-full min-h-80">

      <ResponsiveContainer width="100%" minHeight="100%">
        <LineChart data={transformedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"
                 fontSize={12}
                 tick={{ fontSize: 12 }}
                 axisLine={{ stroke: "hsl(var(--border))" }}
                 tickLine={{ stroke: "hsl(var(--border))" }} />
          <YAxis
            tickFormatter={(tick) => {
              return formatDownloads(tick, 1);
            }}
            fontSize={12}
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip
            labelFormatter={(e) => {
              const d = e.split("-");
              let dateObj = new Date();
              dateObj.setFullYear(parseInt(d[0]));
              dateObj.setMonth(parseInt(d[1]) - 1);
              dateObj.setDate(parseInt(d[2]));
              dateObj.setHours(0);
              dateObj.setMinutes(0);
              dateObj.setSeconds(0);
              return dateObj.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
              });
            }}
            formatter={(downloads: number) => {
              return formatDownloads(downloads);
            }}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)"
            }}
          />
          <Legend />

          {
            props.selectedVersions.map((version, index) => {
              return (
                <Line
                  key={version}
                  type="monotone"
                  dataKey={version}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                />
              );
            })

          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DownloadsChart;
