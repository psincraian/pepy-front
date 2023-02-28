import React from 'react';
import { AppBar as BaseAppBar, Toolbar, Typography, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
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

const AppBar = ({ classes }) => {
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
          <div className={classes.section}></div>
        </Toolbar>
      </BaseAppBar>
    </div>
  );
};

export default withRouter(withStyles(styles)(AppBar));
