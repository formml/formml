import type { BaseIssue, BaseValidation, Dataset, ErrorMessage } from 'valibot'

import { _addIssue } from 'valibot'

export interface BoolIssue<TInput extends string> extends BaseIssue<TInput> {
  /**
   * The expected property.
   */
  readonly expected: 'string'
  /**
   * The issue kind.
   */
  readonly kind: 'validation'
  /**
   * The received property.
   */
  readonly received: `"${string}"`
  /**
   * The validation function.
   */
  readonly requirement: (value: string) => boolean
  /**
   * The issue type.
   */
  readonly type: 'bool'
}

export interface BoolAction<
  TInput extends string,
  TMessage extends ErrorMessage<BoolIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, BoolIssue<TInput>> {
  /**
   * The expected property.
   */
  readonly expects: 'string'
  /**
   * The error message.
   */
  readonly message: TMessage
  /**
   * The action reference.
   */
  readonly reference: typeof bool
  /**
   * The validation function.
   */
  readonly requirement: (value: string) => boolean
  /**
   * The action type.
   */
  readonly type: 'bool'
}
/**
 * Creates a bool validation action.
 *
 * @returns A bool action.
 */
export default function bool<TInput extends string>(): BoolAction<
  TInput,
  undefined
>

/**
 * Creates a bool validation action.
 *
 * @param message The error message.
 *
 * @returns A bool action.
 */
export default function bool<
  TInput extends string,
  const TMessage extends ErrorMessage<BoolIssue<TInput>> | undefined,
>(message: TMessage): BoolAction<TInput, TMessage>

export default function bool(
  message?: ErrorMessage<BoolIssue<string>>,
): BoolAction<string, ErrorMessage<BoolIssue<string>> | undefined> {
  return {
    _run(dataset, config) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, 'input', dataset, config)
      }
      return dataset as Dataset<string, BoolIssue<string>>
    },
    async: false,
    expects: 'string',
    kind: 'validation',
    message,
    reference: bool,
    requirement: () => true, // always true
    type: 'bool',
  }
}
