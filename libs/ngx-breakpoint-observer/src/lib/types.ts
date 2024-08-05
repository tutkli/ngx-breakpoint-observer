import { Signal } from '@angular/core';

export type MaybeSignalOrGetter<T> = T | Signal<T> | (() => T);
