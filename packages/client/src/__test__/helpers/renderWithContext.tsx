import {
  queries,
  Queries,
  render,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import FormML from '../../FormML.js'
import buildWrapper from './buildWrapper.js'

export default function renderWithContext<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactElement,
  formML: FormML,
  options?: RenderOptions<Q, Container, BaseElement>,
): RenderResult<Q, Container, BaseElement> {
  const wrapper = buildWrapper(formML)
  return render(ui, { wrapper, ...options })
}
