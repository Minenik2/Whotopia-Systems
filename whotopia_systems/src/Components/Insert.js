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
  IconPushLeft16,
  IconPushRight16,
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
      period: "20201024",
      dispensedBy: formInput.dispenser,
      DispensedTo: formInput.dispensee,
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
    //console.log(selected);
    //console.log(event);

    for (let option in dataHistory) {
      if (dataHistory[option].label == event.target.innerHTML) {
        setAmount(dataHistory[option].amount);
      }
    }
  };

  window.addEventListener("keyup", (event) => handleAmount(event));

  const handleAmount = (event) => {
    console.log(event);
    if (event.target.id == "value") {
      setTotal(parseInt(event.target.value) + parseInt(amount));
    }
  };
  const switchForm = () => {
    console.log("hi :>");
  };

  const divStyle = {
    display: "flex",
    "flex-wrap": "no-wrap",
    gap: "20px",
    "align-items": "flex-end",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          "justify-content": "space-evenly",
          padding: "20px",
        }}
      >
        <Button name="dispense" large onClick={switchForm}>
          Register dispensed commodity <IconPushRight16 />
        </Button>
        <Button name="recieve" large onClick={switchForm}>
          Register recieved commodity <IconPushLeft16 />
        </Button>
      </div>
      <h1>Register dispensed commodity</h1>

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
                    inputWidth="260px"
                  />
                </div>
                <p>In stock: {amount}</p>
                <div>
                  <ReactFinalForm.Field
                    name="value"
                    label="Select amount"
                    component={InputFieldFF}
                    validate={composeValidators(hasValue, number)}
                    inputWidth="100px"
                  />
                </div>
                <p>Amount after transaction: {total}</p>
              </div>
            </div>
            <br />

            <ReactFinalForm.Field
              name="dispenser"
              label="Dispensed by"
              component={InputFieldFF}
              validate={composeValidators(hasValue)}
              inputWidth="50%"
            />
            <ReactFinalForm.Field
              name="dispensee"
              label="Dispensed to"
              component={InputFieldFF}
              validate={composeValidators(hasValue)}
              inputWidth="50%"
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
