import { useDataMutation } from "@dhis2/app-runtime";
import { Button } from "@dhis2/ui";

const myMutation = {
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
};

export const RefreshAPI = ({ refetch }) => {
  const [mutate, { loading }] = useDataMutation(myMutation);

  const onClick = async () => {
    await mutate();
    refetch();
  };
  return (
    <Button primary small disabled={loading} onClick={onClick}>
      + New
    </Button>
  );
};
