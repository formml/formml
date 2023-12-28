import { createContext, useContext } from 'react'

const FormMLContext = createContext<unknown>(null)

export const FormMLProvider = FormMLContext.Provider

export default function useFormMLContext() {
  const context = useContext(FormMLContext)
  if (context === null) {
    throw new Error('`useFormMLContext` must be used within a `FormMLProvider`')
  }
  return context
}
