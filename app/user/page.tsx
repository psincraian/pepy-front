"use client";

import AppBar from "@/components/app_bar";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { signout } from "@/app/user/helper/auth";
import ApiKeyTable from "@/app/user/components/api_keys_table";
import React from "react";
import ManageSubscriptionButton from "@/app/user/components/CustomerSubscriptionPortal";
import { useUser } from "@/app/user/UserContext";

export default function Home() {
  const router = useRouter();
  const {user, error} = useUser();

  function signoutUser() {
    signout();
  }

  return (
    <div>
      <header>
        <AppBar />
      </header>
      <main>
        <h1>
          Hello {user !== null ? user.username : "pythonista"}
        </h1>
        {user === null ? (
          <>
            <Button
              sx={{ m: "8px" }}
              variant="contained"
              onClick={(e) => router.push("/user/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={(e) => router.push("/user/signup")}
            >
              Signup
            </Button>
          </>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <ApiKeyTable />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card variant="outlined">
                <CardHeader title="Profile"/>
                <CardContent>
                  <ManageSubscriptionButton />
                  <br />
                  <Button
                    sx={{ marginTop: "8px" }}
                    variant="contained"
                    fullWidth
                    onClick={(e) => router.push("/user/subscriptions")}
                  >
                    Newsletter subscriptions
                  </Button>
                  <br />
                  <Button
                    sx={{ marginTop: "8px" }}
                    variant="contained"
                    fullWidth
                    onClick={(e) => signoutUser()}
                  >
                    Sign out
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </main>
    </div>
  );
}
