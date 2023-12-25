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
import { SubscribeButton } from "@/app/projects/[project]/components/SubscribeButton";

export const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    project: "",
  });

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
    })
  };


  return (
    <Grid container alignItems="center" justifyContent="center" spacing={4}>
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
        <SubscribeButton project={formData.project} />
      </Grid>
    </Grid>
  );
};
