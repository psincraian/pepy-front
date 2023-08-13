'use client'
import React, {useState} from 'react';
import {default as MuiAppBar} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import {AppBarSearchComponent} from "@/app/components/app_bar_search_component";
import styles from './app_bar.module.css'

interface SearchAppBarProps {
    withSearch?: boolean;
}

const AppBar: React.FC<SearchAppBarProps> = ({withSearch = true}) => {


    // State variables for search value and mobile menu control
    const [searchValue, setSearchValue] = useState<string>('');
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Next.js router for programmatic navigation
    const router = useRouter();

    // Navigate to the project page based on search value
    const handleSearchAction = () => {
        router.push(`/projects/${searchValue}`);
    };

    return (
        <header>
            <MuiAppBar position="static" sx={{flex: 1, flexDirection: 'row'}}>
                <Toolbar className={styles.toolbarContent}>
                    {/* Logo and site name */}
                    <Link href="/" className={styles.link}>
                        <div className={styles.sectionFirst}>
                            <Typography className={styles.title} variant="h6" noWrap>
                                PePy
                            </Typography>
                        </div>
                    </Link>

                    {/* Search input */}
                    {withSearch && <AppBarSearchComponent
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        handleSearchAction={handleSearchAction}/>}

                    {/* Desktop view for navigation items */}
                    <div className={styles.sectionDesktop}>
                        <Link className={styles.link} href="/newsletter" passHref>
                            <div className={styles.sectionFirst}>Newsletter</div>
                        </Link>
                    </div>

                    {/* Mobile view icon for navigation items */}
                    <div className={styles.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                            onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </MuiAppBar>

            {/* Mobile menu */}
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={() => setMobileMoreAnchorEl(null)}
            >
                <MenuItem>
                    <Link className={styles.link} href="/newsletter" passHref>
                        <div className={styles.sectionFirst}>Newsletter</div>
                    </Link>
                </MenuItem>
            </Menu>
        </header>
    );
}

export default AppBar;