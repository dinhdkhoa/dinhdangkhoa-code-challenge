import tokenApi from "@/apis/token.api"
import { useQuery } from "@tanstack/react-query"

export const useGetTokens = () => {
  return useQuery({
    queryKey: ['getTokens'],
    queryFn: () => tokenApi.getTokens()
  })
}