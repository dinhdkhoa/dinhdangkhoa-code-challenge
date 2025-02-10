import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ChevronsUpDown } from 'lucide-react'
import * as React from 'react'
import ComboboxImage from '../combobox-image'

export type ComboboxDataType<T = any> = {
  value: string;
  label: string;
  image?: string
  data?: T
}

interface ComboboxProps {
  className?: string | undefined
  data: ComboboxDataType[]
  placeholder?: string,
  cb?: (value: ComboboxDataType['data']) => void
}

export function Combobox({ data, className, cb, placeholder = 'Search Data...' }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const currentTtem = data.find((data) => data.value === value)

  const handleSelect = (newValue: string) => {
    setValue(newValue === value ? '' : newValue)
    setOpen(false)
    cb && cb(data.find((data) => data.value === newValue)!.data)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("min-w-40 2xl:min-w-[266px] justify-between ", className)}>
          {currentTtem ? (
            <ComboboxImage value={currentTtem} />
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-40 lg:min-w-[266px] 2xl:min-w-[376px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No Data</CommandEmpty>
            <CommandGroup>
              {data.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.value}
                  onSelect={handleSelect}
                  data-iscurrentvalue={value == data.value}
                >
                  <ComboboxImage key={data.value} value={data} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}