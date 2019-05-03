import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  findLocationContainer: {
    padding: '100px',
  },
});

class SearchBar extends Component {
  state = {
    locationOpen: false,
    query: '',
  };

  constructor(props) {
    super(props);
  }

  handleKeyPress = e => {
    if (e.charCode === 13 || e.key === 'Enter') {
      this.handleRequestSearch();
    }
  };

  handleRequestSearch = () => {
    this.props.onSearch(this.state.query);
  };

  handleOnChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Paper className={classes.root} elevation={1}>
          <InputBase
            onChange={this.handleOnChange}
            onKeyUp={this.handleKeyPress}
            className={classes.input}
            placeholder="Search a Python project"
            value={this.props.value}
            data-cy="search-input"
          />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={this.handleRequestSearch}
            data-cy="search-button"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </>
    );
  }
}

export default withStyles(styles)(SearchBar);
