"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DoneOutline, ErrorOutline } from "@mui/icons-material";
import { login } from "@/app/user/helper/auth";
import { useRouter } from "next/navigation";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
  NO_FETCHING,
  FETCHING,
  COMPLETED_OK,
  COMPLETED_FAILURE,
}

export const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    emailErrors: "",
    passwordErrors: "",
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
      login(formData, {
        onSuccess(success) {
          router.push("/user");
        },
        onFailure(error) {
          setSubmissionStatus({ status: SubmissionStatus.COMPLETED_FAILURE });
        },
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
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <FormControl fullWidth>
              <InputLabel required htmlFor="email" sx={{ "&.Mui-focused": { marginTop: "15px" } }}>
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
              {formData.emailErrors && (
                <FormHelperText error>{formData.emailErrors}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel required htmlFor="password" sx={{ "&.Mui-focused": { marginTop: "15px" } }}>
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
            <LoadingButton
              fullWidth
              onClick={() => handleSubmit()}
              endIcon={endIcon}
              loading={submissionStatus.status === SubmissionStatus.FETCHING}
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
              sx={{ mt: 2 }}
            >
              Login
            </LoadingButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
