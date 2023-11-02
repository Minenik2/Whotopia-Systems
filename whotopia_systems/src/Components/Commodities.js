import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFoot,
  TableHead,
  TableRow,
  TableRowHead,
  InputField,
} from "@dhis2/ui";

export function Commodities(mergedData) {
  const [searchInp, setSearchInp] = useState("");
  console.log(mergedData.mergedData);

  window.addEventListener("keyup", (event) => handleSearch(event));

  const handleSearch = (event) => {
    //Shouldn't this happen automatically??????
    setSearchInp(searchInp + event.key);
  };

  return (
    <>
      <h1>Life-Saving Commodities</h1>
      <p>
        This is an overview of all the commodities and their current stock in
        the store.
      </p>

      <InputField
        label="Find a Commodity"
        name="searchInput"
        placeholder="Search..."
        type="search"
        value={searchInp}
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
