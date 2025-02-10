import { http } from "@/lib/http"
import { Token } from "@/types/token.types"

const tokenURL = {
  token: 'token',
  
} as const

const tokenApi = {

  getTokens: () => http<Token>({
    method: "GET",
    route: tokenURL.token
  })
}

export default tokenApi