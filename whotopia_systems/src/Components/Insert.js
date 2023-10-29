import React from "react";
import { useState } from "react";
import { Receive } from "./Tabs/Receive";
import { Dispense } from "./Tabs/Dispense";
import { TabNav } from "./TabNav";

export function Insert(props) {
  const [activeTab, setActiveTab] = useState("Dispense");

  let mergedData = props.mergedData;

  function activeTabHandler(tab) {
    setActiveTab(tab);
  }

  return (
    <>
      <div style={{ margin: "-26px -16px 0" }}>
        <TabNav activeTab={activeTab} activeTabHandler={activeTabHandler} />
      </div>
      <div>
        {activeTab === "Dispense" && <Dispense mergedData={mergedData} />}
        {activeTab === "Receive" && <Receive />}
      </div>
    </>
  );
}
