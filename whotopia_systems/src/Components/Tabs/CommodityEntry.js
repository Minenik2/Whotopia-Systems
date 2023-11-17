import React from "react";
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

const CommodityEntry = (props) => {
  let key = props.keyid;
  let amount = props.amount; // current commodity stock
  const [total, setTotal] = useState(0); // amout the user wants to add/remove
  const [errorInput, setErrorInput] = useState(false);
  const [warning, setWarning] = useState(false);
  //const [disabled, setDisabled] = useState(true); //disabled input amount until user selects a commodity
  const [warningText, setWarningText] = useState("");
  const [displayNameCommodity, setDisplayNameCommodity] = useState(""); // commodity name
  var disabled = window.addEventListener("keyup", (event) =>
    handleAmount(event)
  );

  console.log(key);

  const handleAmount = (event) => {
    console.log(event);
    if (event.target.id == `${props.prefix}.value`) {
      const userNumber =
        event.target.value == "" ? 0 : parseInt(event.target.value);
      setTotal(userNumber);
      checkWarnings(userNumber);
    }
  };

  function checkWarnings(number) {
    if (props.activeTab == "Dispense" && amount < number) {
      setErrorInput(true);
      setWarningText("Select a lower amount than current stock");
    } else if (event.target.value <= 0 && amount > number) {
      setErrorInput(true);
      setWarningText("please insert positive number");
    } else if (props.activeTab == "Dispense" && number == amount) {
      setErrorInput(false);
      setWarning(true);
      setWarningText("This will remove full stock");
    } else {
      setErrorInput(false);
      setWarning(false);
      setWarningText("");
    }
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2vw" }}>
        <div>
          <ReactFinalForm.Field
            component={SingleSelectFieldFF}
            name={`${props.prefix}.dataElement`}
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
            name={`${props.prefix}.value`}
            label="Select amount"
            component={InputFieldFF}
            inputWidth="14vh"
            warning={warning}
            error={errorInput}
            validationText={warningText}
            disabled={disabled}
          />
        </div>
        <ReactFinalForm.Field
          component={SingleSelectFieldFF}
          name={`${props.prefix}.dataElement`}
          label="Select commodity"
          placeholder="Choose an option"
          someAmount="o15CyZiTvxa"
          options={props.dataHistory}
          onChange={props.handleSelect(key)}
          inputWidth="80vh"
        />
      </div>
      <div>
        <ReactFinalForm.Field
          name={`${props.prefix}.value`}
          label="Select amount"
          component={InputFieldFF}
          inputWidth="14vh"
          placeholder={`${props.prefix}.value`}
          readOnly
        />
        <ReactFinalForm.Field
          name="afterTransaction"
          label="After transaction"
          component={InputFieldFF}
          inputWidth="14vh"
          placeholder={parseInt(amount) - parseInt(total)}
          readOnly
        />
        <div style={{ width: "2vh" }}></div>
        <Button type="button" onClick={() => props.onRemove(props.prefix)}>
          Remove
        </Button>
      </div>
      <ReactFinalForm.Field
        name="inStock"
        label="Current stock"
        component={InputFieldFF}
        inputWidth="14vh"
        placeholder={amount}
        readOnly
      />
      <ReactFinalForm.Field
        name="afterTransaction"
        label="After transaction"
        component={InputFieldFF}
        inputWidth="14vh"
        placeholder={parseInt(amount) - parseInt(total)}
        readOnly
      />
      <div style={{ width: "2vh" }}></div>
      <Button type="button" onClick={() => props.onRemove(props.prefix)}>
        Remove
      </Button>
    </div>
  );
};
export default CommodityEntry;
