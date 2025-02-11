import { ObjectId } from 'mongodb'
import { GetMockDataResType } from '../common.model'

interface TokenInterface extends GetMockDataResType {
  _id?: ObjectId
  image?: string
}

export type TokenRequestBody = Pick<TokenInterface, 'currency' | 'price' | 'image'>
export interface SwapTokens {
  amount: number
  currency: string
}
export type SwapTokensRequestBody = {
  from: SwapTokens
  to: SwapTokens
}

export default class Token {
  _id: ObjectId
  currency: string
  date: Date
  price: number
  image?: string

  constructor({ _id, currency, date, price, image }: TokenInterface) {
    this._id = _id || new ObjectId()
    this.currency = currency
    this.date = date ?? new Date()
    this.price = price
    this.image = image
  }
}
