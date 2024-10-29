import type { BaseIssue, BaseValidation, Dataset, ErrorMessage } from 'valibot'

import { _addIssue } from 'valibot'

export interface DecimalIssue<TInput extends string> extends BaseIssue<TInput> {
  /**
   * The expected property.
   */
  readonly expected: 'numerical'
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
  readonly type: 'decimal'
}

export interface DecimalAction<
  TInput extends string,
  TMessage extends ErrorMessage<DecimalIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, DecimalIssue<TInput>> {
  /**
   * The expected property.
   */
  readonly expects: 'numerical'
  /**
   * The error message.
   */
  readonly message: TMessage
  /**
   * The action reference.
   */
  readonly reference: typeof decimal
  /**
   * The validation function.
   */
  readonly requirement: (value: string) => boolean
  /**
   * The action type.
   */
  readonly type: 'decimal'
}
/**
 * Creates a decimal validation action.
 *
 * @returns A decimal action.
 */
export default function decimal<TInput extends string>(): DecimalAction<
  TInput,
  undefined
>

/**
 * Creates a decimal validation action.
 *
 * @param message The error message.
 *
 * @returns A decimal action.
 */
export default function decimal<
  TInput extends string,
  const TMessage extends ErrorMessage<DecimalIssue<TInput>> | undefined,
>(message: TMessage): DecimalAction<TInput, TMessage>

export default function decimal(
  message?: ErrorMessage<DecimalIssue<string>>,
): DecimalAction<string, ErrorMessage<DecimalIssue<string>> | undefined> {
  return {
    _run(dataset, config) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, 'input', dataset, config)
      }
      return dataset as Dataset<string, DecimalIssue<string>>
    },
    async: false,
    expects: 'numerical',
    kind: 'validation',
    message,
    reference: decimal,
    requirement: (value) => !isNaN(Number(value)),
    type: 'decimal',
  }
}
