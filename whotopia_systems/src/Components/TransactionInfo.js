import React from "react";
import { Box, Card, IconInfo24 } from "@dhis2/ui";

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
            <IconInfo24 />
            <p>
              Select a transaction from the left in order to view more
              transaction details here.
            </p>
          </div>
        </Card>
      </Box>
    </div>
  );
}
