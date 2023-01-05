import React, { Component } from 'react';
import SearchAppBar from '../components/SearchAppBar';
import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import Footer from '../components/Footer';
import Emoji from '../components/Emoji';
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
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
  subtitle: {
    // marginTop: theme.spacing(1),
  },
  description: {
    marginTop: theme.spacing(3),
  },
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SearchAppBar />
        <div className={classes.layout}>
          <Typography variant="h2">Error 404</Typography>
          <Typography className={classes.subtitle} variant="h4">
            Page not found
          </Typography>
          <Typography className={classes.description}>
            This page does not exist <Emoji symbol="😿" />
          </Typography>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(NotFound);
