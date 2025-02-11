import tokenApi from "@/apis/token.api"
import { SwapTokensRequestBody } from "@/types/token.types"
import { useMutation } from "@tanstack/react-query"


function useSwapTokensMutation() {
  return useMutation({
    mutationFn: (body: SwapTokensRequestBody) => tokenApi.swapTokens(body)
  })
}

export default useSwapTokensMutation