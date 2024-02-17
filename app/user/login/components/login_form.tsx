"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DoneOutline, ErrorOutline } from "@mui/icons-material";
import { login } from "@/app/user/helper/auth";
import { useRouter } from "next/navigation";
import { UserProvider } from "@/app/user/UserContext";
import { useUserDispatch } from "@/app/user/UserContext";
import { UserAction } from "@/app/user/UserContext";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
  NO_FETCHING,
  FETCHING,
  COMPLETED_OK,
  COMPLETED_FAILURE,
}

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useUserDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailErrors: "",
    passwordErrors: ""
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    status: SubmissionStatus.NO_FETCHING
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
        emailErrors:
          name !== "email" || event.target.value.match(VALID_EMAIL_REGEX)
            ? ""
            : "Invalid email"
      });
    };

  const handleSubmit = () => {
    if (formData.email.match(VALID_EMAIL_REGEX)) {
      setSubmissionStatus({ status: SubmissionStatus.FETCHING });
      login(formData, {
        onSuccess(success) {
          dispatch({ type: UserAction.LOGIN_SUCCESS, user: success });
          router.push("/user");
        },
        onFailure(error) {
          setSubmissionStatus({ status: SubmissionStatus.COMPLETED_FAILURE });
        }
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        emailErrors: "Invalid email"
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
              type="email"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel required htmlFor="password">
              Password
            </InputLabel>
            <Input
              required
              id="password"
              aria-describedby="password-helper"
              onChange={handleChange("password")}
              value={formData.password}
              type="password"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LoadingButton
            id="login-button"
            fullWidth
            onClick={() => handleSubmit()}
            endIcon={endIcon}
            loading={submissionStatus.status === SubmissionStatus.FETCHING}
            type="submit"
            variant="contained"
            size="medium"
            color="primary"
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
  );
};
