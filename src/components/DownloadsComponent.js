import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

class DownloadsComponent extends Component {
  state = {
    showMore: false,
  };

  handleShowMoreClicked = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  render() {
    const numberOfElementsToShow = this.state.showMore ? 30 : 7;
    const downloads = Object.keys(this.props.downloads).slice(
      0,
      numberOfElementsToShow
    );
    const buttonText = this.state.showMore ? 'Show fewer' : 'Show more';
    return (
      <Card>
        <CardHeader title="Last downloads" />
        <CardContent>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Downloads</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {downloads.map(date => (
                    <TableRow key={date}>
                      <TableCell component="th" scope="row">
                        {date}
                      </TableCell>
                      <TableCell align="right">
                        {this.props.downloads[date]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item>
              <Button onClick={this.handleShowMoreClicked}>{buttonText}</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default DownloadsComponent;
