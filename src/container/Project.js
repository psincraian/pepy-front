import React, { Component } from 'react';
import { fetchProject } from '../api/project';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, CircularProgress, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../api/constants';
import ProjectSummary from '../components/ProjectSummary';
import BadgesComponent from '../components/BadgesComponent';
import Notification from '../components/Notification';
import SearchAppBar from '../components/SearchAppBar';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import CarbonAds from '../components/CarbonAds';
import DownloadsComponent from '../components/DownloadsComponent';
import ServerError from '../components/ServerError';
import Emoji from '../components/Emoji';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
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
    if (this.props.projectId !== undefined) {
      this.props.fetchProject(this.props.projectId);
    }
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
        <div className={classes.page}>
          <SearchAppBar />
          <Grid container className={classes.layout} justifyContent="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </div>
      );
    }

    if (this.props.project.error === 404) {
      return this.render404Page(classes);
    } else if (this.props.project.error >= 500) {
      return this.render5XXPage(classes);
    }

    var lastDate = new Date('2023-06-10').setHours(0, 0, 0, 0);
    var today = new Date().setHours(0, 0, 0, 0);
    var notification = null;
    if (today < lastDate) {
      notification = (
        <Grid item xs={12}>
          <Notification
            severity="info"
            message={
              <Typography>
                <Emoji symbol="🗣" label="feedback" /> Help us improve pepy.tech! Please take a moment to fill out this quick survey about potential premium features and pricing:{' '}
                <Link
                  aria-label="surbet"
                  color="textSecondary"
                  component="a"
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe5Pnh1t_eK5EfsGYYJ2PT7qzoerqSapCRzz_AsIc_GmtzCKQ/viewform?usp=sf_link"
                >
                  survey
                </Link>{' '}
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
        <Grid
          container
          justifyContent="center"
          className={classes.layout}
          spacing={2}
        >
          {notification}
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              {this.props.project.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} xl={4} order={{ xs: 1, xl: 1 }}>
            <ProjectSummary
              totalDownloads={this.props.project.total_downloads}
              totalDownloads30Days={this.sumLastDownloads(
                Object.values(this.props.project.downloads)
                  .reverse()
                  .slice(0, 30)
              )}
              totalDownloads7Days={this.sumLastDownloads(
                Object.values(this.props.project.downloads)
                  .reverse()
                  .slice(0, 7)
              )}
              name={this.props.project.id}
            />
          </Grid>
          <Grid item md={5} xl={4} order={{ xs: 2, xl: 3 }}>
            <CarbonAds />
          </Grid>
          <Grid item xs={12} xl={4} order={{ xs: 3, xl: 2 }}>
            <BadgesComponent project={this.props.project.id} />
          </Grid>
          <Grid item xs={12} order={{ xs: 4, xl: 4 }}>
            <DownloadsComponent data={this.props.project} />
          </Grid>
        </Grid>
        <Footer />
      </>
    );
  }

  render404Page(classes) {
    return (
      <div className={classes.page}>
        <SearchAppBar />
        <Grid
          container
          spacing={2}
          className={classes.layout}
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2">Error 404</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Project <i>{this.props.project.projectId}</i> was not found. These
              can be the reasons:
              <ul>
                <li>You made a typo and the project doesn't exist.</li>
                <li>
                  If the project exists in PyPI, probably, it's a new project.
                  The downloads are updated once a day, check our{' '}
                  <Link component={RouterLink} to="/about">
                    FAQ
                  </Link>{' '}
                  about when the downloads are updated.
                </li>
              </ul>
              If not of the above is the case please open an issue in our{' '}
              <a href="https://github.com/psincraian/pepy">GitHub</a>.
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }

  render5XXPage(classes) {
    return (
      <div className={classes.page}>
        <SearchAppBar />
        <ServerError />
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Project));
