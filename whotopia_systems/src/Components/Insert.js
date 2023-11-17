import React from "react";
import { useState } from "react";
import { Receive } from "./Tabs/Receive";
import { Dispense } from "./Tabs/Dispense";
import { TabNav } from "./TabNav";
import { useDataMutation } from "@dhis2/app-runtime";
import { AlertBar } from "@dhis2-ui/alert";

const dataMutationQuery = {
  resource: "dataValueSets",
  type: "create",
  dataSet: "ULowA8V3ucd",
  data: ({ value, dataElement, period, orgUnit }) => ({
    dataValues: [
      {
        dataElement: dataElement,
        period: period,
        orgUnit: orgUnit,
        value: value,
      },
    ],
  }),
};

const dataMutationQueryTransaction = {
  resource: "dataStore/IN5320-<3>/Transactions",
  type: "update",
  data: ({ array }) => ({
    dataValues: array,
  }),
};

export function Insert(props) {
  const [amount, setAmount] = useState(0); // current commodity stock
  const [total, setTotal] = useState(0); // amout the user wants to add/remove
  const [alertHidden, setAlertHidden] = useState(true);
  const [errorInput, setErrorInput] = useState(false);
  const [warning, setWarning] = useState(false);
  const [disabled, setDisabled] = useState(true); //disabled input amount until user selects a commodity
  const [warningText, setWarningText] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [mutate, { loading, error }] = useDataMutation(dataMutationQuery);
  const [mutateTransaction, { loading2, error2 }] = useDataMutation(
    dataMutationQueryTransaction
  );

  const [displayNameCommodity, setDisplayNameCommodity] = useState("");

  // Koden for å manage multiple commodities
  const [commodities, setCommodities] = useState([]);
  const [commodityCount, setCommodityCount] = useState(0);
  // lager objekt for vær commodity
  const handleAddCommodity = () => {
    setCommodityCount((prevCount) => prevCount + 1);
    const newCommodity = {
      value: 0,
      label: "",
      commodityId: "formInput.dataElement",
      period: "dateAndTime",
      dispensedBy: "",
      DispensedTo: "",
      inStock: 0,
      afterTransaction: 0,
    };

    setCommodities([...commodities, newCommodity]);
  };

  // lager en array for alle option elementer i form
  let mergedData = props.mergedData;
  let dataHistory = [];
  mergedData.map((row) => {
    dataHistory.push({
      label: row.displayName.substring([14]),
      value: row.id,
      amount: row.value,
    });
  });

  function onSubmit(formInput) {
    mutate({
      value:
        activeTab == "Dispense"
          ? parseInt(amount) - parseInt(total)
          : parseInt(amount) + parseInt(total),
      dataElement: formInput.dataElement,
      period: "202209",
      orgUnit: "kbGqmM6ZWWV",
    });
    props.refetch();
    console.log(props.transactions);
    props.transactions.dataValues.push({
      value: activeTab == "Dispense" ? formInput.value * -1 : formInput.value,
      label: displayNameCommodity,
      commodityId: formInput.dataElement,
      period: dateAndTime,
      dispensedBy: formInput.dispenser,
      DispensedTo: formInput.dispensee,
      inStock: parseInt(amount),
      afterTransaction:
        activeTab == "Dispense"
          ? parseInt(amount) - parseInt(total)
          : parseInt(amount) + parseInt(total),
    });
    console.log(props.transactions);
    mutateTransaction({
      array: props.transactions.dataValues,
    });
    props.refetch();
    setAlertHidden(false);
  }

  function checkWarnings(number) {
    if (activeTab == "Dispense" && amount < number) {
      setErrorInput(true);
      setWarningText("Select a lower amount than current stock");
    } else if (event.target.value <= 0 && amount > number) {
      setErrorInput(true);
      setWarningText("please insert positive number");
    } else if (activeTab == "Dispense" && number == amount) {
      setErrorInput(false);
      setWarning(true);
      setWarningText("This will remove full stock");
    } else {
      setErrorInput(false);
      setWarning(false);
      setWarningText("");
    }
  }

  const handleSelect = () => {
    console.log(event);
    console.log(disabled);
    for (let option in dataHistory) {
      if (event && dataHistory[option].label == event.target.innerHTML) {
        setDisabled(false);
        console.log(disabled);
        checkWarnings(total);
        setAmount(dataHistory[option].amount);
        setDisplayNameCommodity(dataHistory[option].label);
        console.log("display name commodity is: " + displayNameCommodity);
      }
    }
  };

  window.addEventListener("keyup", (event) => handleAmount(event));

  const handleAmount = (event) => {
    if (event.target.id == "value") {
      const userNumber =
        event.target.value == "" ? 0 : parseInt(event.target.value);
      setTotal(userNumber);
      checkWarnings(userNumber);
    }
  };

  const handleDateAndTime = (event) => {
    setDateAndTime(event.target.value);
  };

  const [activeTab, setActiveTab] = useState("Dispense");

  let refetch = props.refetch;
  let transactions = props.transactions;
  console.log(props.users);

  function activeTabHandler(tab) {
    setActiveTab(tab);
    setAmount(0);
    setTotal(0);
  }

  return (
    <>
      <div style={{ margin: "auto", position: "absolute", "z-index": "1" }}>
        <AlertBar
          hidden={alertHidden}
          children="Commodities changed"
          display=""
          success
        />
      </div>
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
            handleDateAndTime={handleDateAndTime}
            handleSelect={handleSelect}
            onSubmit={onSubmit}
            dataHistory={dataHistory}
            amount={amount}
            total={total}
            dateAndTime={dateAndTime}
            error={errorInput}
            warning={warning}
            warningText={warningText}
            disabled={disabled}
            activeTab={activeTab}
            handleAddCommodity={handleAddCommodity}
            commodities={commodities}
          />
        )}
        {activeTab === "Receive" && (
          <Receive
            mergedData={mergedData}
            refetch={refetch}
            transactions={transactions}
            users={props.users}
            handleDateAndTime={handleDateAndTime}
            handleSelect={handleSelect}
            onSubmit={onSubmit}
            dataHistory={dataHistory}
            amount={amount}
            total={total}
            dateAndTime={dateAndTime}
            error={errorInput}
            warning={warning}
            warningText={warningText}
            disabled={disabled}
          />
        )}
      </div>
    </>
  );
}
