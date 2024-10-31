"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AD_LOAD_TIMEOUT = 1_000;

const Ads: React.FC = () => {
  const [isAdsLoaded, setIsAdsLoaded] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const renderCarbonAds = () => {
    const script = document.createElement("script");
    const carbonAdsParent = document.getElementById("adselem");

    if (!carbonAdsParent) return;

    // Clear any existing content
    carbonAdsParent.innerHTML = "";

    script.src =
      "https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech";
    script.async = true;
    script.id = "_carbonads_js";

    script.onload = () => {
      // Check if the ad was actually loaded
      setTimeout(() => {
        const adContent = document.getElementById("carbonads");
        const isLoaded = !!adContent;
        setIsAdsLoaded(isLoaded);
        setShowMessage(!isLoaded);
      }, AD_LOAD_TIMEOUT);
    };
    script.onerror = () => {
      setIsAdsLoaded(false);
      setShowMessage(true);
    };

    carbonAdsParent.appendChild(script);
  };

  const renderEthicalAds = () => {
    const adsParent = document.getElementById("adselem");

    if (!adsParent) return;

    // Clear any existing content
    adsParent.innerHTML = "";

    // Create the container for Ethical Ads
    const adContainer = document.createElement("div");
    adContainer.className = "horizontal";
    adContainer.setAttribute("data-ea-publisher", "pepytech");
    adContainer.setAttribute("data-ea-type", "text");
    adsParent.appendChild(adContainer);

    const script = document.createElement("script");
    script.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
    script.async = true;
    script.id = "_ethical";

    script.onload = () => {
      // Check if the ad was actually loaded
      setTimeout(() => {
        const adContent = adsParent.querySelector(".ea-content");
        const isLoaded = !!adContent;
        setIsAdsLoaded(isLoaded);
        setShowMessage(!isLoaded);
      }, AD_LOAD_TIMEOUT);
    };
    script.onerror = () => {
      setIsAdsLoaded(false);
      setShowMessage(true);
    };

    adsParent.appendChild(script);
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

    return () => {
      // Cleanup any existing ad scripts
      const carbonScript = document.getElementById("_carbonads_js");
      const ethicalScript = document.getElementById("_ethical");
      carbonScript?.remove();
      ethicalScript?.remove();
    };
  }, []);

  return (
    <div className="space-y-4 min-h[100px]">
      <div id="adselem"></div>

      {showMessage && !isAdsLoaded && (
        <Alert variant="destructive" className="border-none">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">
            This website is supported by ads. Please consider disabling your ad blocker to help us maintain our
            services.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Ads;