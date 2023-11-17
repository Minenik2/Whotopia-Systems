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

export function TransactionsTable(props) {
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
        {props.mergedData.toReversed().map((row) => (
          <DataTableRow key={row.id}>
            <DataTableCell>{row.label}</DataTableCell>
            <DataTableCell>{row.value}</DataTableCell>
            <DataTableCell>{row.afterTransaction}</DataTableCell>
            <DataTableCell>{row.period}</DataTableCell>
            <DataTableCell>{row.dispensedBy}</DataTableCell>
            <DataTableCell>{row.DispensedTo}</DataTableCell>
          </DataTableRow>
        ))}
      </TableBody>
      <TableFoot></TableFoot>
    </DataTable>
  );
}
