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

  return (
    <div>
      <p>Select dispense/recieve</p>
      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <ReactFinalForm.Field
              component={SingleSelectFieldFF}
              name="dataElement"
              label="Select commodity"
              initialValue="Boy3QwztgeZ"
              someAmount='o15CyZiTvxa'
              options={dataHistory}
              onChange={(event, someAmount, initialValue, dataElement) => {
                console.log('HIHIHIHI')
                setAmount(10)
              }}
            />
            <ReactFinalForm.Field
              name="value"
              label="Select amount"
              component={InputFieldFF}
              validate={composeValidators(hasValue, number)}
              
            />
            <ReactFinalForm.Field
              name="dispenser"
              label="Dispensed by"
              component={InputFieldFF}
              validate={composeValidators(hasValue)}
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
      <p>Final amount after change</p>
      <p>{(dataHistory[0].amount + 50)}</p>
      <p>Current amount</p>
      <p>{dataHistory[0].amount}</p>
      <p>Amount={amount}</p>
    </div>
  );
}
