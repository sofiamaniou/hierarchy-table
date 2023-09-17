import { TableData } from "../TableData";

/**
 * Validates if the json object is the TableData Javascript object.
 * @returns The validation result.
 */
export const isTableDataArray = (value: unknown): boolean => {
  const array = value as TableData[];

  return Array.isArray(array) && array.every((item) => isTableData(item));
};

const isTableData = (value: unknown): boolean => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const object = value as Record<string, unknown>;

  return (
    typeof object.data === "object" &&
    typeof object.kids === "object" &&
    isRecordOfStringToString(object.data) &&
    isStringToObjectRecord(object.kids)
  );
};

const isRecordOfStringToString = (value: unknown): boolean => {
  const object = value as Record<string, string>;

  for (const key in object) {
    if (typeof key !== "string" || typeof object[key] !== "string") {
      return false;
    }
  }

  return true;
};

const isStringToObjectRecord = (value: unknown): boolean => {
  const object = value as Record<string, { records: TableData[] }>;

  for (const key in object) {
    if (
      typeof key !== "string" ||
      typeof object[key] !== "object" ||
      !isStringToArrayRecord(object[key])
    ) {
      return false;
    }
  }

  return true;
};

const isStringToArrayRecord = (value: unknown): boolean => {
  const object = value as Record<string, TableData[]>;

  return typeof object.records === "object" && isTableDataArray(object.records);
};

// const isArray = (value: unknown): boolean => {
//   const object = value as TableData[];

//   for (let i = 0; i < object.length; i++) {
//     if (typeof object[i] !== "object" && !isTableData(object[i])) {
//       return false;
//     }
//   }

//   return true;
// };
