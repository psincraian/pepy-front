import React from "react";
import SearchAppBar from "../components/SearchAppBar";
import { Link, Typography, Grid, Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import Footer from "../components/Footer";
import Emoji from "../components/Emoji";
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
  imgContainer: {
    objectFit: "contain",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
  img: {
    maxWidth: "100%",
  },
  footer: {
    left: 0,
    bottom: 0,
    width: "100%",
  },
  section: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(8),
    },
  },
});

const Newsletter = ({ classes }) => {
  return (
    <>
      <SearchAppBar />
      <Grid container justifyContent="center" className={classes.layout}>
        <Grid item xs={12}>
          <Typography variant="h2">
            Our <u>PRO</u> Newsletter
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            Get more useful data directly to your inbox. You will have two
            months of data, how your project ranks, and comparison with previous
            month <Emoji symbol="📊" />
            <p>
              Also, you will help mantaining this website live!{" "}
              <Emoji symbol="🤗" />
            </p>
          </Typography>
        </Grid>
        <Grid item align="center" xs={12}>
          <Link
            aria-label="Support us"
            color="textSecondary"
            component="a"
            target="_blank"
            href="https://www.buymeacoffee.com/pepy"
          >
            <Button variant="contained" size="large" color="primary">
              Subscribe now
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container className={classes.section}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Compare to previous month</Typography>
              <Typography>
                You will get two months of data, to compare how the project is
                performing this month and the previous one.
              </Typography>
            </Grid>
            <Grid item className={classes.imgContainer} xs={12} sm={6}>
              <img
                alt="Example of monthly download stats"
                className={classes.img}
                src="/newsletter/monthly_downloads.png"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container className={classes.section}>
            <Grid item className={classes.imgContainer} xs={12} sm={6}>
              <img
                className={classes.img}
                alt="Example of advanced stats"
                src="/newsletter/advanced_stats.png"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Advanced stats</Typography>
              <Typography>
                Check how your project compares to other PyPI projects, what are
                the growing versions, and the most popular ones.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container className={classes.section}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">More charts</Typography>
              <Typography>
                You will have a deeper view of how your project versions are
                distributed and how is the evolution of this versions. The more
                you know the better.
              </Typography>
            </Grid>
            <Grid item className={classes.imgContainer} xs={12} sm={6}>
              <img
                className={classes.img}
                alt="Example of different graph"
                src="/newsletter/downloads_per_version.png"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item align="center" xs={12}>
          <Link
            aria-label="Support us"
            color="textSecondary"
            component="a"
            target="_blank"
            href="https://www.buymeacoffee.com/pepy"
          >
            <Button variant="contained" size="large" color="primary">
              Subscribe now
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div className={classes.footer}>
        <Footer />
      </div>
    </>
  );
};

export default withStyles(styles)(Newsletter);
