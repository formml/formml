import FormML from '../../FormML.js'
import { FormMLProvider } from '../../useFormMLContext.js'

const buildWrapper = (formML: FormML) => {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <FormMLProvider value={formML}>{children}</FormMLProvider>
  )

  return Wrapper
}

export default buildWrapper
