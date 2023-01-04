import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import DownloadsChart from './DownloadsChart';
import DownloadsTable from './DownloadsTable';
import withStyles from '@material-ui/core/styles/withStyles';
import VersionSearchBox from './VersionSearchBox';
import minimatch from 'minimatch';
import { withRouter } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

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
      displayStyle: 'daily',
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    const parsedUrl = new URL(window.location.href);
    if (parsedUrl.searchParams.has('versions')) {
      const selectedVersions = parsedUrl.searchParams.getAll('versions');
      this.setState({ selectedVersions: selectedVersions });
    }
    if (parsedUrl.searchParams.has('display')) {
      const displayStyle = parsedUrl.searchParams.get('display');
      this.setState({ displayStyle: displayStyle });
    }
  }

  defaultSelectedVersions() {
    const versions = this.props.data.versions;
    var selectedVersions = [];
    var i = versions.length - 1;
    while (i >= 0 && selectedVersions.length < 3) {
      if (this.isStableVersion(versions[i])) {
        selectedVersions.push(versions[i]);
      }

      --i;
    }

    const lastVersion = selectedVersions[0];
    if (lastVersion.indexOf('.') !== -1) {
      const major = lastVersion.substring(0, lastVersion.indexOf('.'));
      selectedVersions.push(major + '.*');
    }

    return selectedVersions;
  }

  isStableVersion(version) {
    var regex = new RegExp(/^\d+(\.\d+)*$/);
    return regex.test(version);
  }

  retrieveDownloads(downloads, selectedVersions, displayStyle) {
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

    if (displayStyle !== 'daily') {
      let getDateIndex = (date) => date;

      if (displayStyle === 'weekly') {
        getDateIndex = (date) => date.month() + "-" + date.week();
      } else if (displayStyle === 'monthly') {
        getDateIndex = (date) => date.year() + "-" + date.month();
      }

      const reducedData = data.reduce((weeks, currentDay) => {
        const date = dayjs(currentDay.date);
        const weekOfYear = getDateIndex(date);
        if (!weeks[weekOfYear]) {
          weeks[weekOfYear] = {
            date: currentDay.date,
            total: 0,
            sum: 0,
          };
          selectedVersions.forEach((selectedVersion) => {
            weeks[weekOfYear][selectedVersion] = 0;
          });
        }
        weeks[weekOfYear].total += currentDay.total;
        weeks[weekOfYear].sum += currentDay.sum;
        selectedVersions.forEach((selectedVersion) => {
          weeks[weekOfYear][selectedVersion] += currentDay[selectedVersion];
        });
        return weeks;
      }, {});
      data = Object.values(reducedData);
    }
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
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.delete('versions');
      this.props.history.push(
        window.location.pathname + '?' + currentUrlParams.toString()
      );
    }
  };

  handleDisplayStyleChange = (event, newDisplayStyle) => {
    // Don't allow deselection
    if (!newDisplayStyle) {
      return;
    }
    this.setState({ displayStyle: newDisplayStyle });
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('display', newDisplayStyle);
    this.props.history.push(
      window.location.pathname + '?' + currentUrlParams.toString()
    );
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 600;

    const { classes } = this.props;

    const downloads = this.retrieveDownloads(
      this.props.data.downloads,
      this.state.selectedVersions,
      this.state.displayStyle
    );

    const displayStyleToggle = (
      <ToggleButtonGroup
        color="primary"
        size="small"
        exclusive
        value={this.state.displayStyle}
        onChange={this.handleDisplayStyleChange}
        aria-label="outlined primary button group"
      >
        <ToggleButton value="daily">Daily</ToggleButton>
        <ToggleButton value="weekly">Weekly</ToggleButton>
        <ToggleButton value="monthly">Monthly</ToggleButton>
      </ToggleButtonGroup>
    );

    return (
      <Card data-cy="downloads">
        <CardHeader
          title="Downloads"
          action={isMobile ? null : displayStyleToggle}
        ></CardHeader>
        <CardContent>
          <>
            <VersionSearchBox
              versions={this.state.versions}
              onChange={this.updateSelectedVersions}
              selectedVersions={this.state.selectedVersions}
              downloads={this.props.data.downloads}
            />
            {isMobile ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                {displayStyleToggle}
              </div>
            ) : null}

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
