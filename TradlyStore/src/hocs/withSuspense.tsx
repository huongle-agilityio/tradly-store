import { ComponentType, ReactNode, Suspense } from 'react';

/**
 * Wraps a component with a `Suspense` boundary. The `fallback` argument can be
 * used to specify a component to render if the wrapped component is
 * suspended.
 *
 * @param Component The component to wrap
 * @param [fallback] The component to render if the wrapped component is
 * suspended
 */
export const withSuspense =
  <P extends {}>(Component: ComponentType<P>, fallback: ReactNode = null) =>
  (props: P) =>
    (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
