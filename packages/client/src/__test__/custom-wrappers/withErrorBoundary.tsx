// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { queries } from '@testing-library/react' // This is a workaround for typescript & pnpm bug https://github.com/microsoft/TypeScript/issues/47663
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import wrapRender from './shared/wrapRender.js'
import wrapRenderHook from './shared/wrapRenderHook.js'

export default function withErrorBoundary(onError: (error: Error) => void) {
  const wrapper = ({ children }: React.PropsWithChildren) => (
    <ErrorBoundary fallback={<div>Something went wrong</div>} onError={onError}>
      {children}
    </ErrorBoundary>
  )
  return {
    render: wrapRender(wrapper),
    renderHook: wrapRenderHook(wrapper),
  }
}
