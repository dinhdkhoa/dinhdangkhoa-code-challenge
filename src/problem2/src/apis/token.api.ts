import { ComboboxDataType } from "@/components/ui/combobox"
import { http } from "@/lib/http"
import { SwapTokensRequestBody, Token } from "@/types/token.types"

const tokenURL = {
  token: 'token',
  swapToken: 'token/swap',
  
} as const

const tokenApi = {

  getTokens: async () => await http<Token[]>({
    method: "GET",
    route: tokenURL.token
  }).then(
      res => {
        return res.data.map(({currency, price, image, _id}) => {
          const comboboxData : ComboboxDataType = {
            label:currency,
            value:currency,
            data: {
              currency, price, image, _id
            },
            image          }
          return comboboxData
        })
      }
    ),
    swapTokens: async (body: SwapTokensRequestBody) => await http({
    method: "POST",
    route: tokenURL.swapToken,
    body
    }).then(res => {
      return new Promise<typeof res>((resolve) => {
        setTimeout(() => {
          resolve(res)
        }, 5000);
      }) 
    })
}

export default tokenApi