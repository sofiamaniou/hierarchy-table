import { fireEvent, render, screen } from "@testing-library/react";

import { DataMaps } from "../models/data/DataMaps";
import { DataMapsContext } from "../context/DataMapsContext";
import { initializeIcons } from "@fluentui/react";
import { Table } from "./Table";
import { TableProps } from "./TableProps";

describe("Table", () => {
  let props: TableProps;
  let context: { maps: DataMaps; setMaps: (maps: DataMaps) => void };

  beforeAll(() => {
    initializeIcons();
  });

  beforeEach(() => {
    props = {
      rowIds: ["id1", "id2"],
      setIsExpanded: jest.fn(),
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
            label: "top-level",
            viewData: {
              Name: "Jake",
              Surname: "Scott",
              Age: "30",
              Gender: "male",
            },
          },
        },
        parentChildrenMap: { id1: ["id3", "id4"] },
      },
      setMaps: jest.fn(),
    };
  });

  it("should render the table populated with data for the given row ids.", () => {
    // Act
    render(
      <DataMapsContext.Provider value={context}>
        <Table {...props} />
      </DataMapsContext.Provider>
    );

    const row1Col1Value = screen.getByText("Claire");
    const row1Col2Value = screen.getByText("Taylor");
    const row1Col3Value = screen.getByText("22");
    const row1Col4Value = screen.getByText("female");

    const row2Col1Value = screen.getByText("Jake");
    const row2Col2Value = screen.getByText("Scott");
    const row2Col3Value = screen.getByText("30");
    const row2Col4Value = screen.getByText("male");

    // Assert
    expect(row1Col1Value).toBeInTheDocument();
    expect(row1Col2Value).toBeInTheDocument();
    expect(row1Col3Value).toBeInTheDocument();
    expect(row1Col4Value).toBeInTheDocument();

    expect(row2Col1Value).toBeInTheDocument();
    expect(row2Col2Value).toBeInTheDocument();
    expect(row2Col3Value).toBeInTheDocument();
    expect(row2Col4Value).toBeInTheDocument();
  });

  it("should remove the row id from the data maps when deleting it.", () => {
    // Act
    render(
      <DataMapsContext.Provider value={context}>
        <Table {...props} />
      </DataMapsContext.Provider>
    );

    const deleteButton = screen.getAllByLabelText("Delete")[0];
    fireEvent.click(deleteButton);

    // Assert
    expect(context.setMaps).toHaveBeenCalledWith({
      flattenedTableRowsMap: { id2: context.maps.flattenedTableRowsMap["id2"] },
      parentChildrenMap: {},
    });
  });
});
