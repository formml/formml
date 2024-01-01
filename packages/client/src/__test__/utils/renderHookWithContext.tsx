import {
  queries,
  Queries,
  RenderHookOptions,
  RenderHookResult,
  renderHook,
} from '@testing-library/react'
import { FormMLProvider } from '../../useFormMLContext.js'
import FormML from '../../FormML.js'

const buildWrapper =
  (formML: FormML) =>
  ({ children }: React.PropsWithChildren) => (
    <FormMLProvider value={formML}>{children}</FormMLProvider>
  )

export default function renderHookWithContext<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  render: (initialProps: Props) => Result,
  formML: FormML,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
): RenderHookResult<Result, Props> {
  const wrapper = buildWrapper(formML)
  return renderHook(render, { wrapper, ...options })
}
