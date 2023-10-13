'use client';
import React, { forwardRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

interface LoggedUsersTooltipProps {
    display: boolean;
    children: React.ReactNode;
}

const LoggedUsersTooltip = forwardRef<HTMLDivElement, LoggedUsersTooltipProps>(
    ({ display, children }, ref) => {
        const message = "You must be logged in to access this feature."; // Same message across the website

        return (
            <Tooltip title={display ? message : ""} disableHoverListener={!display} arrow>
                <div ref={ref}>{children}</div>
            </Tooltip>
        );
    }
);

LoggedUsersTooltip.propTypes = {
    display: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default LoggedUsersTooltip;
