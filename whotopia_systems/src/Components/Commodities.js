import React, { useState } from "react";
import {
  DataTable,
  TableBody,
  DataTableCell,
  DataTableColumnHeader,
  TableHead,
  DataTableRow,
} from "@dhis2/ui";
import { Input } from "@dhis2-ui/input";

export function Commodities(mergedData) {
  const [filterword, setFilterword] = useState("");

  window.addEventListener("keyup", (event) => handleSearch(event));

  const handleSearch = (event) => {
    setFilterword(event.target.value.toLowerCase());
    console.log(event.target.value);
  };

  return (
    <>
      <h1>Life-Saving Commodities</h1>
      <p>
        This is an overview of all the commodities and their current stock in
        the store.
      </p>

      <label for="searchInput">Find a Commodity</label>

      <Input
        label="Find a Commodity"
        name="searchInput"
        id="searchInput"
        placeholder="Search by commodity name..."
      />
      <br />

      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader large>Commodity name</DataTableColumnHeader>
            <DataTableColumnHeader large>Amount in stock</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {mergedData.mergedData.map((row) => {
            if (
              row.displayName.substring([14]).toLowerCase().includes(filterword)
            ) {
              return (
                <DataTableRow key={row.id}>
                  <DataTableCell>
                    {row.displayName.substring([14])}
                  </DataTableCell>
                  <DataTableCell>{row.value}</DataTableCell>
                </DataTableRow>
              );
            } else {
              return;
            }
          })}
        </TableBody>
      </DataTable>
    </>
  );
}
