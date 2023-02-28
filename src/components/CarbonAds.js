import React, { useEffect } from "react";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  adsContainer: {
    maxWidth: "360px",
  },
});

const CarbonAds = (props) => {
  const renderCarbonAds = () => {
    const script = document.createElement("script");
    var carbonAdsParent = document.getElementById("carbonadselem");

    script.src =
      "https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech";
    script.async = true;
    script.id = "_carbonads_js";

    carbonAdsParent.appendChild(script);
  };

  const renderEthicalAds = () => {
    const script = document.createElement("script");
    var carbonAdsParent = document.getElementById("carbonadselem");

    script.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
    script.async = true;
    script.id = "_ethical";

    carbonAdsParent.appendChild(script);
  };

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    if (randomInteger(1, 10) <= 5) {
      renderCarbonAds();
    } else {
      renderEthicalAds();
    }
  }, []);

  const { classes } = props;

  return (
    <div className={classes.adsContainer}>
      <div id="carbonadselem"></div>
      <div
        className="horizontal"
        data-ea-publisher="pepytech"
        data-ea-type="image"
      ></div>
    </div>
  );
};

export default withStyles(styles)(CarbonAds);
