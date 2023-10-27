import React from "react";
import { Tab, TabBar } from "@dhis2/ui";

export function TabNav(props) {
  return (
    <TabBar fixed>
      <Tab
        value="dispense"
        active={props.activeTab == "Dispense"}
        onClick={() => props.activeTabHandler("Dispense")}
        className={props.dispenseActive ? "selected" : ""}
      >
        Dispense Commodities
      </Tab>
      <Tab
        value="receive"
        active={props.activeTab == "Receive"}
        onClick={() => props.activeTabHandler("Receive")}
        className={props.receiveActive ? "selected" : ""}
      >
        Restock Inventory
      </Tab>
    </TabBar>
  );
}
