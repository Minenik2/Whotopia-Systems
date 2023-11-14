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
  let amount = props.amount;
  let total = props.total;
  let dateAndTime = props.dateAndTime;

  const [commodities, setCommodities] = useState([]);
  const [commodityCount, setCommodityCount] = useState(0);

  const handleAddCommodity = () => {
    setCommodityCount((prevCount) => prevCount + 1);
    const newCommodity = {
      dataElement: props.mergedData.dataElement,
      value: props.mergedData.value,
      inStock: 20,
      afterTransaction: 40,
    };

    setCommodities([...commodities, newCommodity]);
  };

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
            <div className="stuff"></div>
            <br />
            <br />
            {commodities.map((commodity, index) => (
              <CommodityEntry
                key={index}
                prefix={`commodity_${index}`}
                dataHistory={props.dataHistory}
                handleSelect={props.handleSelect}
                amount={amount}
                total={total}
                onRemove={handleRemoveCommodity}
                activeTab={props.activeTab}
              />
            ))}
            <Button type="button" onClick={handleAddCommodity}>
              <IconAdd16 />
              Add Commodity
            </Button>
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
