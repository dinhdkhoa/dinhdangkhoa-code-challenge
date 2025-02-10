import { ObjectId } from 'mongodb'
import { GetMockDataResType } from '../common.model'

interface TokenInterface extends GetMockDataResType {
  _id?: ObjectId
  image?: string
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
    this.date = new Date(date)
    this.price = price
    this.image = image
  }
}
