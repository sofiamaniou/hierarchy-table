/**
 * Interface for the data model.
 */
export interface TableData {
  /**
   * The table columns.
   */
  data: Record<string, string>;

  /**
   * The nested tables.
   */
  kids: Record<string, { records: TableData[] }>;
}
