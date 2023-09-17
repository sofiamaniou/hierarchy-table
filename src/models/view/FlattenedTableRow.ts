/**
 * Interface for the view model.
 */
export interface FlattenedTableRow {
  /**
   * The row id.
   */
  id: string;

  /**
   * The group label.
   */
  label: string;

  /**
   * The row data.
   */
  viewData: Record<string, string>;
}
