import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";

export function Navigation(props) {
  return (
    <Menu>
      <MenuItem
        label="Life-Saving Commodities"
        active={props.activePage == "Commodities"}
        onClick={() => props.activePageHandler("Commodities")}
      />
      <MenuItem
        label="Insert"
        active={props.activePage == "Insert"}
        onClick={() => props.activePageHandler("Insert")}
      />
      <MenuItem
        label="Datasets"
        active={props.activePage == "Datasets"}
        onClick={() => props.activePageHandler("Datasets")}
      />
    </Menu>
  );
}
