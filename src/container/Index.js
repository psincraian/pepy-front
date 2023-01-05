import React, { Component } from 'react';
import { Grid, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  layout: {
    width: 'auto',
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class Index extends Component {
  handleSearch = (query) => {
    this.props.history.push('/project/' + query);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>PePy - PyPI Download Stats</title>
          <meta
            name="description"
            content="Use PePy to view PyPI download stats, also you can generate your python download stats badge here."
          />
        </Helmet>
        <AppBar />
        <Grid
          container
          className={classes.layout}
          justifyContent="center"
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography align="center" component="h2" variant="h2">
              PePy
            </Typography>
          </Grid>
          <Grid item className={classes.searchBar} xs={12} sm={8}>
            <SearchBar onSearch={this.handleSearch} />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Index);
