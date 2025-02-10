import { Request, Response } from 'express'
import { TokenServices } from '~/services'

export const getTokens = async (request: Request, res: Response) => {
  const data = await TokenServices.getTokens()
  res.json({ data })
}

export const addToken = async (request: Request, res: Response) => {
  const data = await TokenServices.getTokens()
  res.json({ data })
}
export const updateToken = async (request: Request, res: Response) => {
  const data = await TokenServices.getTokens()
  res.json({ data })
}
export const deleteToken = async (request: Request, res: Response) => {
  const data = await TokenServices.getTokens()
  res.json({ data })
}
