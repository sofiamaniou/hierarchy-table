import { IIconProps, IconButton } from "@fluentui/react";
import { useContext, useState } from "react";

import { DataMapsContext } from "../context/DataMapsContext";
import { Table } from "./Table";
import { TableRowProps } from "./TableRowProps";
import { v4 as uuidv4 } from "uuid";

/**
 * Returns the TableRow component.
 * @param props The component properties.
 * @returns The component.
 */
export const TableRow: React.FC<TableRowProps> = (
  props: TableRowProps
): JSX.Element => {
  const { id, values, deleteRow } = props;
  const { maps } = useContext(DataMapsContext);
  const [isExpanded, setIsExpanded] = useState<{ [id: string]: boolean }>({
    [id]: false,
  });

  const childrenIds = maps.parentChildrenMap[id] ?? [];
  const chevronIcon: IIconProps = {
    iconName: isExpanded[id] ? "ChevronDownMed" : "ChevronRightMed",
  };

  const cancelIcon: IIconProps = { iconName: "Cancel" };

  const expandButton = (
    <IconButton
      iconProps={chevronIcon}
      title={isExpanded[id] ? "ChevronDown" : "ChevronRight"}
      ariaLabel={isExpanded[id] ? "ChevronDown" : "ChevronRight"}
      onClick={() => {
        setIsExpanded({ [id]: !isExpanded[id] });
      }}
    />
  );

  const deleteButton = (
    <IconButton
      iconProps={cancelIcon}
      title="Delete"
      ariaLabel="Delete"
      onClick={() => {
        deleteRow(id);
      }}
    />
  );

  const rowData = values.map((value: string, index: number) => {
    const dataKeyId = uuidv4();
    if (index == 0) {
      {
        return childrenIds.length ? (
          <>
            <td key={dataKeyId}>
              {expandButton}
              {value}
            </td>
          </>
        ) : (
          <>
            <td key={dataKeyId} className="indentedItem">
              {value}
            </td>
          </>
        );
      }
    } else if (index == values.length - 1) {
      return (
        <>
          <td key={dataKeyId}>{value}</td>
          <td>{deleteButton}</td>
        </>
      );
    } else {
      return <td key={dataKeyId}>{value}</td>;
    }
  });

  return (
    <>
      <tr key={id}>{rowData}</tr>
      {childrenIds.length && isExpanded[id] ? (
        <tr>
          <td>
            <Table rowIds={childrenIds} setIsExpanded={setIsExpanded} />
          </td>
        </tr>
      ) : null}
    </>
  );
};
