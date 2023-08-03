import React, { useState, ChangeEvent, useMemo } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './fibonacci-page.module.css'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { getFibonacciNumbers } from '../../utils/get-fibonacci-numbers'
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays'


export const FibonacciPage: React.FC = () => {

  const validateConfig = {
    fibonacciInput: {
      pattern: /^[0-9]+$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимо только число от 1 до 19!!!',
    }
  }

  const { values, errors, isFormValid, handleChange, checkIsFormValid } = useForm( { fibonacciInput: '' }, validateConfig )

  const [ isAnimating, setIsAnimating ] = useState( true )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ symbolsArr, setSymbolsArr ] = useState<number[]>( [] )

  let number: number = parseInt( values.fibonacciInput )
  number = ( number > 19 || number < 1 || !number ) ? 0 : number
  const memoizedFibonacciNumbers = useMemo( () => getFibonacciNumbers( number ) || [], [ number ] )

  async function renderNumbers ( arrNumbers: number[] ) {
    for ( let i = 0; i < arrNumbers.length; i++ ) {
      setSymbolsArr( arrNumbers.slice( 0, i + 1 ) )
      if ( i < arrNumbers.length - 1 ) {
        await delay( SHORT_DELAY_IN_MS )
      } else {
        setIsFormDisabled( false )
      }
    }
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( !checkIsFormValid() ) { return }
    if ( number && number <= 19 && number >= 1 ) {
      setIsFormDisabled( true )
      setIsAnimating( true )
      setSymbolsArr( [] )
      const arrNumbers = memoizedFibonacciNumbers
      setTimeout( () => renderNumbers( arrNumbers ), DELAY_IN_MS )
    }
  }

  const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
    const number = parseInt( e.target.value )
    const isInputValid = ( number && number < 20 && number > 0 ) ? true : false
    handleChange( e, isInputValid )
  }

  return (

    <SolutionLayout title='Последовательность Фибоначчи'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmit }>
        <Input
          placeholder='Введите текст'
          isLimitText={ true }
          limitText={ errors.fibonacciInput ? errors.fibonacciInput : 'Максимальное число — 19' }
          value={ values.fibonacciInput }
          name='fibonacciInput'
          onChange={ onChangeHandler }
          onFocus={ () => {
            setIsAnimating( false )
            setSymbolsArr( [] )
          } }
          maxLength={ 2 }
          disabled={ isFormDisabled }
        />
        <Button
          isLoader={ isFormDisabled }
          text={ isFormDisabled ? '' : 'Рассчитать' }
          type='submit'
          linkedList='small'
          disabled={ !isFormValid }
        />
      </form>

      <div className={ styles.blockLetters }>
        { isAnimating &&
          symbolsArr.map( ( symbol, index ) => (
            <Circle key={ index } tail={ index.toString() } letter={ symbol.toString() } state={ ElementStates.Default } />
          ) )
        }
      </div>
    </SolutionLayout>
  )
}
