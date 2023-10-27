import React from "react";
import { Tab, TabBar } from "@dhis2/ui";

export function TabNav(props) {
  return (
    <TabBar fixed>
      <Tab
        value="dispense"
        id="dispense"
        active={props.activeTab == "Dispense"}
        onClick={() => props.activeTabHandler("Dispense")}
        className={props.activeTab == "Dispense" ? "selected" : ""}
      >
        Dispense Commodities
      </Tab>
      <Tab
        value="receive"
        id="receive"
        active={props.activeTab == "Receive"}
        onClick={() => props.activeTabHandler("Receive")}
        className={props.activeTab == "Receive" ? "selected" : ""}
      >
        Restock Inventory
      </Tab>
    </TabBar>
  );
}
