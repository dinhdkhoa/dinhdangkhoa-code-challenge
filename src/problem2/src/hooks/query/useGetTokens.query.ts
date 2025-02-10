import tokenApi from "@/apis/token.api"
import { useQuery } from "@tanstack/react-query"

export const useGetTokenCombobox = () => {
  return useQuery({
    queryKey: ['getTokens'],
    queryFn: () => tokenApi.getTokens()
  })
}