'use client';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import React from "react";
import styles from './app_bar_search_component.module.css'

interface SearchComponentProps {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    handleSearchAction: () => void;
}

export const AppBarSearchComponent: React.FC<SearchComponentProps> = ({
                                                                          searchValue,
                                                                          setSearchValue,
                                                                          handleSearchAction,
                                                                      }) => {
    return (
        <div className={styles.search}>
            <div className={styles.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search…"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && handleSearchAction()}
                classes={{
                    root: styles.inputRoot,
                    input: styles.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>
    );
}
