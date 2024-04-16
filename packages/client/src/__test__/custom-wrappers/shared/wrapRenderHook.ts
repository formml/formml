import { renderHook } from '@testing-library/react'
import React from 'react'

export default function wrapRenderHook(
  customWrapper: React.ComponentType,
): typeof renderHook {
  return (render, options) =>
    renderHook(render, { wrapper: customWrapper, ...options })
}
