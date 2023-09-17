/**
 * The Error boundary state.
 */
export interface ErrorBoundaryState {
  /**
   * Current error or undefined if none.
   */
  readonly error: Error | undefined;
}
