import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../api/errors';
import Page404 from '../components/Page404';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';

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

const mapStateToProps = state => {
  return {
    errors: state.errors,
  };
};

const mapDispatchToProps = dispatch => ({
  removeErrors: () => {
    dispatch(removeErrors());
  },
});

class WrappedErrors extends Component {
  removeErrors = () => {
    this.props.removeErrors();
    this.props.history.push(`/`);
  };

  render() {
    if (this.props.errors !== null && this.props.errors.error === 404) {
      const { classes } = this.props;
      return (
        <>
          <Grid
            className={classes.layout}
            spacing={4}
            justify="center"
            container
          >
            <Grid xs={12} item>
              <Page404 />
            </Grid>
            <Grid item>
              <Button
                onClick={this.removeErrors}
                variant="contained"
                color="primary"
              >
                Return to main page
              </Button>
            </Grid>
          </Grid>
        </>
      );
    }
    return this.props.children;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(WrappedErrors)));
