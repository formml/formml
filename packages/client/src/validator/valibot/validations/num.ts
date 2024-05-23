import {
  _addIssue,
  BaseIssue,
  BaseValidation,
  Dataset,
  ErrorMessage,
} from 'valibot'

export interface NumIssue<TInput extends string> extends BaseIssue<TInput> {
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
  readonly type: 'num'
}

export interface NumAction<
  TInput extends string,
  TMessage extends ErrorMessage<NumIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, NumIssue<TInput>> {
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
  readonly reference: typeof num
  /**
   * The validation function.
   */
  readonly requirement: (value: string) => boolean
  /**
   * The action type.
   */
  readonly type: 'num'
}
/**
 * Creates a num validation action.
 *
 * @returns A num action.
 */
export default function num<TInput extends string>(): NumAction<
  TInput,
  undefined
>

/**
 * Creates a num validation action.
 *
 * @param message The error message.
 *
 * @returns A num action.
 */
export default function num<
  TInput extends string,
  const TMessage extends ErrorMessage<NumIssue<TInput>> | undefined,
>(message: TMessage): NumAction<TInput, TMessage>

export default function num(
  message?: ErrorMessage<NumIssue<string>>,
): NumAction<string, ErrorMessage<NumIssue<string>> | undefined> {
  return {
    _run(dataset, config) {
      if (dataset.typed && !this.requirement(dataset.value)) {
        _addIssue(this, 'input', dataset, config)
      }
      return dataset as Dataset<string, NumIssue<string>>
    },
    async: false,
    expects: 'numerical',
    kind: 'validation',
    message,
    reference: num,
    requirement: (value) => !isNaN(Number(value)),
    type: 'num',
  }
}
