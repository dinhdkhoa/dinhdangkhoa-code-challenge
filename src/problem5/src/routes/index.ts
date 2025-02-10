import { Request, Response, Router } from 'express'
import collections from '~/database/collections'

const router = Router()
router.use('/token', async (request: Request, res: Response) => {
  const data = await collections.token.find().toArray()
  res.json({ data })
})

const routes = router

export default routes
