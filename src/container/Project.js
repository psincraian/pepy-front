import React, { Component } from 'react';
import { fetchProject } from '../api/project';
import {
  Grid,
  withStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FETCHING_STATUS } from '../api/constants';
import DownloadsComponent from '../components/DownloadsComponent';
import ProjectSummary from '../components/ProjectSummary';
import BadgesComponent from '../components/BadgesComponent';
import SearchAppBar from '../components/SearchAppBar';

const styles = theme => ({
  layout: {
    width: 'auto',
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const mapStateToProps = state => {
  return {
    project: state.project,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProject: projectId => {
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

    return (
      <>
        <SearchAppBar />
        <Grid container className={classes.layout} spacing={8}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h2">
              {this.props.project.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProjectSummary
              totalDownloads={this.props.project.total_downloads}
              totalDownloads30Days={Object.values(
                this.props.project.downloads
              ).reduce((carry, x) => carry + x)}
              totalDownloads7Days={Object.values(this.props.project.downloads)
                .slice(0, 7)
                .reduce((carry, x) => carry + x)}
              name={this.props.project.id}
            />
          </Grid>
          <Grid item xs={12}>
            <BadgesComponent project={this.props.project.id} />
          </Grid>
          <Grid item xs={12}>
            <DownloadsComponent downloads={this.props.project.downloads} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Project));
