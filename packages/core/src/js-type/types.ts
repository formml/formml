import type { BigNumber } from 'bignumber.js'

export type PrimitiveTypeMapping = {
  bool: boolean
  datetime: Date | undefined
  decimal: BigNumber | undefined
  num: number | undefined
  text: string
}

export type PrimitiveType = PrimitiveTypeMapping[keyof PrimitiveTypeMapping]
