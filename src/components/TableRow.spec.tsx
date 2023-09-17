import { fireEvent, render, screen } from "@testing-library/react";

import { DataMaps } from "../models/data/DataMaps";
import { DataMapsContext } from "../context/DataMapsContext";
import { initializeIcons } from "@fluentui/react";
import { TableRow } from "./TableRow";
import { TableRowProps } from "./TableRowProps";

describe("TableRow", () => {
  let props: TableRowProps;
  let context: { maps: DataMaps; setMaps: (maps: DataMaps) => void };

  beforeAll(() => {
    initializeIcons();
  });

  beforeEach(() => {
    props = {
      id: "id1",
      values: ["Claire", "Taylor", "22", "female"],
      deleteRow: jest.fn(),
    };

    context = {
      maps: {
        flattenedTableRowsMap: {
          id1: {
            id: "id1",
            label: "top-level",
            viewData: {
              Name: "Claire",
              Surname: "Taylor",
              Age: "22",
              Gender: "female",
            },
          },
          id2: {
            id: "id2",
            label: "has_relatives",
            viewData: {
              "Relative ID": "1007",
              "Patient ID": "34",
              "Frequency of visits": "29",
            },
          },
        },
        parentChildrenMap: { id1: ["id2"] },
      },
      setMaps: jest.fn(),
    };
  });

  it("should render the table row populated with data for the given row id.", () => {
    // Act
    renderTableRow(props);

    const rowCol1Value = screen.getByText("Claire");
    const rowCol2Value = screen.getByText("Taylor");
    const rowCol3Value = screen.getByText("22");
    const rowCol4Value = screen.getByText("female");

    // Assert
    expect(rowCol1Value).toBeInTheDocument();
    expect(rowCol2Value).toBeInTheDocument();
    expect(rowCol3Value).toBeInTheDocument();
    expect(rowCol4Value).toBeInTheDocument();
  });

  it("should render the table row with the expand and delete buttons.", () => {
    // Act
    renderTableRow(props);

    const deleteButton = screen.getByLabelText("Delete");
    const expandButton = screen.getByLabelText("ChevronRight");

    // Assert
    expect(deleteButton).toBeInTheDocument();
    expect(expandButton).toBeInTheDocument();
  });

  it("should show the children rows when the expand button is clicked once.", () => {
    // Act
    renderTableRow(props);

    const expandButton = screen.getByLabelText("ChevronRight");
    fireEvent.click(expandButton);

    const label = screen.getByText("has_relatives");
    const childTableCol1 = screen.getByText("Relative ID");
    const childTableCol2 = screen.getByText("Patient ID");
    const childTableCol3 = screen.getByText("Frequency of visits");

    const childRowCol1Value = screen.getByText("1007");
    const childRowCol2Value = screen.getByText("34");
    const childRowCol3Value = screen.getByText("29");

    // Assert
    expect(label).toBeInTheDocument();
    expect(childTableCol1).toBeInTheDocument();
    expect(childTableCol2).toBeInTheDocument();
    expect(childTableCol3).toBeInTheDocument();
    expect(childRowCol1Value).toBeInTheDocument();
    expect(childRowCol2Value).toBeInTheDocument();
    expect(childRowCol3Value).toBeInTheDocument();
  });

  it("should hide the children rows when the expand button is clicked twice.", () => {
    // Act
    renderTableRow(props);

    const expandButton = screen.getByLabelText("ChevronRight");
    fireEvent.click(expandButton);

    const collapseButton = screen.getByLabelText("ChevronDown");
    fireEvent.click(collapseButton);

    const label = screen.queryByText("has_relatives");

    // Assert
    expect(label).not.toBeInTheDocument();
  });

  it("should not show the children rows if all the childrens are deleted.", () => {
    // Act
    renderTableRow(props);

    const expandButton = screen.getByLabelText("ChevronRight");
    fireEvent.click(expandButton);

    const deleteButton = screen.getAllByLabelText("Delete")[1];
    fireEvent.click(deleteButton);

    const collapseButton = screen.queryByLabelText("ChevronDown");
    const label = screen.queryByText("has_relatives");

    // Assert
    expect(label).not.toBeInTheDocument();
    expect(expandButton).not.toBeInTheDocument();
    expect(collapseButton).not.toBeInTheDocument();
  });

  const renderTableRow = (props: TableRowProps) => {
    return render(
      <DataMapsContext.Provider value={context}>
        <table>
          <tbody>
            <TableRow {...props} />
          </tbody>
        </table>
      </DataMapsContext.Provider>
    );
  };
});
