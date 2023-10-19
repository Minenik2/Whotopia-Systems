import React from "react";
import { useDataMutation } from "@dhis2/app-runtime";
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

  return (
    <div>
      <ReactFinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <ReactFinalForm.Field
              component={SingleSelectFieldFF}
              name="dataElement"
              label="Select field"
              initialValue="Boy3QwztgeZ"
              options={[
                {
                  label: "Amoxicillin",
                  value: "Boy3QwztgeZ",
                },
                {
                  label: "Implants",
                  value: "Dkapzovo8Ll",
                },
                {
                  label: "Chlorhexidine",
                  value: "WjDoIR27f31",
                },
                {
                  label: "Resuscitation Equipment",
                  value: "W1XtQhP6BGd",
                },
                {
                  label: "Magnesium Sulfate",
                  value: "o15CyZiTvxa",
                },
                {
                  label: "Antenatal Corticosteroids",
                  value: "d9vZ3HOlzAd",
                },
                {
                  label: "Oral Rehydration Salts",
                  value: "Lz8MM2Y9DNh",
                },
                {
                  label: "Female Condoms",
                  value: "dY4OCwl0Y7Y",
                },
                {
                  label: "Injectable Antibiotics",
                  value: "JIazHXNSnFJ",
                },
                {
                  label: "Oxytocin",
                  value: "hJNC4Bu2Mkv",
                },
                {
                  label: "Misoprostol",
                  value: "f27B1G7B3m3",
                },
                {
                  label: "Zinc",
                  value: "TCfIC3NDgQK",
                },
                {
                  label: "Emergency Contraception",
                  value: "BXgDHhPdFVU",
                },
              ]}
            />
            <ReactFinalForm.Field
              name="value"
              label="Value"
              component={InputFieldFF}
              validate={composeValidators(hasValue, number)}
            />
            <Button type="submit" primary>
              Submit
            </Button>
          </form>
        )}
      </ReactFinalForm.Form>
    </div>
  );
}
