export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P]
}

export function mergeOptions<T extends Record<string, unknown>>(
  options: DeepPartial<T> | undefined,
  defaults: T,
): T {
  if (options === undefined) {
    return defaults
  }

  const result: Record<string, unknown> = { ...defaults }

  for (const [key, value] of Object.entries(options)) {
    if (value === undefined) {
      continue
    }

    if (typeof value === 'object' && value !== null) {
      result[key] = mergeOptions(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        value,
        defaults[key] as Record<string, unknown>,
      )
      continue
    }

    result[key] = value
  }

  return result as T
}
