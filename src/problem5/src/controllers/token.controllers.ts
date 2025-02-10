import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { checkSchema, Schema } from 'express-validator'
import Token, { TokenRequestBody } from '~/models/schemas/token.schema'
import { TokenServices } from '~/services'
import validate from '~/utils/validator'

export const getTokens = async (request: Request, res: Response) => {
  const data = await TokenServices.getTokens()
  res.json({ data })
}

export const addTokenValidator = validate(
  checkSchema(
    {
      currency: {
        trim: true,
        notEmpty: true,
        isString: true
      },
      price: {
        trim: true,
        notEmpty: true,
        isNumeric: true
      },
      image: {
        trim: true
      }
    },
    ['body']
  )
)

export const addToken = async (request: Request<ParamsDictionary, {}, TokenRequestBody>, res: Response) => {
  const data = await TokenServices.addToken(request.body)
  res.json({ message: 'Add Token Successfully ', data })
}

export const tokenIdParamValidator = validate(
  checkSchema(
    {
      tokenId: {
        trim: true,
        notEmpty: true,
        isMongoId: true
      }
    },
    ['params']
  )
)

export const updateToken = async (
  request: Request<{ tokenId: string }, {}, Partial<TokenRequestBody>>,
  res: Response
) => {
  const data = await TokenServices.updateToken(request.body, request.params.tokenId)
  res.json({ message: 'Update Token Successfully ', data })
}
export const deleteToken = async (request: Request<{ tokenId: string }>, res: Response) => {
  const data = await TokenServices.deleteToken(request.params.tokenId)
  res.json({ message: 'Delete Token Successfully ', data })
}
