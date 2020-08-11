import React, { Component } from 'react';
import {
  AppBar as BaseAppBar,
  Toolbar,
  Typography,
  withStyles,
  Link,
} from '@material-ui/core';
import { withRouter, Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
    flexGrow: 1,
  },
  sectionFirst: {
    textDecoration: 'none',
    color: 'inherit',
  },
  section: {
    marginLeft: theme.spacing(2),
    textDecoration: 'none',
    color: 'inherit',
  },
});

class AppBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <BaseAppBar position="static">
          <Toolbar>
            <Link component={RouterLink} to="/" className={classes.title}>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                PePy
              </Typography>
            </Link>
            <Link
              component={RouterLink}
              to="/newsletter"
              className={classes.sectionFirst}
            >
              Newsletter
            </Link>
            <div className={classes.section}>
              <Link
                aria-label="Blog"
                color="inherit"
                component="a"
                href="https://blog.pepy.tech?utm_source=pepy"
              >
                Blog
              </Link>
            </div>
          </Toolbar>
        </BaseAppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AppBar));
