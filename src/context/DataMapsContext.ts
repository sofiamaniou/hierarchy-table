import { DataMaps } from "../models/data/DataMaps";
import { createContext } from "react";

export const DataMapsContext = createContext<{
  maps: DataMaps;
  setMaps: (maps: DataMaps) => void;
}>({
  maps: {
    flattenedTableRowsMap: {},
    parentChildrenMap: {},
  },
  setMaps: () => {},
});
