import type { BaseIssue, BaseValidation, ErrorMessage } from 'valibot'

export interface AllowBlankIssue<
  TInput extends string,
  TWrapped extends BaseValidation<TInput, TInput, BaseIssue<TInput>>,
> extends BaseIssue<TInput> {
  /**
   * The expected property.
   */
  readonly expected: null
  /**
   * The issue kind.
   */
  readonly kind: 'validation'
  /**
   * The received property.
   */
  readonly received: `"${string}"`
  /**
   * The issue type.
   */
  readonly type: 'allow_blank'
  /**
   * The wrapped validation.
   */
  readonly wrapped: TWrapped
}

export interface AllowBlankAction<
  TInput extends string,
  TWrapped extends BaseValidation<TInput, TInput, BaseIssue<TInput>>,
  TMessage extends ErrorMessage<AllowBlankIssue<TInput, TWrapped>> | undefined,
> extends BaseValidation<TInput, TInput, AllowBlankIssue<TInput, TWrapped>> {
  /**
   * The expected property.
   */
  readonly expects: null
  /**
   * The error message.
   */
  readonly message: TMessage
  /**
   * The action reference.
   */
  readonly reference: typeof allowBlank
  /**
   * The issue type.
   */
  readonly type: 'allow_blank'
  /**
   * The wrapped validation.
   */
  readonly wrapped: TWrapped
}

/**
 * Creates an allow blank validation action.
 *
 * @param wrapped The wrapped validation.
 *
 * @returns An allow blank action.
 */
export function allowBlank<
  TInput extends string,
  TWrapped extends BaseValidation<TInput, TInput, BaseIssue<TInput>>,
>(wrapped: TWrapped): AllowBlankAction<TInput, TWrapped, undefined>

/**
 * Creates an allow blank validation action.
 *
 * @param wrapped The wrapped validation.
 * @param message The error message.
 *
 * @returns An allow blank action.
 */
export function allowBlank<
  TInput extends string,
  TWrapped extends BaseValidation<TInput, TInput, BaseIssue<TInput>>,
  const TMessage extends
    | ErrorMessage<AllowBlankIssue<TInput, TWrapped>>
    | undefined,
>(
  wrapped: TWrapped,
  message: TMessage,
): AllowBlankAction<TInput, TWrapped, TMessage>

export function allowBlank<
  TInput extends string,
  TWrapped extends BaseValidation<TInput, TInput, BaseIssue<TInput>>,
>(
  wrapped: TWrapped,
  message?: ErrorMessage<AllowBlankIssue<TInput, TWrapped>>,
): AllowBlankAction<
  TInput,
  TWrapped,
  ErrorMessage<AllowBlankIssue<TInput, TWrapped>> | undefined
> {
  return {
    _run(dataset, config) {
      // If value is typed and blank, bypass inner validation
      if (dataset.typed && dataset.value.trim() === '') {
        return dataset
      }

      // Otherwise, run inner validation
      return this.wrapped._run(dataset, config)
    },
    async: false,
    expects: null,
    kind: 'validation',
    message,
    reference: allowBlank,
    type: 'allow_blank',
    wrapped,
  }
}
