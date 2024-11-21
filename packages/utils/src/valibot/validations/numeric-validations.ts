import { BigNumber } from 'bignumber.js'
import * as v from 'valibot'

// Known Limitation: The wrapped function's parameters are always not optional even if the original function accepts optional parameters.
// This is a limitation of the TypeScript's Parameters utility type.
function toNumeric<
  TValidator extends (...args: unknown[]) => v.BaseValidation<
    number,
    number,
    v.BaseIssue<number>
  > & {
    requirement: unknown
  },
>(
  validator: TValidator,
  requirement: (
    value: BigNumber | number,
    original: ReturnType<TValidator>['requirement'],
    args: Parameters<TValidator>,
  ) => boolean,
  run?: (
    this: ReturnType<TValidator> & {
      requirement: (value: BigNumber | number) => boolean
    },
    ...args: Parameters<ReturnType<TValidator>['_run']>
  ) => ReturnType<ReturnType<TValidator>['_run']>,
) {
  return <TInput extends BigNumber | number>(
    ...args: Parameters<TValidator>
  ): v.BaseValidation<TInput, TInput, v.BaseIssue<TInput>> => {
    const action = validator(...args)
    return {
      ...action,
      _run: run ?? action._run,
      requirement: (value: BigNumber | number) =>
        requirement(value, action.requirement, args),
    } as v.BaseValidation<TInput, TInput, v.BaseIssue<TInput>>
  }
}

export const finite = toNumeric(v.finite, (value, original) =>
  BigNumber.isBigNumber(value) ? value.isFinite() : original(value),
)
export const integer = toNumeric(v.integer, (value, original) =>
  BigNumber.isBigNumber(value) ? value.isInteger() : original(value),
)
export const multipleOf = toNumeric(
  v.multipleOf,
  (value, _, args) =>
    BigNumber.isBigNumber(value)
      ? value.mod(args[0]).eq(0)
      : value % args[0] === 0,
  function (dataset, config) {
    if (dataset.typed && !this.requirement(dataset.value)) {
      v._addIssue(this, 'multiple', dataset, config)
    }
    return dataset
  },
)
