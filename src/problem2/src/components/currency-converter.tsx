import { useGetTokenCombobox } from '@/hooks/query/useGetTokens.query'
import { Button } from './ui/button'
import { Combobox, ComboboxDataType } from './ui/combobox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import InfoCard from './info-card'
import { SwapTokensRequestBody, Token } from '@/types/token.types'
import useSwapTokensMutation from '@/hooks/mutations/useSwapTokens.mutation'
import { toast } from 'sonner'
import Spinner from './ui/spinner'

export interface TokenState {
  value?: number,
  amount?: number,
  currency?: string
}

const exchangeRateBasedOnTokens = (fromTokenAmount?: number, fromRate?: number, toRate?: number, prevValue?: number) => {
  if (fromTokenAmount == 0) return 0
  if (!fromTokenAmount || !fromRate || !toRate) return prevValue ? prevValue : undefined
  return Number((fromTokenAmount * (fromRate / toRate)).toFixed(3))
}

function CurrencyConverter() {
  const { data: comboboxData, isLoading } = useGetTokenCombobox()
  const swapToken = useSwapTokensMutation()

  const [fromToken, setFromToken] = useState<TokenState>()
  const [toToken, setToToken] = useState<TokenState>()

  const handleSetToken = (type: 'from' | 'to') => (token: ComboboxDataType<Token>['data']) => {
    if (!comboboxData || comboboxData.length == 0) return
    const { currency, price } = token!
    if (type == 'to') {
      setToToken((prev) => {
        return {
          ...prev,
          value: price,
          currency,
          amount: exchangeRateBasedOnTokens(fromToken?.amount, fromToken?.value, price, prev?.amount)
        }
      })
      return
    }
    setFromToken((prev) => {
      return {
        ...prev,
        value: price,
        currency,
        amount: exchangeRateBasedOnTokens(toToken?.amount,  toToken?.value,price, prev?.amount)
      }
    })
  }
  const handleChangeTokenAmount = (type: 'from' | 'to') => (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value)
    if (isNaN(amount)) return
    if (type == 'to') {
      setToToken((prev) => {
        return {
          ...prev,
          amount,
        }
      })
      setFromToken((prev) => {
        return {
          ...prev,
          amount: exchangeRateBasedOnTokens(amount, toToken?.value, prev?.value, prev?.amount)
        }
      })
      return
    }
    setToToken((prev) => {
      return {
        ...prev,
        amount: exchangeRateBasedOnTokens(amount, fromToken?.value, prev?.value, prev?.amount)
      }
    })
    setFromToken((prev) => {
      return {
        ...prev,
        amount,
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body: SwapTokensRequestBody = {
      from: {
        amount: fromToken!.amount!,
        currency: fromToken!.currency!,
      },
      to: {
        amount: toToken!.amount!,
        currency: toToken!.currency!,
      }
    }
    const res = await swapToken.mutateAsync(body, {
      onError(err) {
        toast.error(err.message)
      }
    })
    if (res) toast.success(res.message)

  }

  return <fieldset disabled={isLoading || swapToken.isPending}>
    <form action="#" className="mt-8 grid grid-cols-6 gap-3" onSubmit={handleSubmit}>
      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="amountSend" className="block text-left text-sm font-semibold text-gray-700">
          Amount To Send
        </Label>

        <Input
          type="number"
          id="amountSend"
          min={0}
          step="0.001"
          required
          name="amountSend"
          value={fromToken?.amount || ''}
          className="shadow-xs mt-1 w-full rounded-md bg-white text-sm text-gray-700"
          onChange={handleChangeTokenAmount('from')}
        />
      </div>

      <div className="col-span-6 sm:col-span-1">
        <Label htmlFor="Email" className="block text-left text-sm font-semibold text-gray-700">
          From
        </Label>
        <Combobox className='mt-1' data={comboboxData || []} cb={handleSetToken('from')} />
      </div>
      <div className="col-span-6 sm:col-span-4">
        <Label htmlFor="amountReceive" className="block text-left text-sm font-semibold text-gray-700">
          Amount To Receive
        </Label>

        <Input
          type="number"
          id="amountReceive"
          name="amountReceive"
          min={0}
          step="0.001"
          required
          value={toToken?.amount || ''}
          onChange={handleChangeTokenAmount('to')}
          className="shadow-xs mt-1 w-full rounded-md bg-white text-sm text-gray-700"
        />
      </div>
      <div className="col-span-6 sm:col-span-1">
        <Label htmlFor="Email" className="block text-left text-sm font-semibold text-gray-700">
          To
        </Label>
        <Combobox className='mt-1' data={comboboxData || []} cb={handleSetToken('to')} />
      </div>
      <div className="col-span-6">
        <InfoCard from={fromToken} to={toToken} />
      </div>

      <div className="col-span-6">
        <Button className=" px-12 w-full py-3 text-sm transition" variant={'pink'} type='submit'>
          {
            swapToken.isPending ? <Spinner color={'pink'} /> : 'Confirm Swap'
          }
        </Button>
      </div>
    </form>
  </fieldset>
}

export default CurrencyConverter  