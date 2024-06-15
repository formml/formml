import * as t from '../types.js'
import { isAssignable, stringify } from '../utils.js'

describe('utils', () => {
  describe('isAssignable', () => {
    test.each([t.Text, t.Num, t.Bool, t.Datetime, t.Decimal])(
      'should always return true if source is any',
      (target) => {
        expect(isAssignable(t.Any, target)).toBe(true)
      },
    )

    test.each([t.Text, t.Num, t.Bool, t.Datetime, t.Decimal])(
      'should always return true if target is any',
      (source) => {
        expect(isAssignable(source, t.Any)).toBe(true)
      },
    )

    test.each([t.Text, t.Num, t.Bool, t.Datetime, t.Decimal])(
      'should return true if source is equal to target',
      (type) => {
        expect(isAssignable(type, type)).toBe(true)
      },
    )

    const permutations = <T>(items: T[]): (readonly [T, T])[] =>
      items.flatMap((x) =>
        items.filter((y) => x !== y).map((y) => [x, y] as const),
      )

    test.each(permutations([t.Text, t.Num, t.Bool, t.Datetime, t.Decimal]))(
      'should return false if source and target are not in same category - %s vs %s',
      (source, target) => {
        expect(isAssignable(source, target)).toBe(false)
      },
    )

    test.each([
      [t.createTextLiteral('hello'), t.Text],
      [t.createNumLiteral(123), t.Num],
      [t.createBoolLiteral(true), t.Bool],
    ])(
      'should return true if source is a literal of target type',
      (source, target) => {
        expect(isAssignable(source, target)).toBe(true)
      },
    )
  })

  describe('stringify', () => {
    test.each([t.Text, t.Num, t.Bool, t.Datetime, t.Decimal])(
      'should return the name if given a constant type',
      (type) => {
        expect(stringify(type)).toBe(type.name)
      },
    )

    test.each([
      [t.createTextLiteral('hello'), '"hello"'],
      [t.createNumLiteral(123), '123'],
      [t.createBoolLiteral(true), 'true'],
      [t.createBoolLiteral(false), 'false'],
    ])(
      'should return the literal value if given a literal type',
      (type, expected) => {
        expect(stringify(type)).toBe(expected)
      },
    )
  })
})
