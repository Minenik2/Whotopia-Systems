import React from "react";
import {
  DataTable,
  TableBody,
  DataTableCell,
  DataTableColumnHeader,
  TableFoot,
  TableHead,
  DataTableRow,
} from "@dhis2/ui";

export function DatasetsTable(props) {
  return (
    <DataTable>
      <TableHead>
        <DataTableRow>
          <DataTableColumnHeader>Name</DataTableColumnHeader>
          <DataTableColumnHeader>Amount</DataTableColumnHeader>
          <DataTableColumnHeader>After Transaction</DataTableColumnHeader>
          <DataTableColumnHeader>Created</DataTableColumnHeader>
          <DataTableColumnHeader>Dispensed By</DataTableColumnHeader>
          <DataTableColumnHeader>Dispensed To</DataTableColumnHeader>
        </DataTableRow>
      </TableHead>
      <TableBody>
        <DataTableRow>
          <DataTableCell>{props.selectedItem.label}</DataTableCell>
          <DataTableCell>{props.selectedItem.value}</DataTableCell>
          <DataTableCell>{props.selectedItem.afterTransaction}</DataTableCell>
          <DataTableCell>{props.selectedItem.period}</DataTableCell>
          <DataTableCell>{props.selectedItem.dispensedBy}</DataTableCell>
          <DataTableCell>{props.selectedItem.DispensedTo}</DataTableCell>
        </DataTableRow>
      </TableBody>
      <TableFoot></TableFoot>
    </DataTable>
  );
}
