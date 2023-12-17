import styles from "./app_bar.module.css";
import Link from "next/link";
import { getCurrentUser, User } from "@/app/user/helper/auth";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";

export interface AppBarUserOptionsProps {
  isMobileView: boolean;
}

export const AppBarUserOptions = ({ isMobileView }: AppBarUserOptionsProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user));
  }, []);

  const proChip = currentUser?.isPro ? (<Chip sx={{marginLeft: '4px'}} label={"Pro"} size="small" color="default"  />) : (<div className={styles.proChip}>PRO</div>);

  function renderDesktopView() {
    return currentUser ? (
      <Link className={styles.link} href="/user" passHref>
        <div className={styles.sectionFirst}>Hi {currentUser.username}{proChip}</div>
      </Link>
    ) : (
      <>
        <Link className={styles.link} href="/user/login" passHref>
          <div className={styles.sectionFirst}>Login</div>
        </Link>
        <div className={styles.linkSmallSpace}>|</div>
        <Link className={styles.linkSmallSpace} href="/user/signup" passHref>
          <div className={styles.sectionFirst}>{' '}Sign up</div>
        </Link>
      </>
    );
  }

  function renderMobileView() {
    return currentUser ? (
      <MenuItem>
        <Link className={styles.link} href="/user" passHref>
          <div className={styles.sectionFirst}>Profile</div>
        </Link>
      </MenuItem>
    ) : (
      <>
        <MenuItem>
          <Link className={styles.link} href="/user/login" passHref>
            <div className={styles.sectionFirst}>Login</div>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className={styles.link} href="/user/signup" passHref>
            <div className={styles.sectionFirst}>Sign up</div>
          </Link>
        </MenuItem>
      </>
    );
  }

  return isMobileView ? renderMobileView() : renderDesktopView();
};
