import React, { Component } from 'react';
import {
  AppBar as BaseAppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  title: {
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
          </Toolbar>
        </BaseAppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AppBar));
