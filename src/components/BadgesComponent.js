import React from 'react';
import { Card, CardContent, Grid, CardHeader } from '@material-ui/core';
import CodeBlock from './CodeBlock';

function BadgesComponent(props) {
  return (
    <Card data-cy="badges">
      <CardHeader title="Badges" />
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <img
              alt="Total downloads for the project"
              src={'https://pepy.tech/badge/' + props.project}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              content={
                '[![Downloads](https://pepy.tech/badge/' +
                props.project +
                ')](https://pepy.tech/project/' +
                props.project +
                ')'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <img
              alt="Last 30 days downloads for the project"
              src={'https://pepy.tech/badge/' + props.project + '/month'}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              content={
                '[![Downloads](https://pepy.tech/badge/' +
                props.project +
                '/month)](https://pepy.tech/project/' +
                props.project +
                '/month)'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <img
              alt="Last 7 days downloads for the project"
              src={'https://pepy.tech/badge/' + props.project + '/week'}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              content={
                '[![Downloads](https://pepy.tech/badge/' +
                props.project +
                '/week)](https://pepy.tech/project/' +
                props.project +
                '/week)'
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default BadgesComponent;
