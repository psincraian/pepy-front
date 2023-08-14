import React from 'react';
import { Grid, Container } from '@mui/material';
import Emoji from '@/app/components/emoji';
import styles from './footer.module.css';
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {

    return (
        <footer className={styles.footer}>
            <Container maxWidth="sm">
                <Grid container spacing={2} rowSpacing={4} justifyContent={"center"}>
                    <Grid item xs={12} sm={12} className={styles.imgContainer}>
                        <Link
                            className={styles.link}
                            aria-label="Source code"
                            target="_blank"
                            href="https://www.digitalocean.com/?refcode=7bf782110d6c&utm_campaign=Referral_Invite&utm_medium=opensource&utm_source=pepy"
                        >
                            <Image className={styles.img} src="/do-logo.png" width={200} height={41.6} alt="Digital Ocean sponsored by logo" />
                        </Link>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Link
                            className={styles.link}
                            aria-label="Source code"
                            target="_blank"
                            href="https://github.com/psincraian/pepy"
                        >
                            We <Emoji symbol="❤️" label="heart" /> open source
                        </Link>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Link
                            className={styles.link}
                            aria-label="Follow us"
                            target="_blank"
                            href="https://twitter.com/psincraian"
                        >
                            <Emoji symbol="👤" label="person" /> Follow us
                        </Link>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Link
                            className={styles.link}
                            aria-label="Support us"
                            target="_blank"
                            href="https://github.com/sponsors/psincraian/"
                        >
                            <Emoji symbol="➕" label="plus" /> Support us
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
