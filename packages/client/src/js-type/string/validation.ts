import * as vp from '@formml/utils/valibot-plus'
import * as v from 'valibot'

export const schemas = {
  bool: v.string(),
  datetime: v.pipe(v.string(), vp.allowBlank(vp.isoDateTime())),
  decimal: v.pipe(v.string(), vp.allowBlank(vp.numerical())),
  num: v.pipe(v.string(), vp.allowBlank(vp.numerical())),
  text: v.string(),
}
