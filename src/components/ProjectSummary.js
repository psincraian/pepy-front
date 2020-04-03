import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Box,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  titleItem: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(),
    },
  },
});

function ProjectSummary(props) {
  const { classes } = props;

  const pypiLink = 'https://pypi.org/project/' + props.name;
  return (
    <Card data-cy="summary">
      <CardHeader title="Summary" />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box fontWeight="fontWeightMedium">PyPI link</Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <a href={pypiLink}>{pypiLink}</a>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.titleItem}>
            <Box fontWeight="fontWeightMedium">Total downloads</Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {props.totalDownloads.toLocaleString()}
          </Grid>
          <Grid item xs={12} sm={6} className={classes.titleItem}>
            <Box fontWeight="fontWeightMedium">Total downloads - 30 days</Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {props.totalDownloads30Days.toLocaleString()}
          </Grid>
          <Grid item xs={12} sm={6} className={classes.titleItem}>
            <Box fontWeight="fontWeightMedium">Total downloads - 7 days</Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            {props.totalDownloads7Days.toLocaleString()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ProjectSummary);
