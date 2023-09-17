import { render, screen } from "@testing-library/react";

import { TableHeader } from "./TableHeader";
import { TableHeaderProps } from "./TableHeaderProps";

describe("TableHeader", () => {
  it("should render the table headers.", () => {
    // Arrange
    const props: TableHeaderProps = {
      columns: ["Name", "Surname", "Age", "Gender"],
    };

    // Act
    render(
      <table>
        <tbody>
          <TableHeader {...props} />
        </tbody>
      </table>
    );

    const tableCol1 = screen.getByText(props.columns[0]);
    const tableCol2 = screen.getByText(props.columns[1]);
    const tableCol3 = screen.getByText(props.columns[2]);
    const tableCol4 = screen.getByText(props.columns[3]);

    // Assert
    expect(tableCol1).toBeInTheDocument();
    expect(tableCol2).toBeInTheDocument();
    expect(tableCol3).toBeInTheDocument();
    expect(tableCol4).toBeInTheDocument();
  });
});
