import { Signal } from '@angular/core';

export type Breakpoints<K extends string = string> = Record<K, number | string>;

export type MaybeSignalOrGetter<T> = T | Signal<T> | (() => T);

export interface ConfigurableWindow {
  /**
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window;
}

export interface ObserveBreakpointsOptions extends ConfigurableWindow {
  /**
   * The query strategy to use for the generated shortcut methods like `.lg`
   *
   * 'min-width' - .lg will be true when the viewport is greater than or equal to the lg breakpoint (mobile-first)
   * 'max-width' - .lg will be true when the viewport is smaller than the xl breakpoint (desktop-first)
   *
   * @default "min-width"
   */
  strategy?: 'min-width' | 'max-width';
}

export const isClient =
  typeof window !== 'undefined' && typeof document !== 'undefined';
export const defaultWindow = isClient ? window : undefined;
