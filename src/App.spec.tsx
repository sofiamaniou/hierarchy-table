import * as dataMapper from "./mappers/dataMapper";
import { render, screen } from "@testing-library/react";

import { App } from "./App";
import { DataMaps } from "./models/data/DataMaps";
import { initializeIcons } from "@fluentui/react";

jest.mock("./mappers/dataMapper");

describe("App", () => {
  let dataMaps: DataMaps;

  beforeAll(() => {
    initializeIcons();
  });

  beforeEach(() => {
    dataMaps = {
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
    };

    jest.spyOn(dataMapper, "getDataMaps").mockReturnValue(dataMaps);
  });

  it("should render the table populated with the root rows.", () => {
    // Act
    render(<App />);

    const tableCol1 = screen.getByText("Name");
    const tableCol2 = screen.getByText("Surname");
    const tableCol3 = screen.getByText("Age");
    const tableCol4 = screen.getByText("Gender");

    const rowCol1Value = screen.getByText("Claire");
    const rowCol2Value = screen.getByText("Taylor");
    const rowCol3Value = screen.getByText("22");
    const rowCol4Value = screen.getByText("female");

    // Assert
    expect(tableCol1).toBeInTheDocument();
    expect(tableCol2).toBeInTheDocument();
    expect(tableCol3).toBeInTheDocument();
    expect(tableCol4).toBeInTheDocument();

    expect(rowCol1Value).toBeInTheDocument();
    expect(rowCol2Value).toBeInTheDocument();
    expect(rowCol3Value).toBeInTheDocument();
    expect(rowCol4Value).toBeInTheDocument();
  });
});
