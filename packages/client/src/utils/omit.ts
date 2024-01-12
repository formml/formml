export default function omit<T extends object, K extends keyof T>(
  object: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...object }
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}
