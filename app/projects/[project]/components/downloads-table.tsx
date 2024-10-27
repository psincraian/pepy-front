import React from "react";
import { DownloadsResponse } from "@/app/projects/[project]/helper/compute_downloads";
import { TableHeader } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";

interface DownloadsChartProps {
  selectedVersions: string[];
  data: DownloadsResponse[];
}

const DownloadsTable: React.FC<DownloadsChartProps> = (props) => {
  const data = [...props.data];
  const downloads = data.reverse();

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            {props.selectedVersions.map((version) => (
              <TableHead key={version} className="text-right">{version}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {downloads.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              {props.selectedVersions.map((version) => (
                <TableCell key={version} className="text-right">
                  {row[version as keyof typeof row]?.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
};

export default DownloadsTable;
