export function mergeOptions<T extends object>(
  options: Partial<T> | undefined,
  defaults: T,
): T {
  return { ...defaults, ...options }
}
