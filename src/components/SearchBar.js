import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const styles = (theme) => ({
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

const SearchBar = ({ classes, onSearch, value }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (e) => {
    if (e.charCode === 13 || e.key === 'Enter') {
      handleRequestSearch();
    }
  };

  const handleRequestSearch = () => {
    onSearch(query);
  };

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Paper className={classes.root} elevation={1}>
        <InputBase
          onChange={handleOnChange}
          onKeyUp={handleKeyPress}
          className={classes.input}
          placeholder="Search a Python project"
          value={value}
          data-cy="search-input"
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={handleRequestSearch}
          data-cy="search-button"
          size="large"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default withStyles(styles)(SearchBar);
