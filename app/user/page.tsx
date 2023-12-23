"use client";

import AppBar from "@/app/components/app_bar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { getCurrentUser, signout, User } from "@/app/user/helper/auth";
import { useEffect, useState } from "react";
import ApiKeyTable from "@/app/user/components/api_keys_table";
import React from "react";
import ManageSubscriptionButton from "@/app/user/components/CustomerSubscriptionPortal";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  useEffect(() => {
    getCurrentUser()
      .then((u) => {
        setCurrentUser(u);
        console.log(u);
      })
      .catch((err) => console.error(err));
  }, []);

  function signoutUser() {
    signout();
    setCurrentUser(null);
  }

  return (
    <div>
      <header>
        <AppBar />
      </header>
      <main>
        <h1>
          Hello {currentUser !== null ? currentUser.username : "pythonista"}
        </h1>
        {currentUser === null ? (
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
