'use client';

import {ApiKey} from "@/app/user/model";
import React, {useState} from "react";
import {Button} from "@mui/material";
import {DoneOutline, ErrorOutline} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {PEPY_HOST} from "@/app/constants";

enum SubmissionStatus {
    NO_FETCHING,
    FETCHING,
    COMPLETED_OK,
    COMPLETED_FAILURE
}

async function createKey() {
    const response = await fetch( "/api/v3/user/api-keys", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            "name": "test",
        }),
    })

    if (response.ok) {
        return response.json();
    }

    throw new Error("Failed to create key");
}

export default function AddApiKeyButton() {

    const [submissionStatus, setSubmissionStatus] = useState({
        status: SubmissionStatus.NO_FETCHING,
    })
    function sendAddKey() {
        setSubmissionStatus({status: SubmissionStatus.FETCHING})
        createKey()
            .then((key: ApiKey) => {setSubmissionStatus({status: SubmissionStatus.COMPLETED_OK})})
            .catch((error) => {setSubmissionStatus({status: SubmissionStatus.COMPLETED_FAILURE})})
    }

    let endIcon = null;
    if (submissionStatus.status === SubmissionStatus.COMPLETED_FAILURE) {
        endIcon = <ErrorOutline/>;
    } else if (submissionStatus.status === SubmissionStatus.COMPLETED_OK) {
        endIcon = <DoneOutline/>;
    }

    return (
        <LoadingButton
            onClick={() => sendAddKey()}
            endIcon={endIcon}
            loading={submissionStatus.status === SubmissionStatus.FETCHING}
            type="submit"
            variant="contained"
            size="medium"
            color="primary"
        >
            Add API Key
        </LoadingButton>    );
}