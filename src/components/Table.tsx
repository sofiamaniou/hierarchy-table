import { useContext, useState } from "react";

import { DataMapsContext } from "../context/DataMapsContext";
import { TableHeader } from "./TableHeader";
import { TableProps } from "./TableProps";
import { TableRow } from "./TableRow";

/**
 * Returns the Table component.
 * @param props The component properties.
 * @returns The component.
 */
export const Table: React.FC<TableProps> = (props: TableProps): JSX.Element => {
  const { rowIds, setIsExpanded } = props;
  const { maps, setMaps } = useContext(DataMapsContext);
  const [itemIds, setItemIds] = useState<string[]>(rowIds);

  const flattenedTableRowsMap = maps.flattenedTableRowsMap;
  const parentChildrenMap = maps.parentChildrenMap;

  const deleteRow = (id: string) => {
    const childrenIds = parentChildrenMap[id] ?? [];

    if (childrenIds.length > 0) {
      childrenIds.forEach((childId: string) => {
        delete flattenedTableRowsMap[childId];
        delete parentChildrenMap[childId];
      });
    }

    delete flattenedTableRowsMap[id];
    delete parentChildrenMap[id];

    Object.keys(parentChildrenMap).forEach((parentId: string) => {
      const newChildren = parentChildrenMap[parentId].filter(
        (childId: string) => childId != id
      );

      if (newChildren.length > 0) {
        parentChildrenMap[parentId] = newChildren;
      } else {
        delete parentChildrenMap[parentId];

        if (setIsExpanded) {
          setIsExpanded(false);
        }
      }
    });

    const newItems = itemIds.filter((itemId: string) => itemId != id);
    setItemIds(newItems);
    setMaps({ flattenedTableRowsMap, parentChildrenMap });
  };

  const getRowElements = (): JSX.Element[] => {
    const rowElements: JSX.Element[] = [];
    let previousLabel = "";

    itemIds.forEach((rowId: string) => {
      const currentRow = flattenedTableRowsMap[rowId];
      const currentLabel = currentRow.label;

      if (currentLabel != previousLabel) {
        if (currentLabel != "top-level") {
          rowElements.push(<tr>{currentLabel}</tr>);
        }

        rowElements.push(
          <TableHeader columns={Object.keys(currentRow.viewData)} />
        );

        previousLabel = currentLabel;
      }

      rowElements.push(
        <TableRow
          id={rowId}
          values={Object.values(flattenedTableRowsMap[rowId].viewData)}
          deleteRow={deleteRow}
        />
      );
    });

    return rowElements;
  };

  return (
    <table>
      <tbody>{getRowElements()}</tbody>
    </table>
  );
};
