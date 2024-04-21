"use client";

import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import Emoji from "@/app/components/emoji";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./price.module.css";
import { height } from "@mui/system";


export function PriceComponent() {
  const router = useRouter();

  return (
    <Grid container spacing={4} marginY={2} justifyContent="center">
      <Grid item xs={12} md={5}>
        <Card variant="outlined">
          <CardHeader title="Monthly" subheader="5$/month" />
          <CardContent sx={{height: 140}}>
            This includes:
            <ul className={styles.list}>
              <li><Emoji symbol={"✔"}/> 100 API Calls/Min: Unleash fast data access!</li>
              <li><Emoji symbol={"✔"}/> 1-Year Data: for deep insights.</li>
              <li><Emoji symbol={"🆕"}/> Download stats per country: check your users history</li>
              <li><Emoji symbol={"✔"}/> Name in README: Be a part of our Hall of Fame!</li>
              <li><Emoji symbol={"✔"}/> Support Us: Keep pepy.tech up and running.</li>
            </ul>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={(e) => router.push("/user/signup")}>Sign up</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} md={5}>
        <Card variant="outlined">
          <CardHeader title="Yearly" subheader="50$/year" />
          <CardContent sx={{height: 140}}>
            This includes:
            <ul className={styles.list}>
              <li><Emoji symbol={"✔"} /> 100 API Calls/Min: Unleash fast data access!</li>
              <li><Emoji symbol={"✔"}/> 1-Year Data: for deep insights.</li>
              <li><Emoji symbol={"🆕"} /> Download stats per country: check your users history</li>
              <li><Emoji symbol={"✔"} /> Name in README: Be a part of our Hall of Fame!</li>
              <li><Emoji symbol={"✔"} /> Support Us: Keep pepy.tech up and running.</li>
              <li><Emoji symbol={"➕"} /> 2 months for free</li>
            </ul>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={(e) => router.push("/user/signup")}>Sign up</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>);

}