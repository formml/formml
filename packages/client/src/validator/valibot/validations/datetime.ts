import {
  _addIssue,
  BaseIssue,
  BaseValidation,
  Dataset,
  ErrorMessage,
} from 'valibot'

// source: https://rgxdb.com/r/526K7G5W
const ISO8601_REGEX =
  /^(?:[+-]?\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24:?00)(?:[.,]\d+(?!:))?)?(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[zZ]|(?:[+-])(?:[01]\d|2[0-3]):?(?:[0-5]\d)?)?)?)?$/

export interface DatetimeIssue<TInput extends string>
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
  readonly type: 'datetime'
}

export interface DatetimeAction<
  TInput extends string,
  TMessage extends ErrorMessage<DatetimeIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, DatetimeIssue<TInput>> {
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
  readonly reference: typeof datetime
  /**
   * The validation regex.
   */
  readonly requirement: RegExp
  /**
   * The action type.
   */
  readonly type: 'datetime'
}

/**
 * Creates a datetime validation action.
 *
 * @returns A datetime action.
 */
export default function datetime<TInput extends string>(): DatetimeAction<
  TInput,
  undefined
>

/**
 * Creates a datetime validation action.
 *
 * @param message The error message.
 *
 * @returns A datetime action.
 */
export default function datetime<
  TInput extends string,
  const TMessage extends ErrorMessage<DatetimeIssue<TInput>> | undefined,
>(message: TMessage): DatetimeAction<TInput, TMessage>

export default function datetime(
  message?: ErrorMessage<DatetimeIssue<string>>,
): DatetimeAction<string, ErrorMessage<DatetimeIssue<string>> | undefined> {
  return {
    _run(dataset, config) {
      if (
        dataset.typed &&
        dataset.value.trim() &&
        !this.requirement.test(dataset.value.trim())
      ) {
        _addIssue(this, 'input', dataset, config)
      }
      return dataset as Dataset<string, DatetimeIssue<string>>
    },
    async: false,
    expects: 'ISO-8601 format',
    kind: 'validation',
    message,
    reference: datetime,
    requirement: ISO8601_REGEX,
    type: 'datetime',
  }
}
