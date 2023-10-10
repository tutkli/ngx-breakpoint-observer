import { computed, type Signal } from '@angular/core';
import { Breakpoints } from './breakpoints';
import { increaseWithUnit } from './increase-with-unit';
import { observeMediaQuery } from './observe-media-query';

/**
 * Reactive viewport breakpoints
 *
 * @param breakpoints
 */
export function observeBreakpoints<K extends string>(
  breakpoints: Breakpoints<K>
) {
  function getValue(k: K, delta?: number): string {
    let v = breakpoints[k];

    if (delta !== null && delta !== undefined) {
      v = increaseWithUnit(v, delta);
    }

    if (typeof v === 'number') {
      v = `${v}px`;
    }

    return v;
  }

  function match(query: string): boolean {
    if (!window) return false;

    return window.matchMedia(query).matches;
  }

  const greaterOrEqual = (k: K): Signal<boolean> => {
    return observeMediaQuery(`(min-width: ${getValue(k)})`);
  };

  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => greaterOrEqual(k as K),
      enumerable: true,
      configurable: true,
    });
    return shortcuts;
  }, {} as Record<K, Signal<boolean>>);

  return Object.assign(shortcutMethods, {
    greater(k: K) {
      return observeMediaQuery(`(min-width: ${getValue(k, 0.1)})`);
    },
    greaterOrEqual,
    smaller(k: K) {
      return observeMediaQuery(`(max-width: ${getValue(k, -0.1)})`);
    },
    smallerOrEqual(k: K) {
      return observeMediaQuery(`(max-width: ${getValue(k)})`);
    },
    between(a: K, b: K) {
      return observeMediaQuery(
        `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`
      );
    },
    isGreater(k: K) {
      return match(`(min-width: ${getValue(k, 0.1)})`);
    },
    isGreaterOrEqual(k: K) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k: K) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isSmallerOrEqual(k: K) {
      return match(`(max-width: ${getValue(k)})`);
    },
    isInBetween(a: K, b: K) {
      return match(
        `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`
      );
    },
    current() {
      const points = Object.keys(breakpoints).map(
        i => [i, greaterOrEqual(i as K)] as const
      );
      return computed(() => points.filter(([, v]) => v()).map(([k]) => k));
    },
  });
}
