import React, { useState } from "react";
import { Menu, MenuItem } from "@dhis2/ui";
import classes from "../App.module.css";
import { DatasetsTable } from "./DatasetsTable";
import { TransactionInfo } from "./TransactionInfo";

export function Datasets(props) {
  console.log(props.mergedData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [noTable, setNoTable] = useState(true);

  return (
    <>
      <h1>Transaction History</h1>
      <p>
        Here is an overview of all dispensed and received commodities. Click on
        a transaction to view more transaction details.
      </p>
      <div className={classes.container}>
        <div className={classes.left} style={{ width: 50 + "vh" }}>
          <Menu>
            {props.mergedData.dataValues.toReversed().map((listItem) => {
              let label =
                listItem.label +
                (listItem.value > 0
                  ? " recieved " + listItem.value
                  : " dispensed " + listItem.value) +
                ", " +
                listItem.period;
              return (
                <MenuItem
                  key={listItem.commodityId}
                  label={label}
                  onClick={() => {
                    setSelectedItem(listItem);
                    setNoTable(false);
                  }}
                ></MenuItem>
              );
            })}
          </Menu>
        </div>
        <div className={classes.right}>
          {selectedItem && <DatasetsTable selectedItem={selectedItem} />}
          {noTable && <TransactionInfo />}
        </div>
      </div>
    </>
  );
}
