import { ObjectId } from 'mongodb'
import { HttpStatusCode } from '~/constants/HttpStatusCode.enum'
import collections from '~/database/collections'
import { ErrorWithStatus } from '~/models/errors.model'
import Token, { SwapTokens, TokenRequestBody } from '~/models/schemas/token.schema'

export const getTokens = async () => {
  const tokens = await collections.token.find().toArray()
  return tokens
}
export const addToken = async (body: TokenRequestBody) => {
  const isExisted = await collections.token.findOne({ currency: body.currency })
  if (Boolean(isExisted))
    throw new ErrorWithStatus({ status: HttpStatusCode.Conflict, message: 'Token existed, you can update instead' })
  const res = await collections.token.insertOne(new Token(body))
  return res
}
export const updateToken = async (body: Partial<TokenRequestBody>, id: string) => {
  const res = await collections.token.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...body
      },
      $currentDate: {
        date: true
      }
    }
  )
  return body
}
export const deleteToken = async (id: string) => {
  const res = await collections.token.findOneAndDelete({ _id: new ObjectId(id) })
  if (res) return res
  throw new ErrorWithStatus({ status: HttpStatusCode.NotFound, message: `Can\'t find token` })
}

export const swapToken = async (from: SwapTokens, to: SwapTokens) => {
  const fromToken = await collections.token.findOne({ currency: from.currency })
  if (!Boolean(fromToken))
    throw new ErrorWithStatus({ status: HttpStatusCode.NotFound, message: `Can\'t find token ${from.currency}` })

  const toToken = await collections.token.findOne({ currency: to.currency })
  if (!Boolean(toToken))
    throw new ErrorWithStatus({ status: HttpStatusCode.NotFound, message: `Can\'t find token ${to.currency}` })

  const exchangeAmount = (toToken!.price / fromToken!.price) * from.amount
  return `You've successfully exchanged ${from.amount} ${from.currency} to ${exchangeAmount.toFixed(3)} ${to.currency}`
}
