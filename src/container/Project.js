import React, { Component } from 'react';
import { fetchProject } from '../api/project';
import {
  Grid,
  withStyles,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../api/constants';
import ProjectSummary from '../components/ProjectSummary';
import BadgesComponent from '../components/BadgesComponent';
import Notification from '../components/Notification';
import SearchAppBar from '../components/SearchAppBar';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import CarbonAds from '../components/CarbonAds';
import Emoji from '../components/Emoji';
import DownloadsComponent from '../components/DownloadsComponent';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up(900 + theme.spacing(3 * 2))]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const mapStateToProps = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProject: (projectId) => {
    dispatch(fetchProject(projectId));
  },
});

class Project extends Component {
  componentDidMount() {
    this.props.fetchProject(this.props.projectId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projectId !== this.props.projectId) {
      this.props.fetchProject(this.props.projectId);
    }
  }

  sumLastDownloads(downloads) {
    return downloads.reduce(
      (carry, versions) =>
        carry +
        Object.values(versions).reduce(
          (carry, versionDownloads) => carry + versionDownloads
        ),
      0
    );
  }

  render() {
    const { classes } = this.props;

    if (this.props.project.status !== FETCHING_STATUS.fetched) {
      return (
        <>
          <SearchAppBar />
          <Grid container className={classes.layout} justify="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </>
      );
    }

    var lastDate = new Date('2020-04-01').setHours(0, 0, 0, 0);
    var today = new Date().setHours(0, 0, 0, 0);
    var notification = null;
    if (today < lastDate) {
      notification = (
        <Grid item xs={12}>
          <Notification
            severity="info"
            message={
              <Typography>
                <Emoji symbol="🎂" /> pepy.tech is 2 years old. Find some stats{' '}
                <Link
                  aria-label="Info of these 2 years"
                  color="textSecondary"
                  component="a"
                  href="https://twitter.com/psincraian/status/1244343901319761927?s=20"
                >
                  here!
                </Link>
              </Typography>
            }
          />
        </Grid>
      );
    }

    return (
      <>
        <Helmet>
          <title>PePy - {this.props.project.id} Download Stats</title>
          <meta
            name="description"
            content={
              'Check the download stats of ' +
              this.props.project.id +
              ' library. It has a total of ' +
              this.props.project.total_downloads +
              ' downloads.'
            }
          />
        </Helmet>
        <SearchAppBar />
        <Grid container className={classes.layout} spacing={2}>
          {notification}
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              {this.props.project.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <ProjectSummary
              totalDownloads={this.props.project.total_downloads}
              totalDownloads30Days={this.sumLastDownloads(
                Object.values(this.props.project.downloads)
              )}
              totalDownloads7Days={this.sumLastDownloads(
                Object.values(this.props.project.downloads)
                  .reverse()
                  .slice(0, 7)
              )}
              name={this.props.project.id}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CarbonAds />
          </Grid>
          <Grid item xs={12}>
            <BadgesComponent project={this.props.project.id} />
          </Grid>
          <Grid item xs={12}>
            <DownloadsComponent data={this.props.project} />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Project));
