import { effect, type Signal, signal } from '@angular/core';

/**
 * Reactive Media Query.
 *
 * @param query
 */
export function observeMediaQuery(query: string): Signal<boolean> {
  const isSupported = signal(
    window && 'matchMedia' in window && typeof window.matchMedia === 'function'
  );

  let mediaQuery: MediaQueryList | undefined;
  const matches = signal(false);

  const cleanup = () => {
    if (!mediaQuery) return;

    mediaQuery.removeEventListener('change', update);
  };

  const update = () => {
    if (!isSupported()) return;

    cleanup();

    mediaQuery = window.matchMedia(query);
    matches.set(!!mediaQuery?.matches);

    if (!mediaQuery) return;

    mediaQuery.addEventListener('change', update);
  };

  effect(update, { allowSignalWrites: true });

  return matches.asReadonly();
}
