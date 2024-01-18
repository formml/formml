import { FormML } from '../../FormML.js'
import { FormMLProvider } from '../../useFormMLContext.js'

export const buildWrapper = (formML: FormML) => {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <FormMLProvider value={formML}>{children}</FormMLProvider>
  )

  return Wrapper
}
