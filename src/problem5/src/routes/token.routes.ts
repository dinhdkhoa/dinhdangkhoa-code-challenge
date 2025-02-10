import { Router } from 'express'
import { tokenControllers } from '~/controllers'
import { errorHandler } from '~/utils/error-handlers'

const router = Router()

/**
 * Description: Get Tokens
 * Path: /
 * Method: GET
 */
router.get('', errorHandler(tokenControllers.getTokens))
router.post('/', tokenControllers.addTokenValidator, errorHandler(tokenControllers.addToken))
router.patch('/:tokenId', tokenControllers.tokenIdParamValidator, errorHandler(tokenControllers.updateToken))
router.delete('/:tokenId', tokenControllers.tokenIdParamValidator, errorHandler(tokenControllers.deleteToken))

const tokenRouter = router

export default tokenRouter
