'use client';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from './app_bar_search_component.module.css'

export const AppBarSearchComponent: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const router = useRouter();

    const handleSearchAction = () => {
        router.push(`/projects/${searchValue}`);
    };

    return (
        <div className={styles.search}>
            <div className={styles.searchIcon}>
                <SearchIcon />
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
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
}
