import { computed, Signal } from '@angular/core';
import { injectMediaQuery } from './inject-media-query';
import {
  Breakpoints,
  MaybeSignalOrGetter,
  ObserveBreakpointsOptions,
} from './types';
import { defaultWindow, increaseWithUnit, toValue } from './utils';

/**
 * Reactive viewport breakpoints.
 *
 * This function provides a set of reactive utilities to handle viewport breakpoints.
 * It includes shortcut methods like `greaterOrEqual`, `smallerOrEqual`, `between`, etc.
 *
 * @param breakpoints A map of breakpoint names and their corresponding values.
 * @param options Configuration options such as window and strategy.
 * @returns An object with breakpoint utilities and shortcut methods.
 */
export function injectBreakpoints<K extends string>(
  breakpoints: Breakpoints<K>,
  options: ObserveBreakpointsOptions = {}
) {
  const { window = defaultWindow, strategy = 'min-width' } = options;

  function getValue(k: MaybeSignalOrGetter<K>, delta?: number): string {
    let v = breakpoints[toValue(k)];

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

  const greaterOrEqual = (k: MaybeSignalOrGetter<K>): Signal<boolean> => {
    return injectMediaQuery(() => `(min-width: ${getValue(k)})`, options);
  };

  const smallerOrEqual = (k: MaybeSignalOrGetter<K>): Signal<boolean> => {
    return injectMediaQuery(() => `(max-width: ${getValue(k)})`, options);
  };

  function current() {
    const points = Object.keys(breakpoints).map(
      i => [i, greaterOrEqual(i as K)] as const
    );
    return computed(() => points.filter(([, v]) => v()).map(([k]) => k));
  }

  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () =>
        strategy === 'min-width'
          ? greaterOrEqual(k as K)
          : smallerOrEqual(k as K),
      enumerable: true,
      configurable: true,
    });
    return shortcuts;
  }, {} as Record<K, Signal<boolean>>);

  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k: MaybeSignalOrGetter<K>) {
      return injectMediaQuery(
        () => `(min-width: ${getValue(k, 0.1)})`,
        options
      );
    },
    smaller(k: MaybeSignalOrGetter<K>) {
      return injectMediaQuery(
        () => `(max-width: ${getValue(k, -0.1)})`,
        options
      );
    },
    between(a: MaybeSignalOrGetter<K>, b: MaybeSignalOrGetter<K>) {
      return injectMediaQuery(
        () =>
          `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`,
        options
      );
    },
    isGreater(k: MaybeSignalOrGetter<K>) {
      return match(`(min-width: ${getValue(k, 0.1)})`);
    },
    isGreaterOrEqual(k: MaybeSignalOrGetter<K>) {
      return match(`(min-width: ${getValue(k)})`);
    },
    isSmaller(k: MaybeSignalOrGetter<K>) {
      return match(`(max-width: ${getValue(k, -0.1)})`);
    },
    isSmallerOrEqual(k: MaybeSignalOrGetter<K>) {
      return match(`(max-width: ${getValue(k)})`);
    },
    isInBetween(a: MaybeSignalOrGetter<K>, b: MaybeSignalOrGetter<K>) {
      return match(
        `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`
      );
    },
    current,
    active() {
      const breakpoints = current();
      return computed(() =>
        breakpoints().length === 0
          ? ''
          : breakpoints()[breakpoints().length - 1]
      );
    },
  });
}
