import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {Table, TableBody, TableContainer} from "@material-ui/core";


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

    return Object.keys(data).map(version => ({version: version, downloads: data[version]})).sort((x, y) => y.downloads - x.downloads);
  }

  render() {
    const data = this.downloadsByVersions(this.props.data.downloads);
    const {classes} = this.props;

    return (
      <Card data-cy="downloads">
        <CardHeader title="Downloads"/>
        <CardContent>
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{minWidth: 100}}>Version</TableCell>
                  <TableCell style={{minWidth: 100}}>Monthly downloads</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => {
                  return (
                    <TableRow key={row.version}>
                      <TableCell scope="row">{row.version}</TableCell>
                      <TableCell scope="row">{formatDownloads(row.downloads)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }

}

export default withStyles(styles)(RecentVersions);
