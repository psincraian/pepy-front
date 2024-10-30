"use client";
import React, { useEffect } from "react";

const Ads: React.FC = () => {
  const renderCarbonAds = () => {
    const script = document.createElement("script");
    const carbonAdsParent = document.getElementById("adselem");

    script.src =
      "https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech";
    script.async = true;
    script.id = "_carbonads_js";

    carbonAdsParent?.appendChild(script);
  };

  const renderEthicalAds = () => {
    const script = document.createElement("script");
    const adsParent = document.getElementById("adselem");

    script.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
    script.async = true;
    script.id = "_ethical";

    adsParent?.appendChild(script);
  };

  const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    if (randomInteger(1, 10) <= 0) {
      renderCarbonAds();
    } else {
      renderEthicalAds();
    }
  }, []);

  return (
    <div>
      <div id="adselem"></div>
      <div
        className="horizontal"
        data-ea-publisher="pepytech"
        data-ea-type="text"
      ></div>
    </div>
  );
};

export default Ads;
