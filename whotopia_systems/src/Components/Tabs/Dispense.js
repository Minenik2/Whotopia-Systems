import React from "react";
import CommodityEntry from "./CommodityEntry";
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
  let amount = props.amount; // stock amount / amount of stock left
  let total = props.total;
  let dateAndTime = props.dateAndTime;

  const handleRemoveCommodity = (prefix) => {
    setCommodities((prevCommodities) =>
      prevCommodities.filter((commodity) => !commodity.startsWith(prefix))
    );
  };

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
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "2vw" }}
              >
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
                    warning={props.warning}
                    error={props.error}
                    validationText={props.warningText}
                    disabled={props.disabled}
                  />
                </div>

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
              </div>
            </div>
            <div className="stuff"></div>
            <br />

            {props.commodities.map((commodity, index) => (
              <CommodityEntry
                keyid={index}
                prefix={`commodity_${index}`}
                dataHistory={props.dataHistory}
                handleSelect={props.handleSelect}
                amount={commodity.inStock}
                total={total}
                onRemove={handleRemoveCommodity}
                activeTab={props.activeTab}
              />
            ))}
            <Button type="button" onClick={props.handleAddCommodity}>
              <IconAdd16 />
              Add Commodity
            </Button>
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
              {new Date().getHours() > 9
                ? new Date().getHours()
                : "0" + new Date().getHours()}
              :
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
