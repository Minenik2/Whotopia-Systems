import React from "react";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
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

// kaller API
const dataQuery = {
  dataSets: {
    resource: "dataSets/ULowA8V3ucd",
    params: {
      fields: ["name", "id", "dataSetElements[dataElement[id, displayName]"],
    },
  },
  dataValueSets: {
    resource: "dataValueSets",
    params: {
      orgUnit: "kbGqmM6ZWWV",
      dataSet: "ULowA8V3ucd",
      period: "202209",
    },
  },
};

function mergeData(data) {
  return data.dataSets.dataSetElements.map((d) => {
    let matchedValue = data.dataValueSets.dataValues.find((dataValues) => {
      if (dataValues.dataElement == d.dataElement.id) {
        return true;
      }
    });

    return {
      displayName: d.dataElement.displayName,
      id: d.dataElement.id,
      value: matchedValue.value,
    };
  });
}
// end of kaller API

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

  const { loading2, error2, data } = useDataQuery(dataQuery);
  if (error2) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading2) {
    return <CircularLoader large />;
  }

  if (data) {
    let mergedData = mergeData(data);
    console.log(mergedData);
    let dataHistory = [];
    // lager option array
    mergedData.map((row) => {
      dataHistory.push({
        label: row.displayName.substring([14]),
        value: row.id,
      });
    });

    return (
      <div>
        <ReactFinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <ReactFinalForm.Field
                component={SingleSelectFieldFF}
                name="dataElement"
                label="Select commodity"
                initialValue="Boy3QwztgeZ"
                options={dataHistory}
              />
              <ReactFinalForm.Field
                name="value"
                label="Select amount"
                component={InputFieldFF}
                validate={composeValidators(hasValue, number)}
              />
              <br />
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
      </div>
    );
  }
  return <h1>waiting</h1>;
}
