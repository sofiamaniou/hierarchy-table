/**
 * Interface for the TableRow component.
 */
export interface TableRowProps {
  /**
   * The row id.
   */
  id: string;

  /**
   * The row values per column.
   */
  values: string[];

  /**
   * The callback to delete a given row.
   */
  deleteRow: (id: string) => void;
}
