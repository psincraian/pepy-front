'use client'
import React, {useEffect} from 'react';
import {styled} from '@mui/material/styles';

const PREFIX = 'Ads';

const classes = {
    adsContainer: `${PREFIX}-adsContainer`
};

const Root = styled('div')((
    {
        theme: Theme
    }
) => ({
    [`&.${classes.adsContainer}`]: {
        maxWidth: '360px',
    }
}));

const Ads: React.FC = () => {


    const renderCarbonAds = () => {
        const script = document.createElement('script');
        const carbonAdsParent = document.getElementById('carbonadselem');

        script.src = 'https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech';
        script.async = true;
        script.id = '_carbonads_js';

        carbonAdsParent?.appendChild(script);
    };

    const renderEthicalAds = () => {
        const script = document.createElement('script');
        const carbonAdsParent = document.getElementById('carbonadselem');

        script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
        script.async = true;
        script.id = '_ethical';

        carbonAdsParent?.appendChild(script);
    };

    const randomInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useEffect(() => {
        if (randomInteger(1, 10) <= 2) {
            renderCarbonAds();
        } else {
            renderEthicalAds();
        }
    }, []);

    return (
        <Root className={classes.adsContainer}>
            <div id="carbonadselem"></div>
            <div
                className="horizontal"
                data-ea-publisher="pepytech"
                data-ea-type="image"
            ></div>
        </Root>
    );
};

export default Ads;
