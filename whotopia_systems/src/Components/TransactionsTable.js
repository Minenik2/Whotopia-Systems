import React from "react";
import {
  DataTable,
  TableBody,
  DataTableCell,
  DataTableColumnHeader,
  TableHead,
  DataTableRow,
} from "@dhis2/ui";

export function TransactionsTable(props) {
  let dataArray = [];
  dataArray.push(props.data);

  let data = props.data;
  if (!Array.isArray(data)) {
    data = dataArray;
  }
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
        {data.toReversed().map((row) => (
          <DataTableRow key={row.id}>
            <DataTableCell>{row.label}</DataTableCell>
            <DataTableCell>{row.value}</DataTableCell>
            <DataTableCell>{row.afterTransaction}</DataTableCell>
            <DataTableCell>{row.period.replace("T", " ")}</DataTableCell>
            <DataTableCell>{row.dispensedBy}</DataTableCell>
            <DataTableCell>{row.DispensedTo}</DataTableCell>
          </DataTableRow>
        ))}
      </TableBody>
    </DataTable>
  );
}
