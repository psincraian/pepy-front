"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const styles = {
  root: {
    padding: 1,
    minWidth: 300,
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    marginLeft: 1,
    flexGrow: 1,
  },
  iconButton: {
    padding: 1,
    alignSelf: "top",
  },
};

export default function SearchBar() {
  const [searchValue, setSearch] = useState("");
  const router = useRouter();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRequestSearch();
    }
  };

  const handleRequestSearch = () => {
    router.push("/projects/" + searchValue);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Paper sx={styles["root"]}>
        <InputBase
          onChange={handleOnChange}
          onKeyUp={handleKeyPress}
          sx={styles["input"]}
          placeholder="Search a Python project"
          value={searchValue}
          data-cy="search-input"
        />
        <IconButton
          sx={styles["iconButton"]}
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
}
