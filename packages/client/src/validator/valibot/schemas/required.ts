import {
  _addIssue,
  BaseIssue,
  BaseSchema,
  ErrorMessage,
  InferNonOptionalInput,
  InferNonOptionalIssue,
  InferNonOptionalOutput,
  NonOptionalIssue,
} from 'valibot'

/**
 * Non optional schema type.
 */
export interface NonOptionalSchema<
  TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TMessage extends ErrorMessage<NonOptionalIssue> | undefined,
> extends BaseSchema<
    InferNonOptionalInput<TWrapped>,
    InferNonOptionalOutput<TWrapped>,
    InferNonOptionalIssue<TWrapped> | NonOptionalIssue
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
  readonly type: 'non_optional'
  /**
   * The wrapped schema.
   */
  readonly wrapped: TWrapped
}

/**
 * Creates a non optional schema.
 *
 * @param wrapped The wrapped schema.
 *
 * @returns A non optional schema.
 */
export function required<
  const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(wrapped: TWrapped): NonOptionalSchema<TWrapped, undefined>

/**
 * Creates a non optional schema.
 *
 * @param wrapped The wrapped schema.
 * @param message The error message.
 *
 * @returns A non optional schema.
 */
export function required<
  const TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  const TMessage extends ErrorMessage<NonOptionalIssue> | undefined,
>(wrapped: TWrapped, message: TMessage): NonOptionalSchema<TWrapped, TMessage>

export function required(
  wrapped: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  message?: ErrorMessage<NonOptionalIssue> | undefined,
): NonOptionalSchema<
  BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  ErrorMessage<NonOptionalIssue> | undefined
> {
  return {
    _run(dataset, config) {
      // If value is `undefined`, add issue and return dataset
      if (dataset.value === undefined) {
        _addIssue(this, 'type', dataset, config)
        return dataset
      }

      // Otherwise, return dataset of wrapped schema
      return this.wrapped._run(dataset, config)
    },
    async: false,
    expects: '!undefined',
    kind: 'schema',
    message,
    reference: required,
    type: 'non_optional',
    wrapped,
  }
}
