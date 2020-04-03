import React, { Component } from 'react';
import SearchAppBar from '../components/SearchAppBar';
import { Link, withStyles, Typography } from '@material-ui/core';
import Footer from '../components/Footer';
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
});

class About extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SearchAppBar />
        <div className={classes.layout}>
          <Typography variant="h6">Where the downloads come from?</Typography>
          <Typography paragraph={true}>
            The data is retrieved from the official BigQuery repository:
            https://packaging.python.org/guides/analyzing-pypi-package-downloads/
          </Typography>
          <Typography variant="h6">When the data is updated?</Typography>
          <Typography paragraph={true}>
            There is a cron that runs every day at 5 pm UTC that retrieves all
            the new downloads from the previous day.
          </Typography>
          <Typography variant="h6">Who is the creator of PePy.tech?</Typography>
          <Typography paragraph={true}>
            Petru Rares Sincraian{' '}
            <Link href="https://twitter.com/psincraian">(@psincraian)</Link>{' '}
            started the project.
          </Typography>
          <Typography variant="h6">
            Can I participate to improve the website?
          </Typography>
          <Typography paragraph={true}>
            Of course, all the code is open source and you can contribute
            reporting issues or coding :-)
          </Typography>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(About);
