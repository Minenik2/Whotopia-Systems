import React, { useState } from "react";
import classes from "./App.module.css";
import { Datasets } from "./Components/Datasets";
import { Commodities } from "./Components/Commodities";
import { Insert } from "./Components/Insert";
import { Navigation } from "./Navigation";
import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";

function MyApp() {
  const [activePage, setActivePage] = useState("Commodities");

  function activePageHandler(page) {
    setActivePage(page);
  }

  // api call
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
    dataStore: {
      resource: "dataStore/IN5320-<3>/Transactions",
    },
    dataStoreUsers: {
      resource: "dataStore/IN5320-<3>/USERS",
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

  const { loading, error, data, refetch } = useDataQuery(dataQuery);

  if (error) {
    return <span>ERROR: {error.message}</span>;
  }

  if (loading) {
    return <CircularLoader large />;
  }

  if (data) {
    let mergedData = mergeData(data);
    let sortedData = mergedData.sort((a, b) =>
      a.displayName.substring([14]) < b.displayName.substring([14]) ? -1 : 1
    );
    return (
      <div className={classes.container}>
        <div className={classes.left}>
          <Navigation
            activePage={activePage}
            activePageHandler={activePageHandler}
          />
        </div>
        <div className={classes.right}>
          {activePage === "Commodities" && (
            <Commodities mergedData={sortedData} />
          )}
          {activePage === "Insert" && (
            <Insert
              mergedData={sortedData}
              refetch={refetch}
              transactions={data.dataStore}
              users={data.dataStoreUsers}
            />
          )}
          {activePage === "Datasets" && (
            <Datasets mergedData={data.dataStore} />
          )}
        </div>
      </div>
    );
  }
}

export default MyApp;
