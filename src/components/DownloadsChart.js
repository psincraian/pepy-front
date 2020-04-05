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

function formatDownloads(downloads) {
  var precision = 1;
  if (downloads % 10 === 0) {
    precision = 0;
  }
  if (downloads < 1000) {
    return downloads;
  } else if (downloads < 1000000) {
    return (downloads / 1000).toFixed(precision) + 'K';
  } else if (downloads < 1000000000) {
    return (downloads / 1000000).toFixed(precision) + 'M';
  }

  return (downloads / 1000000000).toFixed(precision) + 'G';
}

class DownloadsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    const { classes } = this.props;

    var colors =  ["#ffa600", "#50d467", "#54b0f2", "#f95d6a", "#2f4b7c"];

    const lines = this.props.selectedVersions.map((version) => {
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
        <LineChart data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            width={40}
            tickFormatter={(tick) => {
              return formatDownloads(tick);
            }}
          />
          <Tooltip
            formatter={(downloads) => {
              return formatDownloads(downloads);
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
