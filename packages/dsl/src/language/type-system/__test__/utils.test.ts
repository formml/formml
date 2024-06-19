import * as t from '../types.js'
import { isAssignable, stringify } from '../utils.js'

describe('utils', () => {
  describe('isAssignable', () => {
    test.each([
      t.Text,
      t.Num,
      t.Bool,
      t.Datetime,
      t.Decimal,
      t.createObjectType({ a: t.Text }),
    ])('should always return true if source is any', (target) => {
      expect(isAssignable(t.Any, target)).toBe(true)
    })

    test.each([
      t.Text,
      t.Num,
      t.Bool,
      t.Datetime,
      t.Decimal,
      t.createObjectType({ a: t.Text }),
    ])('should always return true if target is any', (source) => {
      expect(isAssignable(source, t.Any)).toBe(true)
    })

    test.each([
      t.Text,
      t.Num,
      t.Bool,
      t.Datetime,
      t.Decimal,
      t.createObjectType({ a: t.Text }),
    ])('should return true if source is equal to target', (type) => {
      expect(isAssignable(type, type)).toBe(true)
    })

    const permutations = <T>(items: T[]): (readonly [T, T])[] =>
      items.flatMap((x) =>
        items.filter((y) => x !== y).map((y) => [x, y] as const),
      )

    test.each(
      permutations([
        t.Text,
        t.Num,
        t.Bool,
        t.Datetime,
        t.Decimal,
        t.createObjectType({ a: t.Text }),
      ]),
    )(
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

    test.each([
      [t.Text, t.createTextLiteral('hello')],
      [t.Num, t.createNumLiteral(123)],
      [t.Bool, t.createBoolLiteral(true)],
    ])(
      'should return false if target is a literal of source type',
      (source, target) => {
        expect(isAssignable(source, target)).toBe(false)
      },
    )

    test.each([
      t.createTextLiteral('hello'),
      t.createNumLiteral(123),
      t.createBoolLiteral(true),
    ])('should return true if both have the same literal value', (type) => {
      expect(isAssignable(type, type)).toBe(true)
    })

    test.each([
      [t.createTextLiteral('hello'), t.createTextLiteral('world')],
      [t.createNumLiteral(123), t.createNumLiteral(456)],
      [t.createBoolLiteral(true), t.createBoolLiteral(false)],
    ])(
      'should return false if source and target have different literal values',
      (source, target) => {
        expect(isAssignable(source, target)).toBe(false)
      },
    )

    test.each([
      [
        t.createObjectType({ a: t.Text, b: t.Num }),
        t.createObjectType({ a: t.Text }),
      ],
      [
        t.createObjectType({ a: t.createTextLiteral('hello') }),
        t.createObjectType({ a: t.Text }),
      ],
    ])(
      'should return true if source object is a subtype of target object',
      (source, target) => {
        expect(isAssignable(source, target)).toBe(true)
      },
    )

    test.each([
      [
        t.createObjectType({ a: t.Text }),
        t.createObjectType({ a: t.Text, b: t.Num }),
      ],
      [
        t.createObjectType({ a: t.Text }),
        t.createObjectType({ a: t.createTextLiteral('hello') }),
      ],
    ])(
      'should return false if source object is a superset of target object',
      (source, target) => {
        expect(isAssignable(source, target)).toBe(false)
      },
    )

    test('should return false if source and target object have symmetric differences', () => {
      const source = t.createObjectType({ a: t.Text, b: t.Num })
      const target = t.createObjectType({ a: t.Text, c: t.Bool })
      expect(isAssignable(source, target)).toBe(false)
    })
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
