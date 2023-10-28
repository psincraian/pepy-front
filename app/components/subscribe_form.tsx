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
import { DoneOutline, ErrorOutline } from "@mui/icons-material";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
  NO_FETCHING,
  FETCHING,
  COMPLETED_OK,
  COMPLETED_FAILURE,
}

export const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    project: "",
    emailErrors: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    status: SubmissionStatus.NO_FETCHING,
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
        emailErrors:
          name !== "email" || event.target.value.match(VALID_EMAIL_REGEX)
            ? ""
            : "Invalid email",
      });
    };

  const handleSubmit = () => {
    if (formData.email.match(VALID_EMAIL_REGEX)) {
      setSubmissionStatus({ status: SubmissionStatus.FETCHING });
      fetch( `/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          project: formData.project,
        }),
      }).then((r) => {
        if (r.ok) {
          setSubmissionStatus({ status: SubmissionStatus.COMPLETED_OK });
        } else {
          setSubmissionStatus({ status: SubmissionStatus.COMPLETED_FAILURE });
        }
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        emailErrors: "Invalid email",
      }));
    }
  };

  let endIcon = null;
  if (submissionStatus.status === SubmissionStatus.COMPLETED_FAILURE) {
    endIcon = <ErrorOutline />;
  } else if (submissionStatus.status === SubmissionStatus.COMPLETED_OK) {
    endIcon = <DoneOutline />;
  }

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={4}>
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
          />
          <FormHelperText id="email-helper">
            We&apos;ll never share your email.
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel htmlFor="project">Project</InputLabel>
          <Input
            required
            id="project"
            aria-describedby="project-helper"
            onChange={handleChange("project")}
            value={formData.project}
          />
          <FormHelperText id="project-helper">
            The project you are interested in
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
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
          Subscribe
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
