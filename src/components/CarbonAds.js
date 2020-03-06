import React, { Component } from 'react';

class CarbonAds extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    var carbonAdsParent = document.getElementById('carbonadselem');

    script.src =
      'https://cdn.carbonads.com/carbon.js?serve=CE7DEKQE&placement=pepytech';
    script.async = true;
    script.id = '_carbonads_js';

    carbonAdsParent.appendChild(script);
  }

  render() {
    return <div id="carbonadselem"></div>;
  }
}

export default CarbonAds;
