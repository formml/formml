import type { FormML } from '@formml/client'

import { createContext, useContext } from 'react'

const FormMLContext = createContext<FormML | null>(null)

export const FormMLProvider = FormMLContext.Provider

/**
 * Hook to obtain FormML instance from context
 * @returns FormML instance from nearest provider
 * @throws Error if used outside the provider
 */
export function useFormMLContext() {
  const context = useContext(FormMLContext)
  if (context === null) {
    throw new Error('`useFormMLContext` must be used within a `FormMLProvider`')
  }
  return context
}
