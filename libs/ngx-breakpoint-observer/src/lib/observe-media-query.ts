import { effect, type Signal, signal, untracked } from '@angular/core';
import { ConfigurableWindow, MaybeSignalOrGetter } from './types';
import { defaultWindow, toValue } from './utils';

/**
 * **@deprecated** Use `injectMediaQuery` instead.
 *
 * This function will be removed in version `4.0.0`.
 *
 * Reactive Media Query.
 *
 * @param query
 * @param options
 */
export function observeMediaQuery(
  query: MaybeSignalOrGetter<string>,
  options: ConfigurableWindow = {}
): Signal<boolean> {
  const { window = defaultWindow } = options;
  const isSupported =
    window && 'matchMedia' in window && typeof window.matchMedia === 'function';

  let mediaQuery: MediaQueryList | undefined;
  const matches = signal(false);

  const handler = (event: MediaQueryListEvent) => {
    matches.set(event.matches);
  };

  const cleanup = () => {
    if (!mediaQuery) return;

    if ('removeEventListener' in mediaQuery)
      mediaQuery.removeEventListener('change', handler);
    // @ts-expect-error deprecated API
    else mediaQuery.removeListener(handler);
  };

  effect(onCleanup => {
    if (!isSupported) return;

    mediaQuery = window.matchMedia(toValue(query));

    if ('addEventListener' in mediaQuery)
      mediaQuery.addEventListener('change', handler);
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(handler);

    untracked(() => matches.set(!!mediaQuery?.matches));

    onCleanup(cleanup);
  });

  return matches.asReadonly();
}
