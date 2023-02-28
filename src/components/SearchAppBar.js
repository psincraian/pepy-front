import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { withRouter, Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: "none",
    marginRight: theme.spacing(2),
    color: "inherit",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(),
      width: "100%",
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  sectionDesktop: {
    display: "none",
    textDecoration: "none",
    color: "inherit",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    textDecoration: "none",
    color: "inherit",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbarContent: {
    [theme.breakpoints.up(900 + theme.spacing(3 * 2))]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  sectionFirst: {
    color: "inherit",
    textDecoration: "none",
  },
  section: {
    color: "inherit",
    textDecoration: "none",
    marginLeft: theme.spacing(2),
  },
}));

const SearchAppBar = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState("");

  function handleSearchValueChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSearchAction() {
    props.history.push("/project/" + searchValue);
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13) {
      handleSearchAction();
    }
  }

  const AdapterLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} {...props} />
  ));

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbarContent}>
          <Link component={AdapterLink} to="/" className={classes.sectionFirst}>
            <Typography className={classes.title} variant="h6" noWrap>
              PePy
            </Typography>
          </Link>
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
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(SearchAppBar);
