'use client'
import React, {useEffect} from 'react';
import styles from './ads.module.css';
import './ads.css';
import Script from "next/script";


const Ads: React.FC = () => {

    const randomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const url = randomInteger(0, 10) <= 10 ? "https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech" :
        "https://media.ethicalads.io/media/client/ethicalads.min.js";

    return (
        <div className={styles.adsContainer}>
            <Script src={url} strategy="lazyOnload" id="_carbonads_js"/>
            <div id="_carbonads_js"></div>
            <div id="_ethical"></div>
            <div
                className="horizontal"
                data-ea-publisher="pepytech"
                data-ea-type="image"
            ></div>
        </div>
    );
};

export default Ads;
