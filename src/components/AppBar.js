import React, { Component } from 'react';
import {
  AppBar as BaseAppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import GithubIcon from './GithubIcon';
import IconButton from '@material-ui/core/IconButton';
import { withRouter, Link } from 'react-router-dom';

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

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
              <IconButton
                aria-label="Source code"
                color="inherit"
                component="a"
                href="https://github.com/psincraian/pepy"
              >
                <GithubIcon color="white" />
              </IconButton>
              <IconButton
                aria-label="FAQ"
                color="inherit"
                component={AdapterLink}
                to="/about"
              >
                <InfoIcon />
              </IconButton>
            </div>
          </Toolbar>
        </BaseAppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(AppBar));
