import type {
  Queries,
  RenderHookOptions,
  RenderHookResult,
  queries,
} from '@testing-library/react'

import { renderHook } from '@testing-library/react'

import type { FormML } from '../../FormML.js'

import { buildWrapper } from './buildWrapper.js'

export function renderHookWithContext<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends DocumentFragment | Element = HTMLElement,
  BaseElement extends DocumentFragment | Element = Container,
>(
  render: (initialProps: Props) => Result,
  formML: FormML,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
): RenderHookResult<Result, Props> {
  const wrapper = buildWrapper(formML)
  return renderHook(render, { wrapper, ...options })
}
