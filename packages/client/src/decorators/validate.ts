import { FormML, FormMLEvent } from '../FormML.js'

export default function validate({ eventName }: { eventName: FormMLEvent }) {
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
      if (this.configs.validateOn.initial === eventName) {
        this.validate(index)
      }
      return result
    }
  }
}
