import invalidJson from "./invalid-data.json";
import { isTableDataArray } from "./validator";
import validJson from "./valid-data.json";

describe("isTableDataArray", () => {
  it("should return true if the json object is valid.", () => {
    // Act
    const isDataValid = isTableDataArray(validJson);

    // Assert
    expect(isDataValid).toEqual(true);
  });

  it("should return false if the json object is invalid.", () => {
    // Act
    const isDataValid = isTableDataArray(invalidJson);

    // Assert
    expect(isDataValid).toEqual(false);
  });
});
