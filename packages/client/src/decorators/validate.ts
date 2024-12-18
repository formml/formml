import type { FormML, FormMLEvent } from '../FormML.js'
import type { BaseIndex } from '../IndexManager.js'

export default function validate({ eventName }: { eventName: FormMLEvent }) {
  return function decorator<TArgs extends unknown[], TReturn>(
    originalMethod: (
      this: FormML,
      index: BaseIndex,
      ..._args: TArgs
    ) => TReturn,
    _context: ClassMethodDecoratorContext<
      FormML,
      (this: FormML, index: BaseIndex, ..._args: TArgs) => TReturn
    >,
  ) {
    return function decoratedMethod(
      this: FormML,
      index: BaseIndex,
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
