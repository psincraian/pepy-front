import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Button,
  Link,
} from '@mui/material';
import CodeBlock from './CodeBlock';
import { Link as RouterLink } from 'react-router-dom';

const PEPY_BADGES_URL = 'https://static.pepy.tech/badge/';

const BadgesComponent = ({ project }) => {
  return (
    <Card data-cy="badges">
      <CardHeader title="Badges" />
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <img
              alt="Total downloads for the project"
              src={PEPY_BADGES_URL + project}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              content={
                '[![Downloads](' +
                PEPY_BADGES_URL +
                project +
                ')](https://pepy.tech/project/' +
                project +
                ')'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <img
              alt="Last 30 days downloads for the project"
              src={PEPY_BADGES_URL + project + '/month'}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              content={
                '[![Downloads](' +
                PEPY_BADGES_URL +
                project +
                '/month)](https://pepy.tech/project/' +
                project +
                ')'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <img
              alt="Last 7 days downloads for the project"
              src={PEPY_BADGES_URL + project + '/week'}
            />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock
              content={
                '[![Downloads](' +
                PEPY_BADGES_URL +
                project +
                '/week)](https://pepy.tech/project/' +
                project +
                ')'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Link
              component={RouterLink}
              to={'/project/' + project + '/personalized-badge'}
            >
              <Button variant="contained" color="primary">
                Personalized badge
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BadgesComponent;
