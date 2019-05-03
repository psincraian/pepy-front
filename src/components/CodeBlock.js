import React, { Component } from 'react';
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import FileCopy from '@material-ui/icons/FileCopyOutlined';

class CodeBlock extends Component {
  state = {
    snackbarOpen: false,
    message: '',
  };

  showMessage = message => {
    this.setState({ snackbarOpen: true, message: message });
  };

  handleClickCopyContent = () => {
    navigator.clipboard.writeText(this.props.content).then(
      () => {
        this.showMessage('Text copied');
      },
      () => {
        this.showMessage('Failed to copy');
      }
    );
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    return (
      <>
        <OutlinedInput
          disabled
          margin="dense"
          labelWidth={0}
          value={this.props.content}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Copy content"
                onClick={this.handleClickCopyContent}
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
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
        />
      </>
    );
  }
}

export default CodeBlock;
