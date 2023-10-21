import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFoot,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";

export function Commodities(mergedData) {
  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Name</TableCellHead>
          <TableCellHead>Amount</TableCellHead>
          <TableCellHead>Id</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        {mergedData.map((row) => {
          return (
            <TableRow key={row.id}>
              <TableCell>{row.displayName.substring([14])}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.id}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
