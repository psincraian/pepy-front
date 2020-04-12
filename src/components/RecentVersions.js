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
    console.log(data);
    return data;
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
                {Object.keys(data).map(version => {
                  return (
                    <TableRow key={version}>
                      <TableCell scope="row">{version}</TableCell>
                      <TableCell scope="row">{data[version]}</TableCell>
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
