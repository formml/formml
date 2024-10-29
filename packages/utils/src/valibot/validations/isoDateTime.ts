import type { BaseIssue, BaseValidation, Dataset, ErrorMessage } from 'valibot'

import { _addIssue } from 'valibot'

// source: https://rgxdb.com/r/526K7G5W
const ISO8601_REGEX =
  /^(?:[+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24:?00)(?:[.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[zZ]|(?:[+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/

export interface IsoDateTimeIssue<TInput extends string>
  extends BaseIssue<TInput> {
  /**
   * The expected property.
   */
  readonly expected: 'ISO-8601 format'
  /**
   * The issue kind.
   */
  readonly kind: 'validation'
  /**
   * The received property.
   */
  readonly received: `"${string}"`
  /**
   * The validation regex.
   */
  readonly requirement: RegExp
  /**
   * The issue type.
   */
  readonly type: 'iso_date_time'
}

export interface IsoDateTimeAction<
  TInput extends string,
  TMessage extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, IsoDateTimeIssue<TInput>> {
  /**
   * The expected property.
   */
  readonly expects: 'ISO-8601 format'
  /**
   * The error message.
   */
  readonly message: TMessage
  /**
   * The action reference.
   */
  readonly reference: typeof isoDateTime
  /**
   * The validation regex.
   */
  readonly requirement: RegExp
  /**
   * The action type.
   */
  readonly type: 'iso_date_time'
}

/**
 * Creates a loose ISO-8601 date time validation action.
 *
 * @returns A loose ISO-8601 date time action.
 */
export function isoDateTime<TInput extends string>(): IsoDateTimeAction<
  TInput,
  undefined
>

/**
 * Creates a loose ISO-8601 date time validation action.
 *
 * @param message The error message.
 *
 * @returns A loose ISO-8601 date time action.
 */
export function isoDateTime<
  TInput extends string,
  const TMessage extends ErrorMessage<IsoDateTimeIssue<TInput>> | undefined,
>(message: TMessage): IsoDateTimeAction<TInput, TMessage>

export function isoDateTime(
  message?: ErrorMessage<IsoDateTimeIssue<string>>,
): IsoDateTimeAction<
  string,
  ErrorMessage<IsoDateTimeIssue<string>> | undefined
> {
  return {
    _run(dataset, config) {
      if (dataset.typed && !this.requirement.test(dataset.value)) {
        _addIssue(this, 'input', dataset, config)
      }
      return dataset as Dataset<string, IsoDateTimeIssue<string>>
    },
    async: false,
    expects: 'ISO-8601 format',
    kind: 'validation',
    message,
    reference: isoDateTime,
    requirement: ISO8601_REGEX,
    type: 'iso_date_time',
  }
}
