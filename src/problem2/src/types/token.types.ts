export interface Token {
  _id: string
  currency: string
  date: Date
  price: number
  image?: string 
}
export interface SwapTokens {
  amount: number
  currency: string
}
export type SwapTokensRequestBody = {
  from: SwapTokens
  to: SwapTokens
}