import React, { useState } from 'react';
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@mui/material';
import FileCopy from '@mui/icons-material/FileCopyOutlined';

const CodeBlock = ({ rows, content, className }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');

  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const showMessage = (message) => {
    setSnackbarOpen(true);
    setMessage(message);
  };

  const handleClickCopyContent = () => {
    var copyText = document.getElementById(id);
    copyText.disabled = false;
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
    copyText.disabled = true;
    showMessage('Text copied');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <OutlinedInput
        id={id}
        disabled
        multiline
        rows={rows ?? 1}
        margin="dense"
        value={content}
        className={className}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Copy content"
              onClick={handleClickCopyContent}
              size="large"
            >
              <FileCopy />
            </IconButton>
          </InputAdornment>
        }
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    </>
  );
};

export default CodeBlock;
