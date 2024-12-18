import type { IAnnotationActions, IAnnotationReducer } from '../reducer.js'

import { base64 } from './base64.js'
import { bic } from './bic.js'
import { bytes } from './bytes.js'
import { creditCard } from './creditCard.js'
import { cuid2 } from './cuid2.js'
import { digits } from './digits.js'
import { email } from './email.js'
import { emoji } from './emoji.js'
import { empty } from './empty.js'
import { endsWith } from './endsWith.js'
import { excludes } from './excludes.js'
import { finite } from './finite.js'
import { hexColor } from './hexColor.js'
import { hexadecimal } from './hexadecimal.js'
import { imei } from './imei.js'
import { includes } from './includes.js'
import { integer } from './integer.js'
import { ip, ipv4, ipv6 } from './ip.js'
import {
  isoDate,
  isoDateTime,
  isoTime,
  isoTimeSecond,
  isoTimestamp,
  isoWeek,
} from './iso-datetime.js'
import { length } from './length.js'
import { mac, mac48, mac64 } from './mac.js'
import { maxBytes } from './maxBytes.js'
import { maxLength } from './maxLength.js'
import { minBytes } from './minBytes.js'
import { minLength } from './minLength.js'
import { multipleOf } from './multipleOf.js'
import { nanoid } from './nanoid.js'
import { notBytes } from './notBytes.js'
import { notLength } from './notLength.js'
import { octal } from './octal.js'
import { regex } from './regex.js'
import { required } from './required.js'
import { safeInteger } from './safeInteger.js'
import { startsWith } from './startsWith.js'
import { ulid } from './ulid.js'
import { url } from './url.js'
import { uuid } from './uuid.js'

type ReducerImplementationMap = {
  [K in keyof IAnnotationActions]: IAnnotationReducer<K>
}

export const reducerImpl = {
  base64,
  bic,
  bytes,
  creditCard,
  cuid2,
  digits,
  email,
  emoji,
  empty,
  endsWith,
  excludes,
  finite,
  hexColor,
  hexadecimal,
  imei,
  includes,
  integer,
  ip,
  ipv4,
  ipv6,
  isoDate,
  isoDateTime,
  isoTime,
  isoTimeSecond,
  isoTimestamp,
  isoWeek,
  length,
  mac,
  mac48,
  mac64,
  maxBytes,
  maxLength,
  minBytes,
  minLength,
  multipleOf,
  nanoid,
  notBytes,
  notLength,
  octal,
  regex,
  required,
  safeInteger,
  startsWith,
  ulid,
  url,
  uuid,
} as const satisfies ReducerImplementationMap
