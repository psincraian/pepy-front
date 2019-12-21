import React, { Component } from 'react';
import {
  AppBar as BaseAppBar,
  Toolbar,
  Typography,
  withStyles,
  Link,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
    flexGrow: 1,
  },
  section: {
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
            <Link to="/" className={classes.title}>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                PePy
              </Typography>
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
