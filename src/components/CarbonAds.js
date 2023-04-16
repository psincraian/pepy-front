import React, { Component } from 'react';
import { withStyles } from '@mui/styles';

const styles = (theme) => ({
  adsContainer: {
    maxWidth: '360px',
  },
});

class CarbonAds extends Component {
  renderCarbonAds() {
    const script = document.createElement('script');
    var carbonAdsParent = document.getElementById('carbonadselem');

    script.src =
      'https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech';
    script.async = true;
    script.id = '_carbonads_js';

    carbonAdsParent.appendChild(script);
  }

  renderEthicalAds() {
    const script = document.createElement('script');
    var carbonAdsParent = document.getElementById('carbonadselem');

    script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
    script.async = true;
    script.id = '_ethical';

    carbonAdsParent.appendChild(script);
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount() {
    if (this.randomInteger(1, 10) <= 2) {
      this.renderCarbonAds();
    } else {
      this.renderEthicalAds();
    }
  }

  render() {
    const { classes } = this.props;

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
  }
}

export default withStyles(styles)(CarbonAds);
