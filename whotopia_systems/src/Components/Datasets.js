import React, { useState } from "react";
import { Menu, MenuItem } from "@dhis2/ui";
import classes from "../App.module.css";
import { DatasetsTable } from "./DatasetsTable";

export function Datasets(props) {
  console.log(props.mergedData);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.left} style={{ width: 50 + "vh" }}>
          <Menu>
            {props.mergedData.dataValues.map((listItem) => {
              let label = "Transaction: " + listItem.period;
              return (
                <MenuItem
                  key={listItem.commodityId}
                  label={label}
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
    </>
  );
}
