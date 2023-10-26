import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";

export function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Commodity Inventory"
        active={props.activePage == "Commodities"}
        onClick={() => props.activePageHandler("Commodities")}
      />
      <MenuItem
        label="Register transaction"
        active={props.activePage == "Insert"}
        onClick={() => props.activePageHandler("Insert")}
      />
      <MenuItem
        label="Transaction History"
        active={props.activePage == "Datasets"}
        onClick={() => props.activePageHandler("Datasets")}
      />
    </Menu>
  );
}
