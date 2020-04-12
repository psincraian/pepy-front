import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import Legend from "recharts/lib/component/Legend";
import Bar from "recharts/lib/cartesian/Bar";
import Tooltip from "recharts/lib/component/Tooltip";
import BarChart from "recharts/lib/chart/BarChart";
import {Checkbox} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


const styles = (theme) => ({
  container: {
    maxHeight: 440,
  },
});

function formatDownloads(downloads) {
  var precision = 1;
  if (downloads % 10 === 0) {
    precision = 0;
  }
  if (downloads < 1000) {
    return downloads;
  } else if (downloads < 1000000) {
    return (downloads / 1000).toFixed(precision) + 'K';
  } else if (downloads < 1000000000) {
    return (downloads / 1000000).toFixed(precision) + 'M';
  }

  return (downloads / 1000000000).toFixed(precision) + 'G';
}

class RecentVersions extends Component {

  state = {
    days: '7'
  }

  downloadsByVersions(downloads) {
    let data = [];
    Object.values(downloads).forEach(dn => {
      for (const [version, downloads] of Object.entries(dn)) {
        if (!(version in data)) {
          data[version] = 0;
        }
        data[version] += downloads;
      }
    })

    let result = Object.keys(data).map(key => {
      return {'version': key, 'downloads': data[key]}
    });
    result.sort(((a, b) => b.downloads - a.downloads));
    return result;
  }

  downloadsByVersionsOrderedByVersions(downloads, orderedVersions, days) {
    let data = {}
    orderedVersions.forEach(version => {data[version] = 0})
    Object.values(downloads).reverse().slice(0, days).forEach(dn => {
      for (const [version, downloads] of Object.entries(dn)) {
        data[version] += downloads;
      }
    })

    return orderedVersions.map(key => {
      return {'version': key, 'downloads': data[key]}
    });
  }

  handleChange = (event) => {
    this.setState({days: event.target.value})
  }

  render() {
    const data = this.downloadsByVersionsOrderedByVersions(this.props.data.downloads, this.props.data.versions, this.state.days);
    const {classes} = this.props;

    return (
      <Card data-cy="versions">
        <CardHeader title="Versions"/>
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Compute usage of last</FormLabel>
            <RadioGroup row aria-label="compute usage of" name="compute-usage-of" value={this.state.days} onChange={this.handleChange}>
              <FormControlLabel value="7" control={<Radio />} label="Week" />
              <FormControlLabel value="30" control={<Radio />} label="Month" />
            </RadioGroup>
          </FormControl>
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="version"/>
            <YAxis tickFormatter={(tick) => {
              return formatDownloads(tick);
            }}/>
            <Tooltip formatter={(downloads) => {
              return formatDownloads(downloads);
            }}/>
            <Legend/>
            <Bar dataKey="downloads" fill="#8884d8"/>
          </BarChart>
        </CardContent>
      </Card>
    );
  }

}

export default withStyles(styles)(RecentVersions);
