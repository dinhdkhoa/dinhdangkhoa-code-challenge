import { ComboboxDataType } from "@/components/ui/combobox"
import { http } from "@/lib/http"
import { Token } from "@/types/token.types"

const tokenURL = {
  token: 'token',
  
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
    )
}

export default tokenApi