import { Router } from 'express'
import tokenRouter from './token.routes'

const router = Router()
router.use('/token', tokenRouter)

const routes = router

export default routes
