import {
  Queries,
  RenderOptions,
  RenderResult,
  queries,
  render,
} from '@testing-library/react'
import React from 'react'

export default function wrapRender(
  customWrapper: React.ComponentType,
): <
  Q extends Queries = typeof queries,
  Container extends DocumentFragment | Element = HTMLElement,
  BaseElement extends DocumentFragment | Element = Container,
>(
  ui: React.ReactNode,
  options: RenderOptions<Q, Container, BaseElement>,
) => RenderResult<Q, Container, BaseElement>
export default function wrapRender(
  customWrapper: React.ComponentType,
): (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, 'queries'>,
) => RenderResult
export default function wrapRender(customWrapper: React.ComponentType) {
  return (ui: React.ReactNode, options: RenderOptions) =>
    render(ui, {
      wrapper: customWrapper,
      ...options,
    })
}
