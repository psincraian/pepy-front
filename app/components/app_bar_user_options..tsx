import styles from "./app_bar.module.css";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import { ProBadge } from "@/app/components/app_bar_user_pro_badge";
import { useUser } from "@/app/user/UserContext";
export interface AppBarUserOptionsProps {
  isMobileView: boolean;
}

export const AppBarUserOptions = ({ isMobileView }: AppBarUserOptionsProps) => {
  const { user, error } = useUser();

  const proChip = user?.isPro ? (<ProBadge />) : null;

  function renderDesktopView() {
    return user ? (
      <Link className={styles.link} href="/user" passHref>
        <div className={styles.sectionFirst}>Hi {user.username}{proChip}</div>
      </Link>
    ) : (
      <>
        <Link className={styles.link} href="/user/login" passHref>
          <div className={styles.sectionFirst}>Login</div>
        </Link>
        <div className={styles.linkSmallSpace}>|</div>
        <Link className={styles.linkSmallSpace} href="/user/signup" passHref>
          <div className={styles.sectionFirst}>{" "}Sign up</div>
        </Link>
      </>
    );
  }

  function renderMobileView() {
    return user ? (
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
