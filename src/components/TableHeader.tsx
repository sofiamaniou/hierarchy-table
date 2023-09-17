import { TableHeaderProps } from "./TableHeaderProps";
import { v4 as uuidv4 } from "uuid";

/**
 * Returns the TableHeader component.
 * @param props The component properties.
 * @returns The component.
 */
export const TableHeader: React.FC<TableHeaderProps> = (
  props: TableHeaderProps
): JSX.Element => {
  const columns = props.columns.map((value: string) => {
    const headerKeyId = uuidv4();
    return <th key={headerKeyId}>{value}</th>;
  });

  return (
    <tr>
      {columns}
      <th></th>
    </tr>
  );
};
