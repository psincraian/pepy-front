import React from "react";
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Box,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  titleItem: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(),
    },
  },
});

const ProjectSummary = ({
  classes,
  name,
  totalDownloads,
  totalDownloads30Days,
  totalDownloads7Days,
}) => {
  const pypiLink = "https://pypi.org/project/" + name;
  return (
    <Card data-cy="summary">
      <CardHeader title="Summary" />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box fontWeight="fontWeightMedium">PyPI link</Box>
          </Grid>
          <Grid item xs={12} marginBottom={1}>
            <a href={pypiLink}>
              <Typography noWrap>{pypiLink}</Typography>
            </a>
          </Grid>
          <Grid item xs={12} className={classes.titleItem}>
            <Box fontWeight="fontWeightMedium">Total downloads</Box>
          </Grid>
          <Grid item xs={12} marginBottom={1}>
            {totalDownloads.toLocaleString()}
          </Grid>
          <Grid item xs={12} className={classes.titleItem}>
            <Box fontWeight="fontWeightMedium">Total downloads - 30 days</Box>
          </Grid>
          <Grid item xs={12} marginBottom={1}>
            {totalDownloads30Days.toLocaleString()}
          </Grid>
          <Grid item xs={12} className={classes.titleItem}>
            <Box fontWeight="fontWeightMedium">Total downloads - 7 days</Box>
          </Grid>
          <Grid item xs={12}>
            {totalDownloads7Days.toLocaleString()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ProjectSummary);
