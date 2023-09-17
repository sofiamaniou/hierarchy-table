import * as uuid from "uuid";

import { FlattenedTableRow } from "../models/view/FlattenedTableRow";
import { getDataMaps } from "./dataMapper";
import { TableData } from "../models/data/TableData";

jest.mock("uuid");

describe("getDataMaps", () => {
  const data: TableData[] = [
    {
      data: {
        Name: "Claire",
        Surname: "Taylor",
        Age: "22",
        Gender: "female",
      },
      kids: {
        has_relatives: {
          records: [
            {
              data: {
                "Relative ID": "1007",
                "Patient ID": "34",
                "Frequency of visits": "29",
              },
              kids: {
                has_phone: {
                  records: [
                    {
                      data: {
                        "Phone ID": "2008",
                        "ID of the relative": "1007",
                        Phone: "+(179)-982-0570",
                      },
                      kids: {},
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ];

  const expectedFlattenedTableRowsMap: { [id: string]: FlattenedTableRow } = {
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
    id3: {
      id: "id3",
      label: "has_phone",
      viewData: {
        "Phone ID": "2008",
        "ID of the relative": "1007",
        Phone: "+(179)-982-0570",
      },
    },
  };

  const expectedParentChildrenMap: { [id: string]: string[] } = {
    id1: ["id2"],
    id2: ["id3"],
  };

  it("should return the data maps correctly.", () => {
    // Arrange
    jest
      .spyOn(uuid, "v4")
      .mockImplementationOnce(() => "id1")
      .mockImplementationOnce(() => "id2")
      .mockImplementationOnce(() => "id3");

    // Act
    const maps = getDataMaps(data);

    // Assert
    expect(maps).toBeDefined();
    expect(maps.flattenedTableRowsMap).toBeDefined();
    expect(maps.parentChildrenMap).toBeDefined();
    expect(maps.flattenedTableRowsMap).toEqual(expectedFlattenedTableRowsMap);
    expect(maps.parentChildrenMap).toEqual(expectedParentChildrenMap);
  });
});
