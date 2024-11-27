import { createContext, useContext } from 'react'

import type { FormML } from './FormML.js'

const FormMLContext = createContext<FormML | null>(null)

export const FormMLProvider = FormMLContext.Provider

/**
 * Hook to access FormML instance from context
 * @returns FormML instance from nearest provider
 * @throws Error if used outside FormMLProvider
 * @example
 * ```tsx
 * const formML = useFormMLContext()
 * ```
 */
export function useFormMLContext() {
  const context = useContext(FormMLContext)
  if (context === null) {
    throw new Error('`useFormMLContext` must be used within a `FormMLProvider`')
  }
  return context
}
