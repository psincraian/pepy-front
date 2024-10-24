"use client";

import { SignupForm } from "@/app/user/signup/components/signup_form";
import { useState } from "react";
import { ConfirmSignupForm } from "@/app/user/signup/components/confirm_signup_form";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

enum SignupState {
  STARTED,
  CODE_VERIFICATION,
  COMPLETED,
}

export default function Home() {
  const router = useRouter();

  const [submissionStatus, setSubmissionStatus] = useState({
    status: SignupState.STARTED,
    username: "",
  });

  var content = null;
  if (submissionStatus.status === SignupState.STARTED) {
    content = (
      <SignupForm
        onSuccess={(username) =>
          setSubmissionStatus({
            status: SignupState.CODE_VERIFICATION,
            username: username,
          })
        }
      />
    );
  } else if (submissionStatus.status === SignupState.CODE_VERIFICATION) {
    content = (
      <ConfirmSignupForm
        username={submissionStatus.username}
        onSuccess={() =>
          setSubmissionStatus({
            ...submissionStatus,
            status: SignupState.COMPLETED,
          })
        }
      />
    );
  } else {
    content = (
      <Grid container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={8}>
          Signup completed. You can now login.
        </Grid>
        <Grid item xs={12} sm={8}>
          <Button
            variant="contained"
            onClick={() => router.push("/user/login")}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <main>
        <h1>Sign up</h1>
        {content}
      </main>
    </div>
  );
}
