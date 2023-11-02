import React from "react";
import { useDataMutation } from "@dhis2/app-runtime";
import { useState } from "react";
import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  SingleSelectFieldFF,
  hasValue,
  number,
  composeValidators,
} from "@dhis2/ui";

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

export function Dispense(props) {
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [dateAndTime, setDateAndTime] = useState("");
  const [mutate, { loading, error }] = useDataMutation(dataMutationQuery);
  const [mutateTransaction, { loading2, error2 }] = useDataMutation(
    dataMutationQueryTransaction
  );

  const [displayNameCommodity, setDisplayNameCommodity] = useState("");

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
      value: parseInt(amount) - parseInt(total),
      dataElement: formInput.dataElement,
      period: "202209",
      orgUnit: "kbGqmM6ZWWV",
    });
    props.refetch();
    console.log(props.transactions);
    props.transactions.dataValues.push({
      value: formInput.value * -1,
      label: displayNameCommodity,
      commodityId: formInput.dataElement,
      period: dateAndTime,
      dispensedBy: formInput.dispenser,
      DispensedTo: formInput.dispensee,
      inStock: parseInt(amount),
      afterTransaction: parseInt(amount) - parseInt(total),
    });
    console.log(props.transactions);
    console.log("hihi");
    mutateTransaction({
      array: props.transactions.dataValues,
    });
    props.refetch();
    alert("Commodities changed");
  }

  const handleSelect = () => {
    for (let option in dataHistory) {
      if (event && dataHistory[option].label == event.target.innerHTML) {
        setAmount(dataHistory[option].amount);
        setDisplayNameCommodity(dataHistory[option].label);
        console.log("display name commodity is: " + displayNameCommodity);
      }
    }
  };

  window.addEventListener("keyup", (event) => handleAmount(event));

  const handleAmount = (event) => {
    if (event.target.id == "value") {
      setTotal(parseInt(event.target.value));
    }
  };

  const handleDateAndTime = (event) => {
    setDateAndTime(event.target.value);
  };

  return (
    <>
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
                    {parseInt(amount) - parseInt(total)}
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
              <div>
                <p>Select date & time</p>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={dateAndTime}
                  onChange={handleDateAndTime}
                />
              </div>
              <p>
                Current time: {new Date().toDateString() + " "}
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
