import {
  Queries,
  RenderOptions,
  RenderResult,
  queries,
  render,
} from '@testing-library/react'

import { FormML } from '../../FormML.js'
import { buildWrapper } from './buildWrapper.js'

export function renderWithContext<
  Q extends Queries = typeof queries,
  Container extends DocumentFragment | Element = HTMLElement,
  BaseElement extends DocumentFragment | Element = Container,
>(
  ui: React.ReactElement,
  formML: FormML,
  options?: RenderOptions<Q, Container, BaseElement>,
): RenderResult<Q, Container, BaseElement> {
  const wrapper = buildWrapper(formML)
  return render(ui, { wrapper, ...options })
}
