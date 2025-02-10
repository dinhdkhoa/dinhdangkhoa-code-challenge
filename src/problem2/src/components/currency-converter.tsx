import { useGetTokenCombobox } from '@/hooks/query/useGetTokens.query'
import { Button } from './ui/button'
import { Combobox, ComboboxDataType } from './ui/combobox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ChangeEvent, useState } from 'react'
import InfoCard from './info-card'
import { Token } from '@/types/token.types'

export interface TokenState {
  value?: number,
  amount?: number,
  currency?: string
}

const exchangeRateBasedOnTokens = (fromTokenAmount?: number, fromRate?: number, toRate?: number) => {
  if (fromTokenAmount == 0) return 0
  if (!fromTokenAmount || !fromRate || !toRate) return
  return Number((fromTokenAmount * (fromRate / toRate)).toFixed(3))
}

function CurrencyConverter() {
  const { data: comboboxData } = useGetTokenCombobox()

  const [fromToken, setFromToken] = useState<TokenState>()
  const [toToken, setToToken] = useState<TokenState>()

  const handleSetToken = (type: 'from' | 'to') => (token: ComboboxDataType<Token>['data']) => {
    if (!comboboxData || comboboxData.length == 0) return
    const { currency, price } = token!
    if (type == 'to') {
      setToToken((prev) => {
        console.log({
          ...prev,
          value: price,
          currency,
          amount: exchangeRateBasedOnTokens(fromToken?.amount, price, prev?.value)
        })

        return {
          ...prev,
          value: price,
          currency,
          amount: exchangeRateBasedOnTokens(fromToken?.amount, price, prev?.value)
        }
      })
      setFromToken((prev) => {
        return {
          ...prev,
          amount: exchangeRateBasedOnTokens(toToken?.amount, price, prev?.value)
        }
      })
      return
    }
    setFromToken((prev) => {
      return {
        ...prev,
        value: price,
        currency
      }
    })
    setToToken((prev) => {
      return {
        ...prev,
        amount: exchangeRateBasedOnTokens(fromToken?.amount, price, prev?.value)
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
          amount: exchangeRateBasedOnTokens(amount, toToken?.value, prev?.value)
        }
      })
      return
    }
    setToToken((prev) => {
      return {
        ...prev,
        amount: exchangeRateBasedOnTokens(amount, fromToken?.value, prev?.value)
      }
    })
    setFromToken((prev) => {
      return {
        ...prev,
        amount,
      }
    })
  }

  return <form action="#" className="mt-8 grid grid-cols-6 gap-3">
    <div className="col-span-6 sm:col-span-4">
      <Label htmlFor="amountSend" className="block text-left text-sm font-semibold text-gray-700">
        Amount To Send
      </Label>

      <Input
        type="number"
        id="amountSend"
        name="amountSend"
        value={fromToken?.amount}
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
        value={toToken?.amount}
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
      <Button className=" px-12 w-full py-3 text-sm transition" variant={'pink'}>
        Confirm Swap
      </Button>
    </div>
  </form>
}

export default CurrencyConverter  