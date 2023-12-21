"use client";

import { ApiKey } from "@/app/user/model";
import React, { useState } from "react";
import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material";
import { DoneOutline, ErrorOutline } from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';

enum SubmissionStatus {
  NO_FETCHING,
  FETCHING,
  COMPLETED_OK,
  COMPLETED_FAILURE,
}

async function createKey(apiKeyName: string) {
  const response = await fetch("/api/v3/user/api-keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: apiKeyName,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error("Failed to create key");
}

export interface AddApiKeyButtonCallbacks {
  onSuccess: (key: ApiKey) => void;
}

export default function ApiKeyForm(callbacks: AddApiKeyButtonCallbacks) {
  const [submissionStatus, setSubmissionStatus] = useState({
    status: SubmissionStatus.NO_FETCHING,
  });

  const [formData, setFormData] = useState({
    apiKeyName: "",
    apiKeyNameErors: "",
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
        apiKeyNameErors:
          name !== "apiKeyName" || event.target.value.length >= 3
            ? ""
            : "Invalid api key name",
      });
    };

  function handleSubmit() {
    setSubmissionStatus({ status: SubmissionStatus.FETCHING });
    createKey(formData.apiKeyName)
      .then((key: ApiKey) => {
        setSubmissionStatus({ status: SubmissionStatus.COMPLETED_OK });
        callbacks.onSuccess(key);
      })
      .catch((error) => {
        setSubmissionStatus({ status: SubmissionStatus.COMPLETED_FAILURE });
      });
  }

  let endIcon = null;
  if (submissionStatus.status === SubmissionStatus.COMPLETED_FAILURE) {
    endIcon = <ErrorOutline />;
  } else if (submissionStatus.status === SubmissionStatus.COMPLETED_OK) {
    endIcon = <DoneOutline />;
  }

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel required htmlFor="apiKeyName">
            Api Key Name
          </InputLabel>
          <Input
            id="apiKeyName"
            aria-describedby="apiKeyName-helper"
            onChange={handleChange("apiKeyName")}
            error={formData.apiKeyNameErors !== ""}
            value={formData.apiKeyName}
            type="email"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
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
          Create Api Key
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
