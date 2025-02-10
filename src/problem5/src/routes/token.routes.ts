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
/**
 * Description: Add Token
 * Path: /:tweet_id
 * Method: GET
 * Body: {
    currency?: string;
    price?: number;
    image?: string;
  } 
 */
router.post('/', tokenControllers.addTokenValidator, errorHandler(tokenControllers.addToken))
/**
 * Description: Update Token
 * Path: /:tokenId
 * Method: PATCH
 */
router.patch('/:tokenId', tokenControllers.tokenIdParamValidator, errorHandler(tokenControllers.updateToken))
/**
 * Description: Delete Token
 * Path: /:tokenId
 * Method: DELETE
 */
router.delete('/:tokenId', tokenControllers.tokenIdParamValidator, errorHandler(tokenControllers.deleteToken))

const tokenRouter = router

export default tokenRouter
