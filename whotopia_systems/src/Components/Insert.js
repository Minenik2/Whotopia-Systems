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

export function Insert(props) {
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [mutate, { loading, error }] = useDataMutation(dataMutationQuery);

  function onSubmit(formInput) {
    mutate({
      value: formInput.value,
      dataElement: formInput.dataElement,
      period: "202209",
      orgUnit: "kbGqmM6ZWWV",
    });
    alert("Commodities changed");
  }

  // lager en array for alle option elementer i form
  let mergedData = props.mergedData;
  console.log(mergedData);
  let dataHistory = [];
  mergedData.map((row) => {
    dataHistory.push({
      label: row.displayName.substring([14]),
      value: row.id,
      amount: row.value,
    });
  });

  const handleSelect = (selected) => {
    console.log(selected);
    console.log(event);

    for (let option in dataHistory) {
      if (dataHistory[option].label == event.target.innerHTML) {
        setAmount(dataHistory[option].amount);
        console.log("hallo");
      }
    }
  };

  const handleAmount = () => {
    if (event.target.value) {
      setTotal(parseInt(event.target.value) + parseInt(amount));
    } else {
      setTotal(amount);
    }
  };

  const divStyle = {
    display: "flex",
    "flex-wrap": "no-wrap",
    gap: "20px",
    width: "50%",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          "justify-content": "space-evenly",
          padding: "20px",
          "padding-bottom": "40px",
        }}
      >
        <Button large>Register dispensed commodity</Button>
        <Button large>Register recieved commodity</Button>
      </div>

      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="stuff">
              <div style={divStyle}>
                <div style={{ "flex-grow": "5" }}>
                  <ReactFinalForm.Field
                    component={SingleSelectFieldFF}
                    name="dataElement"
                    label="Select commodity"
                    placeholder="Choose an option"
                    someAmount="o15CyZiTvxa"
                    options={dataHistory}
                    onKeyDown={handleSelect()}
                  />
                </div>
                <div style={{ "flex-grow": "1" }}>
                  <ReactFinalForm.Field
                    name="value"
                    label="Select amount"
                    component={InputFieldFF}
                    validate={composeValidators(hasValue, number)}
                    onChange={handleAmount()}
                  />
                </div>
              </div>
              <div style={divStyle}>
                <p>Current amount: {amount}</p>
                <p>Final amount after change: {total}</p>
              </div>
            </div>
            <br />

            <ReactFinalForm.Field
              name="dispenser"
              label="Dispensed by"
              component={InputFieldFF}
              validate={composeValidators(hasValue)}
              inputWidth="30%"
            />
            <ReactFinalForm.Field
              name="dispensee"
              label="Dispensed to"
              component={InputFieldFF}
              validate={composeValidators(hasValue)}
            />
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
  );
}
