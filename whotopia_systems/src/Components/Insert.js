import React from "react";
import { useState } from "react";
import { Receive } from "./Tabs/Receive";
import { Dispense } from "./Tabs/Dispense";
import { TabNav } from "./TabNav";


export function Insert(props) {
  const [activeTab, setActiveTab] = useState("Dispense");

  let mergedData = props.mergedData;
  let refetch = props.refetch;
  let transactions = props.transactions;
  console.log(props.users);

  function activeTabHandler(tab) {
    setActiveTab(tab);
  }

  return (
    <>
      <div style={{ margin: "-26px -16px 0" }}>
        <TabNav activeTab={activeTab} activeTabHandler={activeTabHandler} />
      </div>
      <div>
        {activeTab === "Dispense" && (
          <Dispense
            mergedData={mergedData}
            refetch={refetch}
            transactions={transactions}
            users={props.users}
          />
        )}
        {activeTab === "Receive" && <Receive />}
      </div>
    </>
  );
}
