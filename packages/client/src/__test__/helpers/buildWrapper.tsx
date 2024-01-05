import FormML from '../../FormML.js'
import { FormMLProvider } from '../../useFormMLContext.js'

const buildWrapper =
  (formML: FormML) =>
  ({ children }: React.PropsWithChildren) => (
    <FormMLProvider value={formML}>{children}</FormMLProvider>
  )

export default buildWrapper
