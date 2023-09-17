import React, { PropsWithChildren } from "react";

/**
 * Interface for the ErrorBoundary component.
 */
export interface ErrorBoundaryProps extends PropsWithChildren {
  /**
   * Error component to be rendered if error is thrown.
   */
  readonly errorComponent: React.ReactNode;
}
