import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@dhis2/ui";
import classes from "../App.module.css";
import { DatasetsTable } from "./DatasetsTable";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionInfo } from "./TransactionInfo";

export function Datasets(props) {
  console.log(props.mergedData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [noTable, setNoTable] = useState(true);
  const [tableMode, setTableMode] = useState(false);
  const [showList, setShowList] = useState(true);

  const handleClick = () => {
    setTableMode(!tableMode);
    setShowList(!showList);
    setSelectedItem(null);
    setNoTable(!noTable);
  };

  return (
    <>
      <h1>Transaction History</h1>
      <p>
        Here is an overview of all dispensed and received commodities. <br />
        Click on a transaction to view more transaction details, or switch to{" "}
        <strong>Table Mode</strong> to view the information in the form of a
        table instead.
      </p>
      <Button onClick={handleClick}>Switch to table mode</Button>
      <div className={classes.container}>
        {tableMode && (
          <TransactionsTable mergedData={props.mergedData.dataValues} />
        )}
        {showList && (
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
        )}
        <div className={classes.right}>
          {selectedItem && <DatasetsTable selectedItem={selectedItem} />}
          {noTable && !tableMode && <TransactionInfo />}
        </div>
      </div>
    </>
  );
}
