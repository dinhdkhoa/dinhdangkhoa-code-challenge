import { Router } from 'express'
import { tokenControllers } from '~/controllers'

const router = Router()

/**
 * Description: Get Tokens
 * Path: /
 * Method: GET
 */
router.get('', tokenControllers.getTokens)
router.post('', tokenControllers.getTokens)
router.patch('/:tokenId', tokenControllers.getTokens)
router.delete('/:tokenId', tokenControllers.getTokens)

const tokenRouter = router

export default tokenRouter
