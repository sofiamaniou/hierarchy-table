import { FlattenedTableRow } from "../view/FlattenedTableRow";

/**
 * Interface for the data maps.
 */
export interface DataMaps {
  /**
   * The flattened table row map.
   */
  flattenedTableRowsMap: { [id: string]: FlattenedTableRow };

  /**
   * The parent to children relationship map.
   */
  parentChildrenMap: { [id: string]: string[] };
}
