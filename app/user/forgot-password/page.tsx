"use client";

import AppBar from "@/app/components/app_bar";
import { SignupForm } from "@/app/user/signup/components/signup_form";
import { useState } from "react";
import { ConfirmSignupForm } from "@/app/user/signup/components/confirm_signup_form";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { ForgotPasswordForm } from "@/app/user/forgot-password/components/forgot_password_form";
import { ConfirmNewPasswordForm } from "@/app/user/forgot-password/components/confirm_password";

enum SignupState {
  STARTED,
  CODE_VERIFICATION,
  COMPLETED,
}

export default function Home() {
  const router = useRouter();

  const [submissionStatus, setSubmissionStatus] = useState({
    status: SignupState.STARTED,
    email: "",
  });

  var content = null;
  if (submissionStatus.status === SignupState.STARTED) {
    content = (
      <ForgotPasswordForm
        onSuccess={(email) =>
          setSubmissionStatus({
            status: SignupState.CODE_VERIFICATION,
            email: email,
          })
        }
      />
    );
  } else if (submissionStatus.status === SignupState.CODE_VERIFICATION) {
    content = (
      <ConfirmNewPasswordForm
        email={submissionStatus.email}
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
          Password reset correctly. You can now login.
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
      <header>
        <AppBar />
      </header>
      <main>
        <h1>Password reset</h1>
        {content}
      </main>
    </div>
  );
}
