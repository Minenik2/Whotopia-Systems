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
          <TableCellHead>ID</TableCellHead>
          <TableCellHead>Amount</TableCellHead>
          <TableCellHead>Created</TableCellHead>
          <TableCellHead>Dispensed By</TableCellHead>
          <TableCellHead>Dispensed To</TableCellHead>
        </TableRowHead>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{props.selectedItem.commodityId}</TableCell>
          <TableCell>{props.selectedItem.value}</TableCell>
          <TableCell>{props.selectedItem.period}</TableCell>
          <TableCell>{props.selectedItem.dispensedBy}</TableCell>
          <TableCell>{props.selectedItem.DispensedTo}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
