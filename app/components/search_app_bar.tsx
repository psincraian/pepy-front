'use client'
import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import {alpha, makeStyles} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import {IconButton, Menu, MenuItem} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import {AppBarSearchComponent} from "@/app/components/app_bar_search_component";


const PREFIX = 'SearchAppBar';

const classes = {
    root: `${PREFIX}-root`,
    grow: `${PREFIX}-grow`,
    menuButton: `${PREFIX}-menuButton`,
    title: `${PREFIX}-title`,
    sectionDesktop: `${PREFIX}-sectionDesktop`,
    sectionMobile: `${PREFIX}-sectionMobile`,
    toolbarContent: `${PREFIX}-toolbarContent`,
    sectionFirst: `${PREFIX}-sectionFirst`,
    section: `${PREFIX}-section`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        display: 'flex',
    },

    [`& .${classes.grow}`]: {
        flexGrow: 1,
    },

    [`& .${classes.menuButton}`]: {
        marginRight: theme.spacing(2),
    },

    [`& .${classes.title}`]: {
        textDecoration: 'none',
        marginRight: theme.spacing(2),
        color: 'inherit',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    [`& .${classes.sectionDesktop}`]: {
        display: 'none',
        textDecoration: 'none',
        color: 'inherit',
        marginLeft: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },

    [`& .${classes.sectionMobile}`]: {
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    [`& .${classes.toolbarContent}`]: {
        [theme.breakpoints.up(900 + parseInt(theme.spacing(3 * 2)))]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    [`& .${classes.sectionFirst}`]: {
        color: 'inherit',
        textDecoration: 'none',
    },

    [`& .${classes.section}`]: {
        color: 'inherit',
        textDecoration: 'none',
        marginLeft: theme.spacing(2),
    }
}));

interface SearchAppBarProps {
    withSearch?: boolean;
}

const SearchAppBar: React.FC<SearchAppBarProps> = ({withSearch = true}) => {


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
        <Root className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbarContent}>
                    {/* Logo and site name */}
                    <Link href="/">
                        <div className={classes.sectionFirst}>
                            <Typography className={classes.title} variant="h6" noWrap>
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
                    <div className={classes.sectionDesktop}>
                        <Link href="/newsletter" passHref>
                            <div className={classes.sectionFirst}>Newsletter</div>
                        </Link>
                    </div>

                    {/* Mobile view icon for navigation items */}
                    <div className={classes.sectionMobile}>
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
            </AppBar>

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
                    <Link href="/newsletter" passHref>
                        <div className={classes.sectionFirst}>Newsletter</div>
                    </Link>
                </MenuItem>
            </Menu>
        </Root>
    );
}

export default SearchAppBar;