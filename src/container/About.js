import React, { Component } from 'react';
import SearchAppBar from '../components/SearchAppBar';
import { Grid, withStyles, Typography } from '@material-ui/core';
const styles = theme => ({
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

class About extends Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <SearchAppBar />
        <Grid container className={classes.layout} justify="center">
          <Typography variant="h2">Where the downloads come from?</Typography>
          <Typography>
            The data is retrieved from the official BigQuery repository:
            https://packaging.python.org/guides/analyzing-pypi-package-downloads/
          </Typography>
          <Typography variant="h2">When the data is updated?</Typography>
          <Typography>
            There is a cron that runs every day at 5 pm UTC that retrieves all
            the new downloads from the previous day.
          </Typography>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(About);
