/**
 * Interface for the Table component.
 */
export interface TableProps {
  /**
   * The row ids.
   */
  rowIds: string[];

  /**
   * The callback to expand/collapse a row.
   */
  setIsExpanded?: (row: { [id: string]: boolean }) => void;
}
