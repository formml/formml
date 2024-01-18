export default function assertNever(
  strings: TemplateStringsArray,
  never: never,
): never {
  const [firstString, ...restStrings] = strings
  throw new Error([firstString, JSON.stringify(never), ...restStrings].join(''))
}
