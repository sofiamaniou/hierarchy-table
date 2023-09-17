import { render, screen } from "@testing-library/react";

import { ErrorBoundary } from "./ErrorBoundary";
import React from "react";

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should render the children when there is no error.", async () => {
    // Arrange
    const ErrorComponent: React.FC = () => <>Something went wrong.</>;
    const ChildWithoutError: React.FC = () => <>Hello World!</>;

    // Act
    render(
      <ErrorBoundary errorComponent={<ErrorComponent />}>
        <ChildWithoutError />
      </ErrorBoundary>
    );

    const content = await screen.findByText("Hello World!");

    // Assert
    expect(content).toBeInTheDocument();
  });

  it("should render the error component when there is an error.", async () => {
    // Arrange
    const ErrorComponent: React.FC = () => <>Something went wrong.</>;

    const ChildWithError: React.FC = () => {
      throw new Error("This is an error.");
    };

    // Act
    render(
      <ErrorBoundary errorComponent={<ErrorComponent />}>
        <ChildWithError />
      </ErrorBoundary>
    );

    const message = await screen.findByText("Something went wrong.");

    // Assert
    expect(message).toBeInTheDocument();
  });
});
