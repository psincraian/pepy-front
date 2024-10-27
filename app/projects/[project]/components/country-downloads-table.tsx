import React from "react";
import { TableHeader } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";

interface CountryTableProp {
  data: { [country: string]: number };
}

const DownloadsTable: React.FC<CountryTableProp> = (props) => {

  const entriesSortedByDownloads = Object.entries(props.data).map(([country, downloads]) => {
    return {
      country: country,
      downloads: downloads
    };
  }).sort((a, b) => {
    return b.downloads - a.downloads;
  });

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Country</TableHead>
            <TableHead className={"text-right"}>Downloads</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entriesSortedByDownloads.map(({ country, downloads }) => (
            <TableRow key={country}>
              <TableCell>{country}</TableCell>
              <TableCell className="text-right">{downloads.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DownloadsTable;
