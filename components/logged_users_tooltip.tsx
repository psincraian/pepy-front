"use client";

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

interface LoggedUsersTooltipProps {
  display: boolean;
  proOnly: boolean;
  children: any;
}

const LoggedUsersTooltip: React.FC<LoggedUsersTooltipProps> = ({
  display,
  proOnly,
  children,
}) => {
  const message = proOnly
    ? "You must be a Pro to access this feature."
    : "You must be logged in to access this feature.";

  if (!display) return children;

  return <Tooltip title={display ? message : ""}>{children}</Tooltip>;
};

LoggedUsersTooltip.propTypes = {
  display: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoggedUsersTooltip;
