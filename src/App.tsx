import "./App.css";
import data from "../example-data.json";
import { DataMaps } from "./models/data/DataMaps";
import { DataMapsContext } from "./context/DataMapsContext";
import { getDataMaps } from "./mappers/dataMapper";
import { isTableDataArray } from "./models/data/validator/validator";
import { Table } from "./components/Table";
import { TableData } from "./models/data/TableData";
import { useState } from "react";

/**
 * Returns the App root component.
 * @returns The root component.
 */
export const App: React.FC = () => {
  const isDataValid = isTableDataArray(data);

  if (!isDataValid) {
    throw new Error("Invalid data format.");
  }

  const { flattenedTableRowsMap, parentChildrenMap } = getDataMaps(
    data as TableData[]
  );

  const [maps, setMaps] = useState<DataMaps>({
    flattenedTableRowsMap,
    parentChildrenMap,
  });

  const rootRows: string[] = [];
  Object.keys(flattenedTableRowsMap).forEach((key: string) => {
    if (flattenedTableRowsMap[key].label == "top-level") {
      rootRows.push(key);
    }
  });

  return (
    <DataMapsContext.Provider value={{ maps, setMaps: () => setMaps }}>
      <Table rowIds={rootRows} />
    </DataMapsContext.Provider>
  );
};
