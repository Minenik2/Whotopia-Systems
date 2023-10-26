import React from "react";
import { useDataMutation } from "@dhis2/app-runtime";
import { useState } from "react";
import { ReceiveForm } from "./ReceiveForm";
import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  SingleSelectFieldFF,
  hasValue,
  number,
  composeValidators,
  IconImportItems24,
  IconExportItems24,
  TabBar,
  Tab,
} from "@dhis2/ui";

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
  data: ({ value, commodityId, period, dispensedBy, DispensedTo }) => ({
    dataValues: [
      {
        commodityId: commodityId,
        period: period,
        dispensedBy: dispensedBy,
        DispensedTo: DispensedTo,
        value: value,
      },
    ],
  }),
};

export function Insert(props) {
  const [dispenseActive, setDispenseActive] = useState(true);
  const [receiveActive, setReceiveActive] = useState(false);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [mutate, { loading, error }] = useDataMutation(dataMutationQuery);
  const [mutateTransaction, { loading2, error2 }] = useDataMutation(
    dataMutationQueryTransaction
  );

  function onSubmit(formInput) {
    mutate({
      value: formInput.value,
      dataElement: formInput.dataElement,
      period: "202209",
      orgUnit: "kbGqmM6ZWWV",
    });
    mutateTransaction({
      value: formInput.value,
      commodityId: formInput.dataElement,
      period: new Date().toDateString(),
      dispensedBy: formInput.dispenser,
      DispensedTo: formInput.dispensee,
    });
    alert("Commodities changed");
  }

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

  const handleSelect = () => {
    for (let option in dataHistory) {
      if (dataHistory[option].label == event.target.innerHTML) {
        setAmount(dataHistory[option].amount);
      }
    }
  };

  window.addEventListener("keyup", (event) => handleAmount(event));

  const handleAmount = (event) => {
    if (event.target.id == "value") {
      setTotal(parseInt(event.target.value));
    }
  };
  const switchForm = () => {
    setDispenseActive((current) => !current);
    setReceiveActive((current) => !current);

    if (dispenseActive) {
      TODO: "display dispense";
    }
    if (!receiveActive) {
      console.log(ReceiveForm);
    }
  };

  const divStyle = {
    display: "flex",
    "flex-wrap": "no-wrap",
    gap: "20px",
    "align-items": "flex-end",
  };
  const textStyle = {
    "font-size": "14px",
    "line-height": "19px",
  };

  return (
    <>
      <div style={{ margin: "-26px -16px 0" }}>
        <TabBar fixed>
          <Tab
            value="dispense"
            onClick={switchForm}
            className={dispenseActive ? "selected" : ""}
          >
            Dispense Commodities
          </Tab>
          <Tab
            value="receive"
            onClick={switchForm}
            className={receiveActive ? "selected" : ""}
          >
            Restock Inventory
          </Tab>
        </TabBar>
      </div>
      <div>
        <h1>Register Dispensed Commodities</h1>
        <p>
          Dispense one or multiple commodities and submit to register the
          transaction. All of these transactions will be found under the
          overview in <strong>Transaction History</strong>.
        </p>
        <br />

        <ReactFinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="stuff">
                <div style={divStyle}>
                  <div>
                    <ReactFinalForm.Field
                      component={SingleSelectFieldFF}
                      name="dataElement"
                      label="Select commodity"
                      placeholder="Choose an option"
                      someAmount="o15CyZiTvxa"
                      options={dataHistory}
                      onChange={handleSelect()}
                      inputWidth="80vh"
                    />
                  </div>
                  <p style={textStyle}>
                    <span style={{ color: "#4A5768" }}>In stock:</span> {amount}
                  </p>
                  <div>
                    <ReactFinalForm.Field
                      name="value"
                      label="Select amount"
                      component={InputFieldFF}
                      validate={composeValidators(hasValue, number)}
                      inputWidth="100px"
                    />
                  </div>
                  <p style={textStyle}>
                    <span style={{ color: "#4A5768" }}>
                      Amount after transaction:
                    </span>{" "}
                    {parseInt(total) + parseInt(amount)}
                  </p>
                </div>
              </div>
              <br />
              <br />
              <div style={divStyle}>
                <ReactFinalForm.Field
                  name="dispenser"
                  label="Dispensed by"
                  component={InputFieldFF}
                  validate={composeValidators(hasValue)}
                  inputWidth="80vh"
                />
                <ReactFinalForm.Field
                  name="dispensee"
                  label="Recipient"
                  component={InputFieldFF}
                  validate={composeValidators(hasValue)}
                  inputWidth="80vh"
                />
              </div>

              <p>
                Time registered: {new Date().toDateString() + " "}
                {new Date().getHours()}:
                {new Date().getMinutes() > 9
                  ? new Date().getMinutes()
                  : "0" + new Date().getMinutes()}
              </p>
              <Button type="submit" primary>
                Submit
              </Button>
            </form>
          )}
        </ReactFinalForm.Form>
      </div>
    </>
  );
}
