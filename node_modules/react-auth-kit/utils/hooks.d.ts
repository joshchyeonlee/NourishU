import type { MutableRefObject } from 'react';
/**
 * @internal
 *
 * React Hook to use the `setInterval` in the component
 *
 * @param callback - The function that will be called on each interval
 * @param delay - The delay on which the callback function is called
 * @returns - The Reference of the `setInterval` function
 */
declare function useInterval(callback: () => void, delay: number | null): MutableRefObject<number | null>;
export { useInterval };
