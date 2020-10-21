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

  constructor(props) {
    super(props);

    const randomId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.state = {
      snackbarOpen: false,
      message: '',
      id: randomId,
    };
  }

  showMessage = (message) => {
    this.setState({ snackbarOpen: true, message: message });
  };

  handleClickCopyContent = () => {
    var copyText = document.getElementById(this.state.id);
    copyText.disabled = false;
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
    copyText.disabled = true;
    this.showMessage('Text copied');
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    return (
      <>
        <OutlinedInput
          id={this.state.id}
          disabled
          multiline
          rows={this.props.rows ?? 1}
          margin="dense"
          labelWidth={0}
          value={this.props.content}
          className={this.props.className}
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
