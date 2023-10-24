import React, { useState } from "react";
import { Menu, MenuItem } from "@dhis2/ui";
import classes from "../App.module.css";
import { DatasetsTable } from "./DatasetsTable";

export function Datasets(props) {
  const [selectedItem, setSelectedItem] = useState(null);
    return (
      <div className={classes.container}>
        <div className={classes.left} style={{ width: 50 + "vh" }}>
          <Menu>
            {props.mergedData.map((listItem) => {
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
