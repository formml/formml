import { FormML } from '../FormML.js'

export default function validate(_option: { eventName: string }) {
  return function decorator(
    originalMethod: (
      this: FormML,
      index: object,
      ..._args: unknown[]
    ) => unknown,
    _context: ClassMethodDecoratorContext<
      FormML,
      (this: FormML, index: object, ..._args: unknown[]) => unknown
    >,
  ) {
    return function decoratedMethod(
      this: FormML,
      index: object,
      ..._args: unknown[]
    ) {
      const result = originalMethod.call(this, index, ..._args)
      this.validate(index)
      return result
    }
  }
}
