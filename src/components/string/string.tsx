import React, { useState } from 'react'
import styles from './string.module.css'
import { useForm } from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { swapElementsArr } from '../../utils/swapElementsArr'

type Symbol = {
  symbol: string
  state: ElementStates
}

export const StringComponent: React.FC = () => {

  const validateConfig = {
    stringInput: {
      pattern: /^[a-zA-Zа-яА-Я0-9]{0,11}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только буквы и цифры!!!',
    }
  }

  const { values, errors, isButtonDisabled, handleChange, isFormValid } = useForm( { stringInput: '' }, validateConfig )

  const [ isAnimating, setIsAnimating ] = useState( true )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ symbolsArr, setSymbolsArr ] = useState<Symbol[]>( [] )

  async function expandString ( arrSymbols: Symbol[] ) {
    let arr = arrSymbols
    let left = 0
    let right = arr.length - 1
    async function changeStatus ( state: ElementStates, left: number, right: number ) {
      arr[ left ].state = state
      arr[ right ].state = state
      return arr
    }
    while ( left < right ) {
      await delay( 600 )
      arr = await changeStatus( ElementStates.Changing, left, right )
      setSymbolsArr( [ ...arr ] )
      await delay( 600 )
      arr = await swapElementsArr( arr, left, right )
      arr = await changeStatus( ElementStates.Modified, left, right )
      setSymbolsArr( [ ...arr ] )
      left++
      right--
    }

    const completedArr = arr.map( ( symbol ) => ( {
      ...symbol,
      state: ElementStates.Modified,
    } ) )
    setSymbolsArr( completedArr )

    setIsFormDisabled( false )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    const isValid = isFormValid()
    if ( !isValid ) { return }
    setIsAnimating( true )
    const arr: Symbol[] = values.stringInput.split( '' ).map( ( symbol ) => ( {
      symbol,
      state: ElementStates.Default,
    } ) )
    if ( arr.length === 1 ) {
      arr[ 0 ].state = ElementStates.Modified
      setSymbolsArr( arr )
      return null
    } else if ( arr.length > 1 ) {
      setSymbolsArr( arr )
      setIsFormDisabled( true )
      setTimeout( () => expandString( arr ), 800 )
    }
  }

  return (
    <SolutionLayout title='Строка'>
      <form className={ styles.formWrapper } onSubmit={ handleSubmit }>
        <Input
          placeholder='Введите текст'
          isLimitText={ true }
          limitText={ errors.stringInput ? errors.stringInput : 'Максимум — 11 символов' }
          value={ values.stringInput }
          name='stringInput'
          onChange={ handleChange }
          onFocus={ () => {
            setIsAnimating( false )
            setSymbolsArr( [] )
          } }
          disabled={ isFormDisabled }
        />
        <Button
          isLoader={ isFormDisabled }
          text={ isFormDisabled ? '' : 'Развернуть' }
          type='submit'
          linkedList='small'
          disabled={ isButtonDisabled }
        />
      </form>

      <div className={ styles.blockLetters }>
        { isAnimating &&
          symbolsArr.map( ( symbol, index ) => (
            <Circle key={ index } letter={ symbol.symbol } state={ symbol.state } />
          ) ) }
      </div>
    </SolutionLayout>
  )
}
