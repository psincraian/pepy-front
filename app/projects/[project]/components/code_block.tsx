"use client";
import React, { useState } from "react";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar
} from "@mui/material";
import FileCopy from "@mui/icons-material/FileCopyOutlined";
import { Button } from "@mui/material";

interface CodeBlockProps {
  rows?: number;
  content: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
                                               rows = 1,
                                               content,
                                               className
                                             }) => {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [id, setId] = useState<string>(
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );

  const showMessage = (message: string) => {
    setMessage(message);
    setSnackbarOpen(true);
  };

  const handleClickCopyContent = () => {
    navigator.clipboard.writeText(content).then(
      function() {
        showMessage("Text copied"); // success
      })
      .catch(
        function() {
          showMessage("Error in copying");  // error
        });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickCopyContent} variant="outlined">Copy MarkDown</Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{message}</span>}
      />
    </>
  );
};

export default CodeBlock;
