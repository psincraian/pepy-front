'use client'
import React, {useState} from 'react';
import {default as MuiAppBar} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import {AppBarSearchComponent} from "@/app/components/app_bar_search_component";
import styles from './app_bar.module.css'
import {AppBarUserOptions} from "@/app/components/app_bar_user_options.";

interface SearchAppBarProps {
    withSearch?: boolean;
}

const AppBar: React.FC<SearchAppBarProps> = ({withSearch = true}) => {
    // State variables for search value and mobile menu control
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    return (
        <header className={styles.header}>
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
                    {withSearch && <AppBarSearchComponent/>}

                    {/* Desktop view for navigation items */}
                    <div className={styles.sectionDesktop}>
                        <Link className={styles.link} href="/newsletter" passHref>
                            <div className={styles.sectionFirst}>Newsletter</div>
                        </Link>
                        <Link className={styles.link} href="/pricing" passHref>
                            <div className={styles.sectionFirst}>Pricing</div>
                        </Link>
                        <AppBarUserOptions isMobileView={false}/>
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
                <MenuItem>
                    <Link className={styles.link} href="/pricing" passHref>
                        <div className={styles.sectionFirst}>Pricing</div>
                    </Link>
                </MenuItem>
                <AppBarUserOptions isMobileView={true}/>
            </Menu>
        </header>
    );
}

export default AppBar;