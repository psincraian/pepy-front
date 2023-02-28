import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { withStyles } from "@mui/styles";
import { formatDownloads } from "../shared/helpers";

const styles = (theme) => ({
  chart: {
    marginTop: theme.spacing(2),
  },
});

const DownloadsChart = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
    }
    handleWindowSizeChange();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 600;

  const { classes } = props;

  var colors = ["#ffa600", "#50d467", "#54b0f2", "#f95d6a", "#2f4b7c"];

  const lines = props.selectedVersions.map((version) => {
    return (
      <Line
        key={version}
        type="monotone"
        dataKey={version}
        stroke={colors.pop()}
        strokeWidth={2}
        activeDot={{ r: 8 }}
      />
    );
  });

  return (
    <ResponsiveContainer
      className={classes.chart}
      width="100%"
      aspect={isMobile ? 1 : 2}
    >
      <LineChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis width={40} tickFormatter={(tick) => formatDownloads(tick, 1)} />
        <Tooltip
          labelFormatter={(e) =>
            new Date(e).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          }
          formatter={(downloads) => {
            return formatDownloads(downloads);
          }}
        />
        <Legend />

        {lines}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default withStyles(styles)(DownloadsChart);
