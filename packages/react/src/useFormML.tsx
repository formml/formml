import type { IndexRoot, PartialFormMLOptions } from '@formml/client'
import type { ValidationError } from '@formml/core'
import type { FormMLSchema } from '@formml/dsl'

import { FormML } from '@formml/client'
import React from 'react'

import { FormMLProvider } from './useFormMLContext.js'
import { useConstant } from './utils/useConstant.js'

/**
 * Submit handler type
 * @param data - The form data object containing field values
 * @param event - The original form submit event
 */
export type SubmitHandler = (
  data: object,
  event: React.FormEvent<HTMLFormElement>,
) => void

/**
 * Submit error handler type
 * @param errors - Array of validation errors that occurred
 */
export type SubmitErrorHandler = (errors: ValidationError[]) => void

export interface FormMLPack<T extends FormMLSchema> {
  /** Index to the form, the root of all child indexes */
  $form: IndexRoot<T>
  /** FormML context provider */
  FormML: React.FC<React.PropsWithChildren>
  /**
   * Creates a submit handler
   * @param onSubmit - Callback function called with form data when validation succeeds
   * @param onError - Optional callback function called with validation errors when validation fails
   * @returns Form submit event handler
   * @example
   * ```tsx
   * const { handleSubmit } = useFormML(schema)
   * const onSubmit = handleSubmit(
   *   (data) => {
   *     console.log('Validation succeeded:', data)
   *   },
   *   (errors) => {
   *     console.log('Validation failed:', errors)
   *   },
   * )
   * return (
   *   <form onSubmit={onSubmit}>
   *     ...
   *   </form>
   * )
   * ```
   */
  handleSubmit(
    this: void,
    onSubmit: SubmitHandler,
    onError?: SubmitErrorHandler,
  ): React.FormEventHandler<HTMLFormElement>
  /** FormML instance */
  instance: FormML<T>
}

/**
 * Hook to create and manage a FormML instance
 * @param schema - The FormML schema
 * @param options - Optional FormML configurations
 * @returns Object containing fields index root, FormML instance and helper components/functions
 * @example
 * ```tsx
 * const { $form, FormML, handleSubmit } = useFormML(schema)
 *
 * const onSubmit = handleSubmit((data) => {
 *   console.log(data)
 * })
 *
 * return (
 *   <FormML>
 *     <form onSubmit={onSubmit}>
 *       <Field $bind={$form.email} />
 *       <Field $bind={$form.password} />
 *       <button>Submit</button>
 *     </form>
 *   </FormML>
 * )
 * ```
 */
export function useFormML<T extends FormMLSchema>(
  schema: T,
  options?: PartialFormMLOptions,
): FormMLPack<T> {
  const formML = useConstant(
    () => new FormML(schema, options),
    [schema, options],
  )

  const handleSubmit =
    (
      onSubmit: SubmitHandler,
      onError?: SubmitErrorHandler,
    ): React.FormEventHandler<HTMLFormElement> =>
    (event) => {
      event.preventDefault()
      const result = formML.validateAll()
      if (result.isValid) {
        return onSubmit(formML.getTypedData(), event)
      }
      if (onError) {
        return onError(result.errors)
      }
    }

  const FormMLWrapper = React.useCallback(
    (props: React.PropsWithChildren) => (
      <FormMLProvider value={formML}>{props.children}</FormMLProvider>
    ),
    [formML],
  )

  return {
    $form: formML.indexRoot,
    FormML: FormMLWrapper,
    handleSubmit,
    instance: formML,
  }
}
