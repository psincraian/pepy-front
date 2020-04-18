import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import DownloadsChart from './DownloadsChart';
import DownloadsTable from './DownloadsTable';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import minimatch from 'minimatch';

const styles = (theme) => ({
  downloadsTable: {
    marginTop: theme.spacing(4),
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

  retrieveMonthlyVersionDownloads(version) {
    let total = 0;
    for (const d of Object.keys(this.props.data.downloads)) {
      if (version in this.props.data.downloads[d]) {
        total += this.props.data.downloads[d][version];
      }
    }
    return total;
  }

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
              options={this.props.data.versions.slice().reverse()}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderOption={(option, { selected }) => (
                <>
                  <Box
                    width={16}
                    height={16}
                    borderRadius={2}
                    marginRight={2}
                    bgcolor={this.retrieveColor(
                      this.retrieveMonthlyVersionDownloads(option)
                    )}
                  />
                  <Typography>{option}</Typography>
                  <Box mx={1}><Typography color="textSecondary">-</Typography></Box>
                  <Typography color="textSecondary">
                    {formatDownloads(this.retrieveMonthlyVersionDownloads(option)) + '/month'}
                  </Typography>
                </>
              )}
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

  retrieveColor(downloads) {
    let color = '#FFF';
    if (downloads < 1000) {
      color = '#FFF';
    } else if (downloads < 1000000) {
      color = '#f95d6a';
    } else if (downloads < 1000000000) {
      color = '#2f4b7c';
    }

    return color;
  }
}

export default withStyles(styles)(DownloadsComponent);
