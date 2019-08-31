import React from 'react';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';

function ProjectSummary(props) {
  const pypiLink = 'https://pypi.org/project/' + props.name;
  return (
    <Card data-cy="summary">
      <CardHeader title="Summary" />
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            PyPI link
          </Grid>
          <Grid item xs={6}>
            <a href={pypiLink}>{pypiLink}</a>
          </Grid>
          <Grid item xs={6}>
            Total downloads
          </Grid>
          <Grid item xs={6}>
            {props.totalDownloads.toLocaleString()}
          </Grid>
          <Grid item xs={6}>
            Total downloads - 30 days
          </Grid>
          <Grid item xs={6}>
            {props.totalDownloads30Days.toLocaleString()}
          </Grid>
          <Grid item xs={6}>
            Total downloads - 7 days
          </Grid>
          <Grid item xs={6}>
            {props.totalDownloads7Days.toLocaleString()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProjectSummary;
