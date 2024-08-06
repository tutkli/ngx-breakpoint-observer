import { MaybeSignalOrGetter } from '../types';

/**
 * Get the value of value/signal/getter.
 */
export function toValue<T>(r: MaybeSignalOrGetter<T>): T {
  return typeof r === 'function' ? (r as any)() : r;
}
