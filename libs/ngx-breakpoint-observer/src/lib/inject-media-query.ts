import { DestroyRef, inject, signal, Signal } from '@angular/core';
import { ConfigurableWindow, MaybeSignalOrGetter } from './types';
import { defaultWindow, toValue } from './utils';

/**
 * Reactive Media Query.
 *
 * @param query Media query as a signal or getter or string.
 * @param options Configuration options for window.
 * @returns A read-only signal indicating whether the media query matches.
 */
export function injectMediaQuery(
  query: MaybeSignalOrGetter<string>,
  options: ConfigurableWindow = {}
): Signal<boolean> {
  const destroyRef = inject(DestroyRef);
  const { window = defaultWindow } = options;
  const isSupported =
    window && 'matchMedia' in window && typeof window.matchMedia === 'function';

  let mediaQuery: MediaQueryList | undefined;
  const matches = signal(false);

  const handler = (event: MediaQueryListEvent) => {
    matches.set(event.matches);
  };

  if (isSupported) {
    mediaQuery = window.matchMedia(toValue(query));
    matches.set(mediaQuery.matches);
    if ('addEventListener' in mediaQuery)
      mediaQuery.addEventListener('change', handler);
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(handler);
  }

  destroyRef.onDestroy(() => {
    if (!mediaQuery) return;

    if ('removeEventListener' in mediaQuery)
      mediaQuery.removeEventListener('change', handler);
    // @ts-expect-error deprecated API
    else mediaQuery.removeListener(handler);
  });

  return matches.asReadonly();
}
