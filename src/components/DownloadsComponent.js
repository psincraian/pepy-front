import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  withStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DownloadsChart from './DownloadsChart';
import DownloadsTable from './DownloadsTable';

const styles = (theme) => ({
  downloadsTable: {
    marginTop: theme.spacing(4),
  },
});

class DownloadsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedVersions: this.defaultSelectedVersions(),
    };
  }

  defaultSelectedVersions() {
    const versionsSize = this.props.data.versions.length;
    return this.props.data.versions.slice(versionsSize - 3, versionsSize);
  }

  retrieveDownloads(downloads, selectedVersions) {
    var data = [];
    Object.keys(downloads).forEach((date) => {
      var row = { date: date };
      row['total'] = Object.values(downloads[date]).reduce(
        (carry, x) => carry + x
      );
      row['sum'] = 0;
      selectedVersions.forEach((version) => {
        if (version in downloads[date]) {
          row[version] = downloads[date][version];
          row['sum'] += downloads[date][version];
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

  render() {
    const { classes } = this.props;
    const downloads = this.retrieveDownloads(
      this.props.data.downloads,
      this.state.selectedVersions
    );

    return (
      <Card data-cy="downloads">
        <CardHeader title="Downloads" />
        <CardContent>
          <>
            <Autocomplete
              multiple
              options={this.props.data.versions}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              onChange={this.updateSelectedVersions}
              value={this.state.selectedVersions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select versions"
                  placeholder="Versions"
                />
              )}
            />
            <DownloadsChart
              data={downloads}
              selectedVersions={this.state.selectedVersions}
            />
            <div className={classes.downloadsTable}>
              <DownloadsTable
                data={downloads}
                selectedVersions={this.state.selectedVersions}
              />
            </div>
          </>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(DownloadsComponent);
