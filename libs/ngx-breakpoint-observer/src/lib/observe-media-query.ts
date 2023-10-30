import { effect, type Signal, signal, untracked } from '@angular/core';

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

    mediaQuery = window.matchMedia(query);
    untracked(() => matches.set(!!mediaQuery?.matches));

    if (!mediaQuery) return;

    mediaQuery.addEventListener('change', update);
  };

  effect(onCleanup => {
    update();
    onCleanup(() => cleanup());
  });

  return matches.asReadonly();
}
