import { Card, CardDescription, CardHeader } from './ui/card'
import { TokenState } from './currency-converter'

function InfoCard({ from, to }: { from?: TokenState, to?: TokenState }) {
  if (!from || !to || !from.amount || !from.currency || !to.amount || !to.currency) return null

  return (
    <Card>
      <CardHeader>
        <CardDescription className='flex justify-between'>
          <span className='mt-3'>You're sending {from.amount} in {from.currency} to receive {to.amount} in {to.currency}!!</span>
          {/* <Button className='ml-4' variant={'pink'} onClick={}>
          /Swap <ArrowUpDown className='text-white bg-inherit ' />
          </Button> */}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default InfoCard