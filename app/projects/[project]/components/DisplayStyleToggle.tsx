"use client";

import {DisplayStyle} from "@/app/projects/[project]/model";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

export interface DisplayStyleToggle {
    displayStyle: DisplayStyle;
    handleChange: (value: DisplayStyle) => void;
}

export const DisplayStyleToggle = ({displayStyle, handleChange}: DisplayStyleToggle) => {
    return (
        <ToggleButtonGroup
            value={displayStyle}
            exclusive
            onChange={(event, value) => handleChange(value)}
            aria-label="text alignment"
        >
            <ToggleButton value={DisplayStyle.DAILY} aria-label="left aligned">
                Daily
            </ToggleButton>
            <ToggleButton value={DisplayStyle.WEEKLY} aria-label="centered">
                Weekly
            </ToggleButton>
            <ToggleButton value={DisplayStyle.MONTHLY} aria-label="right aligned">
                Monthly
            </ToggleButton>
        </ToggleButtonGroup>
    )
}