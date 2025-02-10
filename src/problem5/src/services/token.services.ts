import { ObjectId } from 'mongodb'
import { HttpStatusCode } from '~/constants/HttpStatusCode.enum'
import collections from '~/database/collections'
import { ErrorWithStatus } from '~/models/errors.model'
import Token, { TokenRequestBody } from '~/models/schemas/token.schema'

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
  return res
}
