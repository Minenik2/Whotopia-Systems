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
  IconAdd16,
} from "@dhis2/ui";

const divStyle = {
  display: "flex",
  "flex-wrap": "no-wrap",
  gap: "2vw",
  "align-items": "flex-end",
};
const divStyle2 = {
  display: "flex",
  "flex-wrap": "no-wrap",

  "align-items": "flex-end",
};
const textStyle = {
  "font-size": "14px",
  "line-height": "19px",
};

export function Dispense(props) {
  let amount = props.amount;
  let total = props.total;
  let dateAndTime = props.dateAndTime;
  return (
    <div>
      <h1>Register Dispensed Commodities</h1>
      <p>
        Dispense one or multiple commodities and submit to register the
        transaction. All of these transactions will be found under the overview
        in <strong>Transaction History</strong>.
      </p>
      <br />

      <ReactFinalForm.Form onSubmit={props.onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="stuff">
              <div style={divStyle2}>
                <div>
                  <ReactFinalForm.Field
                    component={SingleSelectFieldFF}
                    name="dataElement"
                    label="Select commodity"
                    placeholder="Choose an option"
                    someAmount="o15CyZiTvxa"
                    options={props.dataHistory}
                    onChange={props.handleSelect()}
                    inputWidth="80vh"
                  />
                </div>
                <div>
                  <ReactFinalForm.Field
                    name="value"
                    label="Select amount"
                    component={InputFieldFF}
                    validate={composeValidators(hasValue, number)}
                    inputWidth="14vh"
                  />
                </div>
                <div style={{ width: "2vh" }}></div>
                <ReactFinalForm.Field
                  name="inStock"
                  label="Current stock"
                  component={InputFieldFF}
                  validate={composeValidators(number)}
                  inputWidth="14vh"
                  placeholder={amount}
                  readOnly
                />
                <ReactFinalForm.Field
                  name="afterTrasaction"
                  label="After transaction"
                  component={InputFieldFF}
                  validate={composeValidators(number)}
                  inputWidth="14vh"
                  placeholder={parseInt(amount) - parseInt(total)}
                  readOnly
                />
                <div style={{ width: "2vh" }}></div>
                <Button>
                  <IconAdd16 />
                  Add Commodity
                </Button>
              </div>
            </div>
            <br />
            <br />
            <div style={divStyle}>
              <ReactFinalForm.Field
                name="dispenser"
                label="Dispensed by"
                component={SingleSelectFieldFF}
                validate={composeValidators(hasValue)}
                inputWidth="60vh"
                filterable={true}
                noMatchText={console.log("")}
                onChange={console.log("")}
                options={props.users.userArray}
              />
              <ReactFinalForm.Field
                name="dispensee"
                label="Recipient"
                component={SingleSelectFieldFF}
                validate={composeValidators(hasValue)}
                inputWidth="60vh"
                filterable={true}
                noMatchText={console.log("")}
                onChange={console.log("")}
                options={props.users.userArray}
                inputWidth="60vh"
              />
            </div>
            <div>
              <p>Select date & time</p>
              <input
                type="datetime-local"
                name="dateTime"
                value={dateAndTime}
                onChange={props.handleDateAndTime}
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
  );
}
