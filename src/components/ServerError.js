import React, { Component } from 'react';
import { Typography, Grid } from '@mui/material';
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
  layout: {
    width: 'auto',
    flexGrow: 2,
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
  img: {
    maxWidth: '80%',
    height: 'auto',
  },
  listItem: {
    padding: theme.spacing(1),
  },
});

class ServerError extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.layout}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h2">Internal Server Error</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              className={classes.img}
              alt="Total downloads for the project"
              src="/snake-crying.png"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            We had an internal error. If the error persists:
            <ol>
              <li className={classes.listItem}>
                Contact me on Twitter{' '}
                <a href="https://twitter.com/psincraian">@psincraian</a> (the
                fatest way to get it fixed)
              </li>
              <li className={classes.listItem}>
                Or raise an issue on{' '}
                <a href="https://github.com/psincraian/pepy">GitHub</a>
              </li>
            </ol>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ServerError);
