import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter, Link } from 'react-router-dom';
import GithubIcon from './GithubIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function SearchAppBar(props) {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleSearchValueChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSearchAction() {
    props.history.push('/project/' + searchValue);
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      handleSearchAction();
    }
  }

  const AdapterLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} {...props} />
  ));

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component="a" href="https://github.com/psincraian/pepy">
        <IconButton aria-label="Source Code" color="inherit">
          <GithubIcon />
        </IconButton>
        <p>Github</p>
      </MenuItem>
      <MenuItem component={AdapterLink} to="/about">
        <IconButton aria-label="FAQ" color="inherit">
          <InfoIcon />
        </IconButton>
        <p>FAQ</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            component={AdapterLink}
            to="/"
            noWrap
          >
            PePy
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchValue}
              onChange={handleSearchValueChange}
              onKeyDown={handleKeyPress}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="Source code"
              color="inherit"
              component="a"
              href="https://github.com/psincraian/pepy"
            >
              <GithubIcon color="white" />
            </IconButton>
            <IconButton
              aria-label="FAQ"
              color="inherit"
              component={AdapterLink}
              to="/about"
            >
              <InfoIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default withRouter(SearchAppBar);
