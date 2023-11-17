import React from "react";
import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  SingleSelectFieldFF,
  hasValue,
  number,
  composeValidators,
  Divider,
  Card,
  Help,
} from "@dhis2/ui";

export function Receive(props) {
  let amount = props.amount;
  let total = props.total;
  let dateAndTime = props.dateAndTime;
  return (
    <div>
      <h1>Register Inventory Restock</h1>
      <Card>
        <p style={{ margin: "20px 20px" }}>
          Here you can register new items when restocking the store. All of
          these transactions will be found under the overview in{" "}
          <strong>Transaction History</strong>.
        </p>

        <div style={{ margin: "20px" }}>
          <Divider />
          <ReactFinalForm.Form onSubmit={props.onSubmit}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="formContent">
                  <div
                    style={{
                      display: "flex",
                      "flex-wrap": "no-wrap",
                      "align-items": "flex-end",
                    }}
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
                      placeholder={parseInt(amount) + parseInt(total)}
                      readOnly
                    />
                    <div style={{ width: "2vh" }}></div>
                  </div>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    "flex-wrap": "no-wrap",
                    "align-items": "flex-end",
                  }}
                >
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
                  <div style={{ width: "2vh" }}></div>
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
                <br />
                <div>
                  <label for="datetime">
                    Select date and time of transaction
                  </label>
                  <br />
                  <input
                    style={{ margin: "10px 0px" }}
                    id="dateTime"
                    type="datetime-local"
                    name="dateTime"
                    value={dateAndTime}
                    onChange={props.handleDateAndTime}
                  />
                </div>
                <Help>
                  Current time: {new Date().toDateString() + " "}
                  {new Date().getHours() > 9
                    ? new Date().getHours()
                    : "0" + new Date().getHours()}
                  :
                  {new Date().getMinutes() > 9
                    ? new Date().getMinutes()
                    : "0" + new Date().getMinutes()}
                </Help>
                <Divider />
                <Button type="submit" primary>
                  Submit
                </Button>
              </form>
            )}
          </ReactFinalForm.Form>
        </div>
      </Card>
    </div>
  );
}
