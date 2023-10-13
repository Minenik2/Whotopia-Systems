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
          <TableCell>{props.selectedItem.displayName}</TableCell>
          <TableCell>{props.selectedItem.id}</TableCell>
          <TableCell>{props.selectedItem.created}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
