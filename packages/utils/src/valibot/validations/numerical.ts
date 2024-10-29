import type { BaseIssue, BaseValidation, Dataset, ErrorMessage } from 'valibot'

import { _addIssue } from 'valibot'

export interface NumericalIssue<TInput extends string>
  extends BaseIssue<TInput> {
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
  readonly type: 'numerical'
}

export interface NumericalAction<
  TInput extends string,
  TMessage extends ErrorMessage<NumericalIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, NumericalIssue<TInput>> {
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
  readonly reference: typeof numerical
  /**
   * The validation function.
   */
  readonly requirement: (value: string) => boolean
  /**
   * The action type.
   */
  readonly type: 'numerical'
}

/**
 * Creates a numerical validation action.
 *
 * @returns A numerical action.
 */
export function numerical<TInput extends string>(): NumericalAction<
  TInput,
  undefined
>

/**
 * Creates a numerical validation action.
 *
 * @param message The error message.
 *
 * @returns A numerical action.
 */
export function numerical<
  TInput extends string,
  const TMessage extends ErrorMessage<NumericalIssue<TInput>> | undefined,
>(message: TMessage): NumericalAction<TInput, TMessage>

export function numerical(
  message?: ErrorMessage<NumericalIssue<string>>,
): NumericalAction<string, ErrorMessage<NumericalIssue<string>> | undefined> {
  return {
    _run(dataset, config) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, 'input', dataset, config)
      }
      return dataset as Dataset<string, NumericalIssue<string>>
    },
    async: false,
    expects: 'numerical',
    kind: 'validation',
    message,
    reference: numerical,
    requirement: (value) => value.trim() !== '' && !isNaN(Number(value)),
    type: 'numerical',
  }
}
