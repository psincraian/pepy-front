import styles from './app_bar.module.css'
import Link from 'next/link';
import {User} from "@/app/user/helper/auth";

export interface AppBarUserOptionsProps {
    currentUser: null | User
}

export const AppBarUserOptions = ({currentUser}: AppBarUserOptionsProps) => {
    return currentUser ? (
        <Link className={styles.link} href="/user" passHref>
            <div className={styles.sectionFirst}>Hi {currentUser.username}</div>
        </Link>
    ) : (
        <>
            <Link className={styles.link} href="/user/login" passHref>
                <div className={styles.sectionFirst}>Login</div>
            </Link>
            <Link className={styles.link} href="/user/signup" passHref>
                <div className={styles.sectionFirst}>Sign up</div>
            </Link>
        </>
    );
};