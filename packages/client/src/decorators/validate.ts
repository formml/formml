import { FormML, FormMLEvent } from '../FormML.js'
import { AnyIndex } from '../IndexManager.js'

export default function validate({ eventName }: { eventName: FormMLEvent }) {
  return function decorator<TArgs extends unknown[], TReturn>(
    originalMethod: (this: FormML, index: AnyIndex, ..._args: TArgs) => TReturn,
    _context: ClassMethodDecoratorContext<
      FormML,
      (this: FormML, index: AnyIndex, ..._args: TArgs) => TReturn
    >,
  ) {
    return function decoratedMethod(
      this: FormML,
      index: AnyIndex,
      ..._args: TArgs
    ) {
      const result = originalMethod.call(this, index, ..._args)
      const { initial, subsequent } = this.options.preValidateOn
      const isInitial =
        !this.getField(index)._internalState.isInitiallyValidated
      const condition = isInitial ? initial : subsequent

      if (condition === 'all' || condition === eventName) {
        this.validate(index)
      }

      return result
    }
  }
}
