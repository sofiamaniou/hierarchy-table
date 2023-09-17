import { DataMaps } from "../models/data/DataMaps";
import { FlattenedTableRow } from "../models/view/FlattenedTableRow";
import { TableData } from "../models/data/TableData";
import { v4 as uuidv4 } from "uuid";

const parentChildrenMap: { [id: string]: string[] } = {};

/**
 * Returns the flattened table rows map and the parent to children relationship map.
 * @param data The table data.
 * @returns The data maps.
 */
export const getDataMaps = (data: TableData[]): DataMaps => {
  let flattenedTableRowsMap: { [id: string]: FlattenedTableRow } = {};
  data.forEach((d: TableData) => {
    flattenedTableRowsMap = { ...flattenedTableRowsMap, ...flatten(d) };
  });

  return { flattenedTableRowsMap, parentChildrenMap };
};

const flatten = (
  item: TableData,
  rowsMap: { [id: string]: FlattenedTableRow } = {},
  label: string = "top-level",
  parentId: string | undefined = undefined
): { [id: string]: FlattenedTableRow } => {
  const id = uuidv4();
  if (parentId) {
    parentChildrenMap[parentId] = [...(parentChildrenMap[parentId] ?? []), id];
  }

  const row = {
    id,
    label,
    viewData: { ...item.data },
  };

  rowsMap[id] = row;

  const hasChildren = !!Object.keys(item.kids).length;
  if (hasChildren) {
    Object.keys(item.kids).forEach((label: string) => {
      const children = item.kids[label].records;
      children.map((child: TableData) => {
        return flatten(child, rowsMap, label, id);
      });
    });
  }

  return rowsMap;
};
