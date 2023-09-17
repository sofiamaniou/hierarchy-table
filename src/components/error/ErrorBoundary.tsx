import { ErrorBoundaryProps } from "./ErrorBoundaryProps";
import { ErrorBoundaryState } from "./ErrorBoundaryState";
import React from "react";

/**
 * Error boundary class.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * Error state.
   */
  public state: ErrorBoundaryState = {
    error: undefined,
  };

  /**
   * Updates the state so the next render will show the fallback UI.
   * @param error Error.
   * @returns New state.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  /**
   * Component did catch.
   * @param error Error.
   */
  public componentDidCatch(error: Error): void {
    console.log(error);
  }

  /**
   * Renders the error component or children if there is no error.
   * @returns React element.
   */
  public render(): React.ReactNode {
    const { errorComponent, children } = this.props;
    const { error } = this.state;

    return error ? errorComponent : children;
  }
}
