import { useState, ChangeEvent } from 'react'

type FormValuesType = {
  [ key: string ]: string
}

type UseFormType = {
  values: FormValuesType
  handleChange: ( event: ChangeEvent<HTMLInputElement> ) => void
  setValues: ( values: FormValuesType ) => void
}

export function useForm ( inputValues: FormValuesType = {} ): UseFormType {

  const [ values, setValues ] = useState<FormValuesType>( inputValues )

  const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const { value, name }: { value: string; name: string } = event.target
    setValues( { ...values, [ name ]: value } )
  }

  return { values, handleChange, setValues }
}
