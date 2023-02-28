import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import DownloadsChart from './DownloadsChart';
import DownloadsTable from './DownloadsTable';
import { withStyles } from '@mui/styles';
import VersionSearchBox from './VersionSearchBox';
import minimatch from 'minimatch';
import { withRouter } from 'react-router-dom';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

const styles = (theme) => ({
  downloadsTable: {
    marginTop: theme.spacing(4),
  },
});

const DownloadsComponent = ({ data, history, classes }) => {
  const isStableVersion = (version) => {
    var regex = new RegExp(/^\d+(\.\d+)*$/);
    return regex.test(version);
  };
  const defaultSelectedVersions = () => {
    const versions = data.versions;
    var selectedVersions = [];
    var i = versions.length - 1;
    while (i >= 0 && selectedVersions.length < 3) {
      if (isStableVersion(versions[i])) {
        selectedVersions.push(versions[i]);
      }

      --i;
    }

    if (selectedVersions.length === 0) {
      return data.versions.slice(-3).reverse();
    }

    const lastVersion = selectedVersions[0];
    if (lastVersion.indexOf('.') !== -1) {
      const major = lastVersion.substring(0, lastVersion.indexOf('.'));
      selectedVersions.push(major + '.*');
    }

    return selectedVersions;
  };

  const [selectedVersions, setSelectedVersions] = useState(
    defaultSelectedVersions()
  );

  const versions = data.versions.slice().reverse();
  const [displayStyle, setDisplayStyle] = useState('daily');
  const width = window.innerWidth;

  useEffect(() => {
    const parsedUrl = new URL(window.location.href);
    if (parsedUrl.searchParams.has('versions')) {
      const selectedVersions = parsedUrl.searchParams.getAll('versions');
      setSelectedVersions(selectedVersions);
    }
    if (parsedUrl.searchParams.has('display')) {
      const displayStyle = parsedUrl.searchParams.get('display');
      setDisplayStyle(displayStyle);
    }
  }, []);

  const retrieveDownloads = (downloads, selectedVersions, displayStyle) => {
    var data = [];
    Object.keys(downloads).forEach((date) => {
      var row = { date: date };
      row['total'] = Object.values(downloads[date]).reduce(
        (carry, x) => carry + x
      );
      row['sum'] = 0;
      selectedVersions.forEach((selectedVersion) => {
        if (shouldAddVersion(selectedVersion, downloads[date])) {
          const versionDownloads = retrieveVersionDownloads(
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
        getDateIndex = (date) => date.month() + '-' + date.week();
      } else if (displayStyle === 'monthly') {
        getDateIndex = (date) => date.year() + '-' + date.month();
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
  };

  const shouldAddVersion = (selectedVersion, downloads) => {
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
  };

  const retrieveVersionDownloads = (selectedVersion, download) => {
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
  };

  const updateSelectedVersions = (value) => {
    setSelectedVersions(value);
    if (value.length > 0) {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set('versions', value[0]);
      value
        .slice(1, value.length)
        .forEach((x) => currentUrlParams.append('versions', x));
      history.push(
        window.location.pathname + '?' + currentUrlParams.toString()
      );
    } else {
      let currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.delete('versions');
      history.push(
        window.location.pathname + '?' + currentUrlParams.toString()
      );
    }
  };

  const handleDisplayStyleChange = (event, newDisplayStyle) => {
    // Don't allow deselection
    if (!newDisplayStyle) {
      return;
    }
    setDisplayStyle(newDisplayStyle);
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set('display', newDisplayStyle);
    history.push(window.location.pathname + '?' + currentUrlParams.toString());
  };

  const isMobile = width <= 600;

  const downloads = retrieveDownloads(
    data.downloads,
    selectedVersions,
    displayStyle
  );

  const displayStyleToggle = (
    <ToggleButtonGroup
      color="primary"
      size="small"
      exclusive
      value={displayStyle}
      onChange={handleDisplayStyleChange}
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
            versions={versions}
            onChange={updateSelectedVersions}
            selectedVersions={selectedVersions}
            downloads={data.downloads}
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
            selectedVersions={selectedVersions}
          />
          <div className={classes.downloadsTable}>
            <DownloadsTable
              data={downloads}
              selectedVersions={selectedVersions}
            />
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default withRouter(withStyles(styles)(DownloadsComponent));
