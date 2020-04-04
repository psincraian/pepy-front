import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  chart: {
    marginTop: theme.spacing(2),
  },
});

class DownloadsChart extends Component {
  render() {
    const { classes } = this.props;

    var colors = [
      '#003f5c',
      '#2f4b7c',
      '#665191',
      '#a05195',
      '#d45087',
      '#f95d6a',
      '#ff7c43',
      '#ffa600',
    ];

    const lines = this.props.selectedVersions.map((version) => {
      return (
        <Line
          key={version}
          type="monotone"
          dataKey={version}
          stroke={colors.pop()}
          activeDot={{ r: 8 }}
        />
      );
    });

    return (
      <ResponsiveContainer
        className={classes.chart}
        width="100%"
        aspect={2}
        minHeight={150}
      >
        <LineChart data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
          />
          <Tooltip
            formatter={(downloads) => {
              return downloads.toLocaleString();
            }}
          />
          <Legend />

          {lines}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default withStyles(styles)(DownloadsChart);
