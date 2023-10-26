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
  console.log(mergedData.mergedData);

  return (
    <>
      <h1>Store commodities</h1>
      <p>
        This is an overview of all the commodities and their current stock in
        the store.
      </p>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Name</TableCellHead>
            <TableCellHead>Amount</TableCellHead>
            <TableCellHead>Id</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {mergedData.mergedData.map((row) => {
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
    </>
  );
}
