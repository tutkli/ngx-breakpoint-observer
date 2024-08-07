export const isClient =
  typeof window !== 'undefined' && typeof document !== 'undefined';
export const defaultWindow = isClient ? window : undefined;
