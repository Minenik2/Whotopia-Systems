import React, { useState } from "react";
import { Menu, MenuItem, Button } from "@dhis2/ui";
import classes from "../App.module.css";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionInfo } from "./TransactionInfo";

export function Datasets(props) {
  console.log(props.mergedData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [noTable, setNoTable] = useState(true);
  const [tableMode, setTableMode] = useState(false);
  const [showList, setShowList] = useState(true);
  const [buttonText, setButtonText] = useState("Switch to Table View");

  const handleClick = () => {
    setTableMode(!tableMode);
    setShowList(!showList);
    setSelectedItem(null);
    setNoTable(!noTable);

    setButtonText("Switch to List View");
    if (tableMode) {
      setButtonText("Switch to Table View");
    }
  };

  return (
    <>
      <h1>Transaction History</h1>
      <p>
        Here is an overview of all dispensed and received commodities. <br />
        Click on a transaction to view more transaction details, or switch to{" "}
        <strong>Table View</strong> to display the information in the form of a
        table instead.
      </p>
      <Button onClick={handleClick}>{buttonText}</Button>
      <div className={classes.container}>
        {tableMode && <TransactionsTable data={props.mergedData.dataValues} />}
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
                  listItem.period.replace("T", " ");
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
          {selectedItem && <TransactionsTable data={selectedItem} />}
          {noTable && !tableMode && <TransactionInfo />}
        </div>
      </div>
    </>
  );
}
