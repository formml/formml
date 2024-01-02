import { FormMLProvider } from '../../useFormMLContext.js'
import FormML from '../../FormML.js'

const buildWrapper =
  (formML: FormML) =>
  ({ children }: React.PropsWithChildren) => (
    <FormMLProvider value={formML}>{children}</FormMLProvider>
  )

export default buildWrapper
