import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
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

const dataQuery = {
  dataSets: {
    resource: "dataSets/ULowA8V3ucd",
    params: {
      fields: ["name", "id", "dataSetElements[dataElement[id, displayName]"],
    },
  },
  dataValueSets: {
    resource: "dataValueSets",
    params: {
      orgUnit: "kbGqmM6ZWWV",
      dataSet: "ULowA8V3ucd",
      period: "202209",
    },
  },
};

function mergeData(data) {
  return data.dataSets.dataSetElements.map((d) => {
    let matchedValue = data.dataValueSets.dataValues.find((dataValues) => {
      if (dataValues.dataElement == d.dataElement.id) {
        return true;
      }
    });

    return {
      displayName: d.dataElement.displayName,
      id: d.dataElement.id,
      value: matchedValue.value,
    };
  });
}

export function Commodities() {
  const { loading, error, data } = useDataQuery(dataQuery);
  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <CircularLoader large />;
  }

  if (data) {
    let mergedData = mergeData(data);
    console.log(mergedData);
    return (
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Name</TableCellHead>
            <TableCellHead>Amount</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {mergedData.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row.displayName.substring([14])}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return <h1>Commodities</h1>;
}
