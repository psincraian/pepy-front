import React from "react";
import { Grid, Typography } from "@mui/material";
import AppBar from "@/app/components/app_bar";
import { SubscribeForm } from "@/app/components/subscribe_form";
import Emoji from "@/app/components/emoji";
import styles from "./page.module.css";
import Image from "next/image";

const Newsletter = () => {
  return (
    <>
      <AppBar />
      <main>
        <Grid container justifyContent="center" rowSpacing={6}>
          <Grid item xs={12}>
            <Typography variant="h2">Monthly report</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Get a useful downloads report directly to your inbox.
              <Emoji symbol="📊" />
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <SubscribeForm />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Compare to previous month</Typography>
                <Typography>
                  You will get two months of data, to compare how the project is
                  performing this month and the previous one.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Image
                  className={styles.img}
                  alt="Example of monthly download stats"
                  src="/newsletter/monthly_downloads.png"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
                <Image
                  className={styles.img}
                  alt="Example of advanced stats"
                  src="/newsletter/advanced_stats.png"
                />
              </Grid>
              <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
                <Typography variant="h6">Advanced stats</Typography>
                <Typography>
                  Check how your project compares to other PyPI projects, what
                  are the growing versions, and the most popular ones.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">More charts</Typography>
                <Typography>
                  You will have a deeper view of how your project versions are
                  distributed and how is the evolution of this versions. The
                  more you know the better.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Image
                  className={styles.img}
                  alt="Example of different graph"
                  src="/newsletter/downloads_per_version.png"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default Newsletter;
