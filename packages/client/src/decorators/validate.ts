import { FormML, FormMLEvent } from '../FormML.js'

export default function validate({ eventName }: { eventName: FormMLEvent }) {
  return function decorator<TArgs extends unknown[], TReturn>(
    originalMethod: (this: FormML, index: object, ..._args: TArgs) => TReturn,
    _context: ClassMethodDecoratorContext<
      FormML,
      (this: FormML, index: object, ..._args: TArgs) => TReturn
    >,
  ) {
    return function decoratedMethod(
      this: FormML,
      index: object,
      ..._args: TArgs
    ) {
      const result = originalMethod.call(this, index, ..._args)
      const initial = this.options.validateOn.initial
      const isInitiallyValidated =
        this.getField(index)._internalState.isInitiallyValidated
      !isInitiallyValidated &&
        (initial === 'all' || initial === eventName) &&
        this.validate(index)
      return result
    }
  }
}
