/**
 * @packageDocumentation
 *
 * Utility Module
 *
 * It contains all the utility functions
 *
 */
import { AuthKitStateInterface } from '../types';
/**
 *
 * @typeParam T - Type of User State Object
 * @param auth - The Auth Object
 * @returns A boolean value indicting if currently authenticated or not
 *
 * @internal
 *
 */
declare function isAuthenticated<T>(auth: AuthKitStateInterface<T>): boolean;
export { isAuthenticated };
