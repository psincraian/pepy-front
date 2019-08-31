import React, { Component } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';

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

class Index extends Component {
  handleSearch = query => {
    this.props.history.push('/project/' + query);
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar />
        <Grid
          container
          className={classes.layout}
          justify="center"
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography align="center" component="h2" variant="h2">
              PePy
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <SearchBar onSearch={this.handleSearch} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Index);
