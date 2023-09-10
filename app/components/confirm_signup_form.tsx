'use client';
import React, {useState} from "react";
import {FormControl, FormHelperText, Grid, Input, InputLabel} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {ErrorOutline} from "@mui/icons-material";
import {confirmSignUp, isValidPassword, signup} from "@/app/helper/auth";
import {useRouter} from "next/navigation";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
    NO_FETCHING,
    FETCHING,
    COMPLETED_OK,
    COMPLETED_FAILURE
}

export interface ConfirmSignupFormProps {
    username: string,
    onSuccess: () => void,
}

export const ConfirmSignupForm = (props: ConfirmSignupFormProps) => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        code: '',
        codeErrors: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState({
        status: SubmissionStatus.NO_FETCHING,
    })

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (name === 'code') {
            setFormData({
                ...formData,
                [name]: event.target.value,
                codeErrors: event.target.value.length === 6 ? '' : 'Invalid code',
            });
        }
    };

    const handleSubmit = () => {
        if (formData.code.length != 6) {
            setFormData(prevState => ({
                ...prevState,
                codeErrors: 'Invalid code',
            }));
            return;
        }
        setSubmissionStatus({status: SubmissionStatus.FETCHING})
        confirmSignUp({code: formData.code, username: props.username}, {
            onSuccess(success) {
                console.log("Success confirmation", success)
                setSubmissionStatus({status: SubmissionStatus.COMPLETED_OK})
                props.onSuccess();
            },
            onFailure(error) {
                console.log("Error confirmation", error);
                setSubmissionStatus({status: SubmissionStatus.COMPLETED_FAILURE})
                setFormData(prevState => ({...prevState, codeErrors: error}));
            }
        });
    };

    let endIcon = null;
    if (submissionStatus.status === SubmissionStatus.COMPLETED_FAILURE) {
        endIcon = <ErrorOutline/>;
    } else if (submissionStatus.status === SubmissionStatus.COMPLETED_OK) {
        return (
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={4}
            >
                <Grid item xs={12} sm={8}>
                    Sign up successfully! Thanks :)
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={4}
        >
            <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                    <InputLabel required htmlFor="code">
                        Verification Code
                    </InputLabel>
                    <Input
                        id="code"
                        aria-describedby="code-helper"
                        onChange={handleChange('code')}
                        error={formData.codeErrors !== ''}
                        value={formData.code}
                        type="number"
                    />
                    <FormHelperText id="code-helper">
                        {formData.codeErrors !== '' ? formData.codeErrors : 'Type the 6-digit code sent to your email address'}
                    </FormHelperText>
                </FormControl>
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