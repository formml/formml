import {
  _addIssue,
  BaseIssue,
  BaseSchema,
  ErrorMessage,
  InferNonOptionalInput,
  InferNonOptionalIssue,
  InferNonOptionalOutput,
} from 'valibot'

/**
 * Required issue type.
 */
export interface RequiredIssue extends BaseIssue<unknown> {
  /**
   * The expected property.
   */
  readonly expected: '!undefined' | 'not blank'
  /**
   * The issue kind.
   */
  readonly kind: 'schema'
  /**
   * The issue type.
   */
  readonly type: 'required'
}

/**
 * Required schema type.
 */
export interface RequiredSchema<
  TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TMessage extends ErrorMessage<RequiredIssue> | undefined,
> extends BaseSchema<
    InferNonOptionalInput<TWrapped>,
    InferNonOptionalOutput<TWrapped>,
    InferNonOptionalIssue<TWrapped> | RequiredIssue
  > {
  /**
   * The expected property.
   */
  readonly expects: '!undefined'
  /**
   * The error message.
   */
  readonly message: TMessage
  /**
   * The schema reference.
   */
  readonly reference: typeof required
  /**
   * The schema type.
   */
  readonly type: 'required'
  /**
   * The wrapped schema.
   */
  readonly wrapped: TWrapped
}

/**
 * Creates a required schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A required schema.
 */
export function required<
  const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(wrapped: TWrapped): RequiredSchema<TWrapped, undefined>

/**
 * Creates a required schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A required schema.
 */
export function required<
  const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  const TMessage extends ErrorMessage<RequiredIssue> | undefined,
>(wrapped: TWrapped, message: TMessage): RequiredSchema<TWrapped, TMessage>

export function required(
  wrapped: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  message?: ErrorMessage<RequiredIssue> | undefined,
): RequiredSchema<
  BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  ErrorMessage<RequiredIssue> | undefined
> {
  return {
    _run(dataset, config) {
      // If value is `undefined`, add issue and return dataset
      if (dataset.value === undefined) {
        _addIssue(this, 'input', dataset, config)
        return dataset
      }

      // If value is string but blank, add issue and return dataset
      if (typeof dataset.value === 'string' && dataset.value.trim() === '') {
        _addIssue(this, 'input', dataset, config, { expected: 'not blank' })
        return dataset
      }

      // Otherwise, return dataset of wrapped schema
      return this.wrapped._run(dataset, config)
    },
    async: false,
    expects: '!undefined',
    kind: 'schema',
    message:
      message ??
      ((issue) =>
        typeof issue.input === 'undefined'
          ? 'Invalid input: Field is required'
          : issue.message),
    reference: required,
    type: 'required',
    wrapped,
  }
}
