import React, { useState } from 'react'
import styles from './string.module.css'
import { useForm } from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { swapElementsArr } from '../../utils/swapElementsArr'

type Symbol = {
  symbol: string
  state: ElementStates
}

export const StringComponent: React.FC = () => {

  const { values, handleChange } = useForm( { stringInput: '' } )
  const [ isSubmitActive, setIsSubmitActive ] = useState( false )
  const [ isFormActive, setIsFormActive ] = useState( true )
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

    setIsFormActive( true )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( !values.stringInput ) { return null }
    setIsSubmitActive( true )
    const arr: Symbol[] = values.stringInput.split( '' ).map( ( symbol ) => ( {
      symbol,
      state: ElementStates.Default,
    } ) )
    if ( arr.length === 1 ) {
      arr[ 0 ].state = ElementStates.Modified
      setSymbolsArr( arr )
      return null
    }
    else if ( arr.length > 1 ) {
      setSymbolsArr( arr )
      setIsFormActive( false )
      setTimeout( () => expandString( arr ), 800 )
    }
  }

  return (
    <SolutionLayout title='Строка'>
      <form
        className={ styles.formWrapper }
        onSubmit={ handleSubmit }
      >
        <Input
          placeholder='Введите текст'
          isLimitText={ true }
          maxLength={ 11 }
          value={ values.stringInput }
          name='stringInput'
          onChange={ handleChange }
          onFocus={ () => { setSymbolsArr( [] ) } }
          disabled={ isFormActive ? false : true }
        />
        <Button
          isLoader={ isFormActive ? false : true }
          text={ isFormActive ? 'Развернуть' : '' }
          type='submit'
          linkedList='small'
        />
      </form>

      <div className={ styles.blockLetters }>
        { isSubmitActive &&
          symbolsArr.map( ( symbol, index ) => (
            <Circle key={ index } letter={ symbol.symbol } state={ symbol.state } />
          ) ) }
      </div>
    </SolutionLayout>
  )
}
