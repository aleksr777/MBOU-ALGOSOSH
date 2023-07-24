import { useState, ChangeEvent } from 'react'

type OnlyStringObjType = {
  [ key: string ]: string
}

type PatternData = {
  pattern: RegExp
  errorMinCharsMessage?: string
  errorMaxCharsMessage?: string
  defaultErrorMessage?: string
  checkIsEmptyValue?: boolean
  emptyValueMessage?: string
}

type PatternsType = {
  [ key: string ]: PatternData
}

type UseFormType = {
  values: OnlyStringObjType
  handleChange: ( event: ChangeEvent<HTMLInputElement> ) => void
  setValues: ( values: OnlyStringObjType ) => void
  errors: OnlyStringObjType
  validateForm: () => Promise<boolean>
}

type MinMaxCharsType = { minChars: number | null; maxChars: number | null } | null

export function useForm (
  inputValues: OnlyStringObjType = {},
  patterns?: PatternsType
): UseFormType {

  const [ values, setValues ] = useState<OnlyStringObjType>( inputValues )
  const [ errors, setErrors ] = useState<{ [ key: string ]: string }>( {} )

  function getMinMaxChars ( regex: RegExp ): MinMaxCharsType {
    const regexStr = regex.source
    const minMatch = regexStr.match( /{(\d+)(?:,\d+)?}/ )
    const maxMatch = regexStr.match( /{\d+,(\d+)}/ )
    const minChars: number | null = minMatch ? parseInt( minMatch[ 1 ] ) : 1
    let maxChars: number | null = maxMatch ? parseInt( maxMatch[ 1 ] ) : 1
    // Дополнительная проверка для +$
    function endsWithPlusSign ( regexStr: string ) {
      return regexStr[ regexStr.length - 2 ] === '+' && regexStr[ regexStr.length - 1 ] === '$'
    }
    if ( endsWithPlusSign( regexStr ) ) { maxChars = null }
    return { minChars, maxChars }
  }

  function removeCharacterCounts ( regex: RegExp ): RegExp {
    let regexStr = regex.source
    const matches = regexStr.match( /\{(\d+)(,(\d+)?)?\}/g )
    if ( regexStr[ regexStr.length - 2 ] === ']' && regexStr[ regexStr.length - 1 ] === '$' ) {
      regexStr = regexStr.slice( 0, -1 ) + '+' + regexStr.slice( -1 )
    }
    if ( !matches ) { return new RegExp( regexStr ) }
    // Заменяем найденные части регулярного выражения на плюс, чтобы сделать символы неограниченными
    for ( const match of matches ) {
      const numbers = match.match( /\d+/g )
      if ( numbers ) {
        regexStr = regexStr.replace( match, '+' )
      }
    }
    return new RegExp( regexStr )
  }

  function getPatternData ( fieldName: string ) {
    const data = patterns && patterns[ fieldName ]
    if ( data ) {
      const { pattern, errorMinCharsMessage, errorMaxCharsMessage, defaultErrorMessage, checkIsEmptyValue, emptyValueMessage } = data
      const minMaxChars = getMinMaxChars( pattern )
      const maxChars = minMaxChars?.maxChars
      const minChars = minMaxChars?.minChars
      const patternWithoutCount = removeCharacterCounts( pattern )
      return { pattern, errorMinCharsMessage, errorMaxCharsMessage, defaultErrorMessage, checkIsEmptyValue, emptyValueMessage, minChars, maxChars, patternWithoutCount }
    }
  }

  const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    if ( !event.target ) { return }
    let { value, name }: { value: string; name: string } = event.target
    setValues( { ...values, [ name ]: value } )
    if ( patterns && patterns[ name ] ) {
      validateField( name, value )
    }
  }

  const validateField = ( fieldName: string, value: string ) => {
    const patternData = getPatternData( fieldName )
    if ( patternData ) {
      const { errorMaxCharsMessage, defaultErrorMessage, checkIsEmptyValue, emptyValueMessage, maxChars, patternWithoutCount } = patternData
      if ( checkIsEmptyValue && value.trim() === '' ) {
        setErrors( ( prevErrors ) => ( {
          ...prevErrors,
          [ fieldName ]: emptyValueMessage || 'Обязательно для заполнения!!!',
        } ) )
      } else if ( value && !patternWithoutCount.test( value ) ) {
        setErrors( ( prevErrors ) => ( {
          ...prevErrors,
          [ fieldName ]: defaultErrorMessage || 'Недопустимые символы!!!',
        } ) )
      } else if ( value && patternWithoutCount.test( value ) && maxChars && maxChars < value.length ) {
        setErrors( ( prevErrors ) => ( {
          ...prevErrors,
          [ fieldName ]: errorMaxCharsMessage || `Не более ${ maxChars } символов!!!`,
        } ) )
      }
      else {
        setErrors( ( prevErrors ) => ( {
          ...prevErrors,
          [ fieldName ]: '',
        } ) )
      }
    }
  }

  async function validateForm () {
    let isValid = true
    if ( patterns ) {
      for ( const fieldName in patterns ) {
        const patternData = getPatternData( fieldName )
        if ( patternData ) {
          const { errorMinCharsMessage, errorMaxCharsMessage, defaultErrorMessage, checkIsEmptyValue, emptyValueMessage, minChars, maxChars, patternWithoutCount } = patternData
          if ( checkIsEmptyValue && values[ fieldName ].trim() === '' ) {
            isValid = false
            setErrors( ( prevErrors ) => ( {
              ...prevErrors,
              [ fieldName ]: emptyValueMessage || 'Обязательно для заполнения!!!',
            } ) )
          } else if ( values[ fieldName ] && !patternWithoutCount.test( values[ fieldName ] ) ) {
            isValid = false
            setErrors( ( prevErrors ) => ( {
              ...prevErrors,
              [ fieldName ]: defaultErrorMessage || 'Недопустимые символы!!!',
            } ) )
          } else if ( values[ fieldName ] && patternWithoutCount.test( values[ fieldName ] ) && minChars && minChars > values[ fieldName ].length ) {
            isValid = false
            setErrors( ( prevErrors ) => ( {
              ...prevErrors,
              [ fieldName ]: errorMinCharsMessage || `Не менее ${ minChars } символов!!!`,
            } ) )
          } else if ( values[ fieldName ] && patternWithoutCount.test( values[ fieldName ] ) && maxChars && maxChars < values[ fieldName ].length ) {
            isValid = false
            setErrors( ( prevErrors ) => ( {
              ...prevErrors,
              [ fieldName ]: errorMaxCharsMessage || `Не более ${ maxChars } символов!!!`,
            } ) )
          }
          else {
            setErrors( ( prevErrors ) => ( {
              ...prevErrors,
              [ fieldName ]: '',
            } ) )
          }
        }
      }
    }
    return isValid
  }

  return { values, handleChange, setValues, errors, validateForm }
}
