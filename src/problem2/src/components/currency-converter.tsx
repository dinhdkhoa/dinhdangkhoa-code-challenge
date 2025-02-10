import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Combobox } from './ui/combobox'
import { Button } from './ui/button'

function CurrencyConverter() {
  return <form action="#" className="mt-8 grid grid-cols-6 gap-6">
    <div className="col-span-6">
      <Label htmlFor="number" className="block text-left text-sm font-semibold text-gray-700">
        Amount
      </Label>

      <Input
        type="number"
        id="number"
        name="number"
        className="shadow-xs mt-1 w-full rounded-md bg-white text-sm text-gray-700"
      />
    </div>

    <div className="col-span-6 sm:col-span-3">
      <Label htmlFor="Email" className="block text-left text-sm font-semibold text-gray-700">

        From
      </Label>

      <Combobox />
    </div>
    <div className="col-span-6 sm:col-span-3">
      <Label htmlFor="Email" className="block text-left text-sm font-semibold text-gray-700">
        To
      </Label>
      <Combobox />
    </div>

    <div className="col-span-6">
      <Button className="border-newBackgroundpx-12 focus:ring-3 focus:outline-hidden w-full rounded-md border bg-newBackground py-3 text-sm text-white transition hover:bg-newBackground">
        Create an account
      </Button>
    </div>
  </form>
}

export default CurrencyConverter