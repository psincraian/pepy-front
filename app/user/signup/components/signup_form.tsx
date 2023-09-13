'use client';
import React, {useState} from "react";
import {FormControl, FormHelperText, Grid, Input, InputLabel} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {ErrorOutline} from "@mui/icons-material";
import {isValidPassword, signup} from "@/app/user/helper/auth";
import {useRouter} from "next/navigation";

const VALID_EMAIL_REGEX = /^(.+)@(.+)\.(.+)$/;

enum SubmissionStatus {
    NO_FETCHING,
    FETCHING,
    COMPLETED_OK,
    COMPLETED_FAILURE
}

export interface SignupFormProps {
    onSuccess: (username: string) => void;
}

export const SignupForm = (props: SignupFormProps) => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        usernameErrors: '',
        emailErrors: '',
        passwordErrors: '',
        repeatPasswordErrors: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState({
        status: SubmissionStatus.NO_FETCHING,
    })

    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (name === 'username') {
            setFormData({
                ...formData,
                [name]: event.target.value,
                usernameErrors: event.target.value.length >= 3 ? '' : 'Username is required',
            });
        } else if (name === 'email') {
            setFormData({
                ...formData,
                [name]: event.target.value,
                emailErrors: event.target.value.match(VALID_EMAIL_REGEX) ? '' : 'Invalid email',
            });
        } else if (name === 'password') {
            setFormData({
                ...formData,
                [name]: event.target.value,
                passwordErrors: isValidPassword(event.target.value) ? '' : 'Invalid password',
            });
        } else if (name === 'repeatPassword') {
            setFormData({
                ...formData,
                [name]: event.target.value,
                repeatPasswordErrors: event.target.value === formData.password ? '' : 'Password must match'
            });
        }
    };

    const handleSubmit = () => {
        if (formData.username.length < 3) {
            setFormData(prevState => ({
                ...prevState,
                usernameErrors: 'Invalid username',
            }));
            return;
        } else if (!formData.email.match(VALID_EMAIL_REGEX)) {
            setFormData(prevState => ({
                ...prevState,
                emailErrors: 'Invalid email',
            }));
            return;
        } else if (!isValidPassword(formData.password)) {
            setFormData(prevState => ({
                ...prevState,
                passwordErrors: 'Invalid password',
            }));
            return;
        } else if (formData.password !== formData.repeatPassword) {
            setFormData(prevState => ({
                ...prevState,
                repeatPasswordErrors: 'Invalid repeated password'
            }))
            return;
        }
        setSubmissionStatus({status: SubmissionStatus.FETCHING})
        signup(formData, {
            onSuccess(success) {
                setSubmissionStatus({status: SubmissionStatus.COMPLETED_OK})
                props.onSuccess(formData.username);
            },
            onFailure(error) {
                console.log(error);
                setSubmissionStatus({status: SubmissionStatus.COMPLETED_FAILURE})
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
                    Submission successful, you will receive an email to {formData.email} to confirm your registration.
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
                    <InputLabel required htmlFor="username">
                        Username
                    </InputLabel>
                    <Input
                        id="username"
                        aria-describedby="username-helper"
                        onChange={handleChange('username')}
                        error={formData.usernameErrors !== ''}
                        value={formData.username}
                        type="username"
                    />
                    <FormHelperText id="username-helper">
                        Choose a unique username with 3-20 characters. You can use letters, numbers, and underscores.
                        Example: JohnDoe_123
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                    <InputLabel required htmlFor="email">
                        Email address
                    </InputLabel>
                    <Input
                        id="email"
                        aria-describedby="email-helper"
                        onChange={handleChange('email')}
                        error={formData.emailErrors !== ''}
                        value={formData.email}
                        type="email"
                        autoComplete="current-email"
                    />
                </FormControl>
                <FormHelperText id="username-helper">
                    Enter a valid email address that you have access to. We&apos;ll send a verification email to this
                    address. Example: johndoe@example.com
                </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                    <InputLabel required htmlFor="password">Password</InputLabel>
                    <Input
                        required
                        id="password"
                        aria-describedby="password-helper"
                        onChange={handleChange('password')}
                        value={formData.password}
                        error={formData.passwordErrors !== ''}
                        type="password"
                        autoComplete="current-password"
                    />
                </FormControl>
                <FormHelperText id="username-helper">
                    Create a strong password with at least 8 characters, including 1 uppercase letter, 1 lowercase
                    letter, and 1 number. Special characters are allowed. Example: P@ssw0rd!
                </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                    <InputLabel required htmlFor="re">Repeat password</InputLabel>
                    <Input
                        required
                        id="repeat-password"
                        aria-describedby="repeat-password-helper"
                        onChange={handleChange('repeatPassword')}
                        value={formData.repeatPassword}
                        error={formData.repeatPasswordErrors !== ''}
                        type="password"
                    />
                </FormControl>
                <FormHelperText id="repeat-password-helper">
                    Confirm your password by typing it again. Make sure it matches the password above.
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