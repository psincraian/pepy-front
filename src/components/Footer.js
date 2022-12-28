import React, { Component } from 'react';
import { Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Emoji from './Emoji';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  footer: {
    padding: theme.spacing(0, 2),
    marginTop: 'auto',
  },
  imgContainer: {
    margin: theme.spacing(3, 0),
  },
  img: {
    maxWidth: '40%',
    [theme.breakpoints.down('md')]: {
      maxWidth: '50%',
    },
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              align="center"
              className={classes.imgContainer}
            >
              <Link
                aria-label="Source code"
                color="textSecondary"
                component="a"
                target="_blank"
                href="https://www.digitalocean.com/?refcode=7bf782110d6c&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=pepy"
              >
                <img
                  className={classes.img}
                  src="/images/do-logo.png"
                  alt="Digital Ocean sponsored by logo"
                />
              </Link>
            </Grid>
            <Grid item xs={6} sm={4} align="center">
              <Link
                aria-label="Source code"
                color="textSecondary"
                component="a"
                target="_blank"
                href="https://github.com/psincraian/pepy"
              >
                We <Emoji symbol="❤️" label="heart" /> open source
              </Link>
            </Grid>
            <Grid item xs={6} sm={3} align="center">
              <Link
                aria-label="Follow us"
                color="textSecondary"
                component="a"
                target="_blank"
                href="https://twitter.com/psincraian"
              >
                <Emoji symbol="👤" label="person" /> Follow us
              </Link>
            </Grid>
            <Grid item xs={6} sm={3} align="center">
              <Link
                aria-label="Support us"
                color="textSecondary"
                component="a"
                target="_blank"
                href="https://www.patreon.com/pepy"
              >
                <Emoji symbol="➕" label="plus" /> Support us
              </Link>
            </Grid>
            <Grid item xs={6} sm={2} align="center">
              <Link color="textSecondary" component={RouterLink} to="/about">
                <Emoji symbol="❔" label="question" /> FAQ
              </Link>
            </Grid>
          </Grid>
        </Container>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
