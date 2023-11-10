import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";
import { Input } from "@dhis2-ui/input";

export function Commodities(mergedData) {
  const [filterword, setFilterword] = useState("");
  // console log the arraylist of commodities if necessary
  //console.log(mergedData.mergedData);

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

      <Input
        label="Find a Commodity"
        name="searchInput"
        placeholder="Search..."
        type="text"
      />

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
            if (
              row.displayName.substring([14]).toLowerCase().includes(filterword)
            ) {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.displayName.substring([14])}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.id}</TableCell>
                </TableRow>
              );
            } else {
              return;
            }
          })}
        </TableBody>
      </Table>
    </>
  );
}
