import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  container: {
    maxHeight: 440,
  },
  weekendRow: {
    backgroundColor: "#fafafa",
  },
});

const DownloadsTable = ({ classes, data, selectedVersions }) => {
  const downloads = [...data].reverse();
  return (
    <TableContainer className={classes.container}>
      <Table id="downloads-table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 100 }}>Date</TableCell>
            {selectedVersions.map((version) => (
              <TableCell key={version}>{version}</TableCell>
            ))}
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {downloads.map((row) => {
            return (
              <TableRow
                className={
                  new Date(row["date"]).getDay() % 6 === 0
                    ? classes.weekendRow
                    : ""
                }
                key={row["date"]}
              >
                <TableCell scope="row">{row["date"]}</TableCell>
                {selectedVersions.map((version) => (
                  <TableCell key={version}>
                    {row[version].toLocaleString()}
                  </TableCell>
                ))}
                <TableCell align="right">
                  {row["sum"].toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row["total"].toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withStyles(styles)(DownloadsTable);
