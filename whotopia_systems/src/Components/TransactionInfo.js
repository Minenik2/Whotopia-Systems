import React, { useState } from "react";
import { Box, Card, IconInfo16, LogoIcon, Help } from "@dhis2/ui";

export function TransactionInfo() {
  const cardStyle = {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
    height: "30em",
    width: "50em",
  };

  return (
    <div>
      <Box height="30em" width="50em">
        <Card>
          <div style={cardStyle}>
            <div
              style={{
                width: "100px",
              }}
            >
              <LogoIcon />
            </div>
            <br />
            <div
              style={{
                display: "flex",
                "align-items": "end",
              }}
            >
              <IconInfo16 />
              <Help>
                More information about a transaction will be displayed here.
              </Help>
            </div>
          </div>
        </Card>
      </Box>
    </div>
  );
}
