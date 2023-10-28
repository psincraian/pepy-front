import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { DownloadsResponse } from "@/app/projects/[project]/helper/compute_downloads";

interface DownloadsChartProps {
  selectedVersions: string[];
  data: DownloadsResponse[];
}

const DownloadsTable: React.FC<DownloadsChartProps> = (props) => {
  const [showMore, setShowMore] = useState(false);

  const data = [...props.data];
  const downloads = data.reverse();

  return (
    <TableContainer sx={{ marginTop: "16px", maxHeight: "500px" }}>
      <Table id="downloads-table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 100 }}>Date</TableCell>
            {props.selectedVersions.map((version) => (
              <TableCell key={version}>{version}</TableCell>
            ))}
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {downloads.map((row) => (
            <TableRow
              sx={
                new Date(row["date"]).getDay() % 6 === 0
                  ? { backgroundColor: "#fafafa" }
                  : {}
              }
              key={row["date"]}
            >
              <TableCell scope="row">{row["date"]}</TableCell>
              {props.selectedVersions.map((version) => (
                <TableCell key={version}>
                  {row[version].toLocaleString()}
                </TableCell>
              ))}
              <TableCell align="right">{row["sum"].toLocaleString()}</TableCell>
              <TableCell align="right">
                {row["total"].toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DownloadsTable;
