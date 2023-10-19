import React, { useState } from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import { Menu, MenuItem } from "@dhis2/ui";
import classes from "../App.module.css";
import { DatasetsTable } from "./DatasetsTable";

const dataQuery = {
  request0: {
    resource: "/dataSets",
    params: {
      fields: "id, displayName, created",
      paging: "false",
    },
  },
};

export function Datasets() {
  const { loading, error, data } = useDataQuery(dataQuery);
  const [selectedItem, setSelectedItem] = useState(null);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <CircularLoader large />;
  }

  if (data) {
    console.log("API response:", data);

    return (
      <div className={classes.container}>
        <div className={classes.left} style={{ width: 50 + "vh" }}>
          <Menu>
            {data.request0.dataSets.map((listItem) => {
              return (
                <MenuItem
                  key={listItem.id}
                  label={listItem.displayName}
                  onClick={() => {
                    setSelectedItem(listItem);
                  }}
                ></MenuItem>
              );
            })}
          </Menu>
        </div>
        <div className={classes.right}>
          {selectedItem && <DatasetsTable selectedItem={selectedItem} />}
        </div>
      </div>
    );
  }

  return <h1>Datasets</h1>;
}
