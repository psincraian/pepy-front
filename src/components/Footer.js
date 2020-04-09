import React, { Component } from 'react';
import { Container, Typography, withStyles, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Emoji from './Emoji';

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
          <Link
            aria-label="Source code"
            color="textSecondary"
            component="a"
            href="https://github.com/psincraian/pepy"
          >
            We <Emoji symbol="❤️" label="heart" /> open source
          </Link>
          <Typography display="inline" color="textSecondary">
            {' '}-{' '}
          </Typography>
          <Link color="textSecondary" component={RouterLink} to="/about">
            FAQ
          </Link>
          <Typography display="inline" color="textSecondary">
            {' '}-{' '}
          </Typography>
          <Link
            aria-label="Follow us"
            color="textSecondary"
            component="a"
            href="https://twitter.com/psincraian"
          >
            Made by @psincraian
          </Link>
        </Container>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
