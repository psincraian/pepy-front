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
import { ErrorOutline } from "@mui/icons-material";
import { confirmSignUp, isValidPassword, signup } from "@/app/user/helper/auth";
import { useRouter } from "next/navigation";
import { confirmPassword } from "@/app/user/helper/auth";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
  NO_FETCHING,
  FETCHING,
  COMPLETED_OK,
  COMPLETED_FAILURE,
}

export interface ConfirmNewPasswordFormProps {
  email: string;
  onSuccess: () => void;
}

export const ConfirmNewPasswordForm = (props: ConfirmNewPasswordFormProps) => {

  const [formData, setFormData] = useState({
    code: "",
    codeErrors: "",
    newPassword: "",
    newPasswordErrors: ""
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    status: SubmissionStatus.NO_FETCHING
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (name === "code") {
        setFormData({
          ...formData,
          [name]: event.target.value,
          codeErrors: event.target.value.length === 6 ? "" : "Invalid code"
        });
      } else if (name === "newPassword") {
        setFormData({
          ...formData,
          [name]: event.target.value,
          newPasswordErrors: isValidPassword(event.target.value)
            ? ""
            : "Invalid password"
        });
      }
    };

  const handleSubmit = () => {
    if (formData.code.length != 6) {
      setFormData((prevState) => ({
        ...prevState,
        codeErrors: "Invalid code"
      }));
      return;
    } else if (!isValidPassword(formData.newPassword)) {
      setFormData((prevState) => ({
        ...prevState,
        passwordErrors: "Invalid password"
      }));
      return;
    }
    setSubmissionStatus({ status: SubmissionStatus.FETCHING });
    confirmPassword(
      { code: formData.code, email: props.email, newPassword: formData.newPassword },
      {
        onSuccess(success) {
          console.log("Success confirmation", success);
          setSubmissionStatus({ status: SubmissionStatus.COMPLETED_OK });
          props.onSuccess();
        },
        onFailure(error) {
          console.log("Error confirmation", error);
          setSubmissionStatus({ status: SubmissionStatus.COMPLETED_FAILURE });
          setFormData((prevState) => ({ ...prevState, codeErrors: error }));
        }
      }
    );
  };

  let endIcon = null;
  if (submissionStatus.status === SubmissionStatus.COMPLETED_FAILURE) {
    endIcon = <ErrorOutline />;
  } else if (submissionStatus.status === SubmissionStatus.COMPLETED_OK) {
    return (
      <Grid container alignItems="center" justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={8}>
          Sign up successfully! Thanks :)
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <InputLabel required htmlFor="code">
            Verification Code
          </InputLabel>
          <Input
            id="code"
            aria-describedby="code-helper"
            onChange={handleChange("code")}
            error={formData.codeErrors !== ""}
            value={formData.code}
            type="number"
          />
          <FormHelperText id="code-helper">
            {formData.codeErrors !== ""
              ? formData.codeErrors
              : "Type the 6-digit code sent to your email address"}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={8}>
        <FormControl fullWidth>
          <InputLabel required htmlFor="password">
            Password
          </InputLabel>
          <Input
            required
            id="password"
            aria-describedby="password-helper"
            onChange={handleChange("newPassword")}
            value={formData.newPassword}
            error={formData.newPasswordErrors !== ""}
            type="password"
            autoComplete="current-password"
          />
        </FormControl>
        <FormHelperText id="username-helper">
          Create a strong password with at least 8 characters, including 1
          uppercase letter, 1 lowercase letter, and 1 number. Special characters
          are allowed. Example: P@ssw0rd!
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
          Confirm
        </LoadingButton>
      </Grid>
    </Grid>
  );
};
