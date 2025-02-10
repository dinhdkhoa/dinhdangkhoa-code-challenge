export interface TokenResType {
  _id: string
  currency: string
  date: Date
  price: number
  image?: string 
}

export type Token = Omit<TokenResType, '_id'>