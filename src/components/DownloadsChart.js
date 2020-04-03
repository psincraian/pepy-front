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
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  chart: {
    marginTop: theme.spacing(2),
  },
});

class DownloadsChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedVersions: this.defaultSelectedVersions(),
    };
  }

  retrieveDownloads(downloads, selectedVersions) {
    var data = [];
    Object.keys(downloads).forEach((date) => {
      var row = { name: date };
      selectedVersions.forEach((version) => {
        if (version in downloads[date]) {
          row[version] = downloads[date][version];
        } else {
          row[version] = 0;
        }
      });
      data.push(row);
    });
    return data;
  }

  updateSelectedVersions = (event, value, reason) => {
    this.setState({ selectedVersions: value });
  };

  defaultSelectedVersions() {
    const versionsSize = this.props.data.versions.length;
    return this.props.data.versions.slice(versionsSize - 5, versionsSize);
  }

  render() {
    const { classes } = this.props;
    const data = this.retrieveDownloads(
      this.props.data.downloads,
      this.state.selectedVersions
    );
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

    const lines = this.state.selectedVersions.map((version) => {
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
      <Card data-cy="downloads">
        <CardHeader title="Downloads" />
        <CardContent>
          <Autocomplete
            multiple
            options={this.props.data.versions}
            getOptionLabel={(option) => option}
            defaultValue={this.state.selectedVersions}
            filterSelectedOptions
            onChange={this.updateSelectedVersions}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select versions"
                placeholder="Versions"
              />
            )}
          />
          <ResponsiveContainer
            className={classes.chart}
            width="100%"
            aspect={2}
            minHeight={150}
          >
            <LineChart data={data}>
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
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(DownloadsChart);
