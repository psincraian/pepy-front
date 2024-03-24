"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ErrorOutline } from "@mui/icons-material";
import { isValidPassword, signup } from "@/app/user/helper/auth";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/app/user/helper/auth";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
  NO_FETCHING,
  FETCHING,
  COMPLETED_OK,
  COMPLETED_FAILURE,
}

export interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
}

export const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {

  const [formData, setFormData] = useState({
    email: "",
    emailErrors: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    status: SubmissionStatus.NO_FETCHING,
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "email") {
        setFormData({
          ...formData,
          [name]: event.target.value,
          emailErrors: event.target.value.match(VALID_EMAIL_REGEX)
            ? ""
            : "Invalid email",
        });
      }
    };

  const handleSubmit = () => {
    if (!formData.email.match(VALID_EMAIL_REGEX)) {
      setFormData((prevState) => ({
        ...prevState,
        emailErrors: "Invalid email",
      }));
      return;
    }
    forgotPassword(formData, {
      onSuccess(success) {
        setSubmissionStatus({ status: SubmissionStatus.COMPLETED_OK });
        props.onSuccess(formData.email);
      },
      onFailure(error) {
        console.log(error);
        setSubmissionStatus({ status: SubmissionStatus.COMPLETED_FAILURE });
        setFormData(prevState => ({...prevState, emailErrors: error}))
      },
    });
  };

  let endIcon = null;
  if (submissionStatus.status === SubmissionStatus.COMPLETED_FAILURE) {
    endIcon = <ErrorOutline />;
  } else if (submissionStatus.status === SubmissionStatus.COMPLETED_OK) {
    return (
      <Grid container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={8}>
          Submission successful, you will receive an email to {formData.email}{" "}
          to confirm your registration.
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <InputLabel required htmlFor="email">
            Email address
          </InputLabel>
          <Input
            id="email"
            aria-describedby="email-helper"
            onChange={handleChange("email")}
            error={formData.emailErrors !== ""}
            value={formData.email}
            type="email"
            autoComplete="current-email"
          />
        </FormControl>
        <FormHelperText error={formData.emailErrors !== ""} id="email-helper">
          {formData.emailErrors !== "" ? formData.emailErrors :
          "Enter a valid email address that you have access to. We'll send a verification email to this address. Example: johndoe@example.com"}
        </FormHelperText>
      </Grid>
      <Grid item xs={12} sm={8}>
        <LoadingButton
          fullWidth
          onClick={() => handleSubmit()}
          endIcon={endIcon}
          loading={submissionStatus.status === SubmissionStatus.FETCHING}
          type="submit"
          variant="contained"
          size="medium"
          color="primary"
        >
          Submit
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
