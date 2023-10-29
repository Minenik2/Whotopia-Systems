import React from "react";
import {
  ReactFinalForm,
  InputFieldFF,
  Button,
  SingleSelectFieldFF,
  hasValue,
  number,
  composeValidators,
} from "@dhis2/ui";

export function Receive() {
  return (
    <>
      <div>
        <h1>Register Inventory Restock</h1>
        <p>
          Here you can register new items when restocking the store. All of
          these transactions will be found under the overview in{" "}
          <strong>Transaction History</strong>.
        </p>
      </div>
    </>
  );
}
