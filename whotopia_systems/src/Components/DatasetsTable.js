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

export function DatasetsTable(props) {
  return (
    <Table>
      <TableHead>
        <TableRowHead>
          <TableCellHead>Display Name</TableCellHead>
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Created</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{props.selectedItem.dispensedTo}</TableCell>
          <TableCell>{props.selectedItem.comoodityId}</TableCell>
          <TableCell>{props.selectedItem.period}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
