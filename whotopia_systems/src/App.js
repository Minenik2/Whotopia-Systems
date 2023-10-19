import React from "react";
import classes from "./App.module.css";
import { useState } from "react";
import { Datasets } from "./Components/Datasets";
import { Commodities } from "./Components/Commodities";
import { Insert } from "./Components/Insert";
import { Navigation } from "./Navigation";

function MyApp() {
  const [activePage, setActivePage] = useState("Commodities");

  function activePageHandler(page) {
    setActivePage(page);
  }

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Navigation
          activePage={activePage}
          activePageHandler={activePageHandler}
        />
      </div>
      <div className={classes.right}>
        {activePage === "Commodities" && <Commodities />}
        {activePage === "Insert" && <Insert />}
        {activePage === "Datasets" && <Datasets />}
      </div>
    </div>
  );
}

export default MyApp;
