'use client';

import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

interface LoggedUsersTooltipProps {
    display: boolean;
    children: any;
}

const LoggedUsersTooltip: React.FC<LoggedUsersTooltipProps> = ({ display, children  }) => {
    const message = "You must be logged in to access this feature."; // Same message across the website

    return (
        <Tooltip title={display ? message : "You must be a logged user to access this feature."}>
            {children}
        </Tooltip>
    );
};

LoggedUsersTooltip.propTypes = {
    display: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default LoggedUsersTooltip;
