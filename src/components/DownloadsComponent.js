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
import minimatch from 'minimatch';

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
      selectedVersions.forEach((selectedVersion) => {
        if (this.shouldAddVersion(selectedVersion, downloads[date])) {
          const versionDownloads = this.retrieveVersionDownloads(selectedVersion, downloads[date]);
          row[selectedVersion] = versionDownloads;
          row['sum'] += versionDownloads;
        } else {
          row[selectedVersion] = 0;
        }
      });
      data.push(row);
    });
    return data;
  }

  shouldAddVersion(selectedVersion, downloads) {
    if (!(selectedVersion.includes("*"))) {
      return selectedVersion in downloads;
    }

    const versions = Object.keys(downloads);
    for (const version of versions) {
      if (minimatch(version, selectedVersion)) {
        return true;
      }
    }

    return false;
  }

  retrieveVersionDownloads(selectedVersion, download) {
    if (!(selectedVersion.includes("*"))) {
      return download[selectedVersion];
    }

    let total = 0;
    for (const [version, value] of Object.entries(download)) {
      if (minimatch(version, selectedVersion)) {
        total += value;
      }
    }
    return total;
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
    console.log(downloads);

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
              freeSolo
              onChange={this.updateSelectedVersions}
              value={this.state.selectedVersions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select versions"
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
