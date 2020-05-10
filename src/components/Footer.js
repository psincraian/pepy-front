import React, { Component } from 'react';
import { Link, withStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Emoji from './Emoji';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
  },
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} align="center">
              <Link
                aria-label="Source code"
                color="textSecondary"
                component="a"
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
