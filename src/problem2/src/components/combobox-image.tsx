import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ComboboxDataType } from './ui/combobox'
// import { Avatar, AvatarFallback, AvatarImage } from './avatar'

function ComboboxImage({ value }: { value: ComboboxDataType }) {
  return (
    <>
      <Avatar className={'mr-1 h-6 w-6'}>
        <AvatarImage src={value.image || ''} alt={value.label} />
        <AvatarFallback>{value.label}</AvatarFallback>
      </Avatar>
      {value.label}
    </>
  )
}

export default ComboboxImage
