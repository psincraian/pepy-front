import React, { useState } from "react";
import SearchAppBar from "../components/SearchAppBar";
import CodeBlock from "../components/CodeBlock";
import {
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Footer from "../components/Footer";
const styles = (theme) => ({
  layout: {
    width: "auto",
    flexGrow: 2,
    paddingBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("md")]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  footer: {
    left: 0,
    bottom: 0,
    width: "100%",
  },
  formLayout: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControlLeft: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "35%",
      minWidth: 120,
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  formControlRight: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "35%",
      minWidth: 120,
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  imageCodeTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  imageTitle: {
    marginTop: theme.spacing(2),
  },
  imageCode: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
});

const PersonalizedBadge = ({ classes, project }) => {
  const [badgeState, setBadgeState] = useState({
    period: "month",
    units: "international_system",
    leftColor: "black",
    rightColor: "orange",
    leftText: "Downloads",
  });

  const handleChange = (e) => {
    setBadgeState({ ...badgeState, [e.target.name]: e.target.value });
  };

  const buildUrl = () => {
    return (
      "https://static.pepy.tech/personalized-badge/" +
      project +
      "?period=" +
      badgeState.period +
      "&units=" +
      badgeState.units +
      "&left_color=" +
      badgeState.leftColor +
      "&right_color=" +
      badgeState.rightColor +
      "&left_text=" +
      encodeURI(badgeState.leftText)
    );
  };

  const buildProjectUrl = () => {
    return "https://pepy.tech/project/" + project;
  };

  const getColors = () => {
    return [
      "black",
      "brightgreen",
      "green",
      "yellow",
      "yellowgreen",
      "orange",
      "red",
      "blue",
      "grey",
      "lightgrey",
    ];
  };

  const colorsOptions = getColors().map((color) => {
    return (
      <MenuItem key={color} value={color}>
        {color}
      </MenuItem>
    );
  });

  return (
    <>
      <SearchAppBar />
      <Grid container justifyContent="center" className={classes.layout}>
        <Grid item xs={12}>
          <Typography variant="h3">Personalized badge for {project}</Typography>
        </Grid>
        <Grid item xs={12} md={8} className={classes.formLayout}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Typography variant="body1">Period</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" className={classes.formControl}>
                <RadioGroup
                  aria-label="period"
                  name="period"
                  value={badgeState.period}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="week"
                    control={<Radio />}
                    label="Week"
                  />
                  <FormControlLabel
                    value="month"
                    control={<Radio />}
                    label="Month"
                  />
                  <FormControlLabel
                    value="total"
                    control={<Radio />}
                    label="Total"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="standard"
                className={classes.formControlLeft}
              >
                <Select
                  name="leftColor"
                  id="left-color"
                  value={badgeState.leftColor}
                  onChange={handleChange}
                >
                  {colorsOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} align="right">
              <FormControl
                variant="standard"
                className={classes.formControlRight}
              >
                <Select
                  name="rightColor"
                  id="right-color"
                  value={badgeState.rightColor}
                  onChange={handleChange}
                >
                  {colorsOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
              <img width="66%" alt="Personalized badge" src={buildUrl()} />
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="standard"
                className={classes.formControlLeft}
              >
                <Input
                  name="leftText"
                  id="leftText"
                  value={badgeState.leftText}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} align="right">
              <FormControl
                variant="standard"
                className={classes.formControlRight}
              >
                <Select
                  aria-label="units"
                  name="units"
                  value={badgeState.units}
                  onChange={handleChange}
                >
                  <MenuItem value="international_system">
                    System metric (default)
                  </MenuItem>
                  <MenuItem value="abbreviation">Abbreviation</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.imageCodeTitle}>
          <Typography variant="h4">Result</Typography>
        </Grid>
        <Grid item xs={6} className={classes.imageTitle} align="center">
          <Typography variant="body1">Markdown</Typography>
        </Grid>
        <Grid item xs={6}>
          <CodeBlock
            className={classes.imageCode}
            content={
              "[![Downloads](" + buildUrl() + ")](" + buildProjectUrl() + ")"
            }
          />
        </Grid>
        <Grid item xs={6} className={classes.imageTitle} align="center">
          <Typography variant="body1">RST</Typography>
        </Grid>
        <Grid item xs={6}>
          <CodeBlock
            className={classes.imageCode}
            content={
              ".. image:: " + buildUrl() + "\n :target: " + buildProjectUrl()
            }
          />
        </Grid>
        <Grid item xs={6} className={classes.imageTitle} align="center">
          <Typography variant="body1">Image url</Typography>
        </Grid>
        <Grid item xs={6}>
          <CodeBlock className={classes.imageCode} content={buildUrl()} />
        </Grid>
      </Grid>
      <div className={classes.footer}>
        <Footer />
      </div>
    </>
  );
};

export default withStyles(styles)(PersonalizedBadge);
