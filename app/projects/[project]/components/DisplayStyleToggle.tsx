"use client";

import {DisplayStyle} from "@/app/projects/[project]/model";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";
import {getCurrentUser, User} from "@/app/user/helper/auth";
import LoggedUsersTooltip from "@/app/components/logged_users_tooltip";

export interface DisplayStyleToggle {
    displayStyle: DisplayStyle;
    handleChange: (value: DisplayStyle) => void;
}

export const DisplayStyleToggle = ({displayStyle, handleChange}: DisplayStyleToggle) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        getCurrentUser().then(user => setCurrentUser(user));
    }, []);

    const disabled = currentUser === null;

    return (
        <ToggleButtonGroup
            value={displayStyle}
            exclusive
            onChange={(event, value) => {
                if (value !== null) handleChange(value)
            }}
            aria-label="text alignment"
        >
            <ToggleButton value={DisplayStyle.DAILY} aria-label="left aligned">
                Daily
            </ToggleButton>
            <LoggedUsersTooltip display={disabled}>
                <ToggleButton value={DisplayStyle.WEEKLY} aria-label="centered" disabled={disabled}
                              style={disabled ? {pointerEvents: 'none'} : {}}>
                    <span>Weekly</span>
                </ToggleButton>
            </LoggedUsersTooltip>
            <LoggedUsersTooltip display={disabled}>
                <ToggleButton value={DisplayStyle.MONTHLY} aria-label="right aligned" disabled={disabled}>
                    <span>Monthly</span>
                </ToggleButton>
            </LoggedUsersTooltip>

        </ToggleButtonGroup>
    )
}