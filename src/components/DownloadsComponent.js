import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import DownloadsChart from './DownloadsChart';
import DownloadsTable from './DownloadsTable';
import withStyles from '@material-ui/core/styles/withStyles';
import VersionSearchBox from './VersionSearchBox';
import minimatch from 'minimatch';
import { withRouter } from 'react-router-dom';

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
      versions: this.props.data.versions.slice().reverse(),
    };
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href);
    if (parsedUrl.searchParams.has('versions')) {
      const selectedVersions = parsedUrl.searchParams.getAll('versions');
      this.setState({ selectedVersions: selectedVersions });
      return;
    }
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
          const versionDownloads = this.retrieveVersionDownloads(
            selectedVersion,
            downloads[date]
          );
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
    if (!selectedVersion.includes('*')) {
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
    if (!selectedVersion.includes('*')) {
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

  updateSelectedVersions = (value) => {
    this.setState({ selectedVersions: value });
    if (value.length > 0) {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('versions', value[0]);
      value
        .slice(1, value.length)
        .forEach((x) => currentUrlParams.append('versions', x));
      this.props.history.push(
        window.location.pathname + '?' + currentUrlParams.toString()
      );
    } else {
      this.props.history.push(window.location.pathname);
    }
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
            <VersionSearchBox
              versions={this.state.versions}
              onChange={this.updateSelectedVersions}
              selectedVersions={this.state.selectedVersions}
              downloads={this.props.data.downloads}
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

export default withRouter(withStyles(styles)(DownloadsComponent));
