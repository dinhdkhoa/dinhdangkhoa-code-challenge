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
 * Method: POST
 * Body: {
    currency?: string;
    price?: number;
    image?: string;
  } 
 */
router.post('/', tokenControllers.addTokenValidator, errorHandler(tokenControllers.addToken))
/**
 * Description: Swap Token Confirm
 * Path: /swap
 * Method: POST
 */
router.post('/swap', errorHandler(tokenControllers.swapToken))
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
