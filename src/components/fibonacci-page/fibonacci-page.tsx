import React, { useState } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './fibonacci-page.module.css'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'

type Symbol = {
  symbol: string
  state: ElementStates
}

export const FibonacciPage: React.FC = () => {

  const { values, handleChange } = useForm( { fibonachiInput: '' } )
  const [ isSubmitActive, setIsSubmitActive ] = useState( false )
  const [ isFormActive, setIsFormActive ] = useState( true )
  const [ symbolsArr, setSymbolsArr ] = useState<Symbol[]>( [] )


  async function calculate ( arrSymbols: Symbol[] ) {

  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( !values.fibonachiInput ) { return null }
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
      setTimeout( () => calculate( arr ), 800 )
    }
  }

  return <SolutionLayout title='Последовательность Фибоначчи'>

    <form
      className={ styles.formWrapper }
      onSubmit={ handleSubmit }
    >
      <Input
        type=''
        placeholder='Введите текст'
        isLimitText={ true }
        max={ 19 }
        value={ values.stringInput }
        name='stringInput'
        onChange={ handleChange }
        onFocus={ () => { setSymbolsArr( [] ) } }
        disabled={ isFormActive ? false : true }
      />
      <Button
        isLoader={ isFormActive ? false : true }
        text={ isFormActive ? 'Рассчитать' : '' }
        type='submit'
        linkedList='small'
      />
    </form>

    <div className={ styles.blockLetters }>
      { isSubmitActive &&
        //symbolsArr.map( ( symbol, index ) => (
        ( <>
          <Circle /* key={ index } */ tail={ '' } letter={ '1' } state={ ElementStates.Default } />
          <Circle /* key={ index } */ tail={ '1' } letter={ '1' } state={ ElementStates.Default } />
        </> )
        //) )
      }
    </div>
  </SolutionLayout>
}
