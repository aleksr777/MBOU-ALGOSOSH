import React, { useState, ChangeEvent } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './fibonacci-page.module.css'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { OnlyNumberObjType } from '../../types/types'


export const FibonacciPage: React.FC = () => {

  const validateConfig = {
    fibonacciInput: {
      pattern: /^[0-9]+$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимо только число от 1 до 19!!!',
    }
  }

  const { values, errors, isButtonDisabled, handleChange, isFormValid } = useForm( { fibonacciInput: '' }, validateConfig )

  const [ isAnimating, setIsAnimating ] = useState( true )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ symbolsArr, setSymbolsArr ] = useState<number[]>( [] )

  let isNumValid = true

  function animate ( num: number ) {

    function getFibonacciNumbers ( num: number ) {
      const memo: OnlyNumberObjType = {}
      const arr: number[] = []
      function fillArrNumbers ( a: number, b: number, limit: number, memo: OnlyNumberObjType ): void {
        arr.push( a )
        if ( limit === 0 ) {
          return
        }
        const memoKey = `${ a }_${ b }_${ limit }`
        if ( memo[ memoKey ] !== undefined ) {
          return
        }
        fillArrNumbers( b, a + b, limit - 1, memo )
        memo[ memoKey ] = arr[ arr.length - 1 ]
      }
      fillArrNumbers( 1, 1, num, memo )
      return arr
    }

    async function renderNumbers ( arrNumbers: number[] ) {
      for ( let i = 0; i < arrNumbers.length; i++ ) {
        setSymbolsArr( arrNumbers.slice( 0, i + 1 ) )
        if ( i < arrNumbers.length - 1 ) {
          await delay( 500 )
        } else {
          setIsFormDisabled( false )
        }
      }
    }

    const arrNumbers = getFibonacciNumbers( num )
    renderNumbers( arrNumbers )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    const isValid = isFormValid()
    if ( !isValid ) {
      return
    }
    const number = parseInt( values.fibonacciInput )
    if ( number && number <= 19 && number >= 1 ) {
      setIsFormDisabled( true )
      setIsAnimating( true )
      setSymbolsArr( [] )
      setTimeout( () => animate( number ), 500 )
    }
  }

  return <SolutionLayout title='Последовательность Фибоначчи'>

    <form className={ styles.formWrapper } onSubmit={ handleSubmit }>
      <Input
        placeholder='Введите текст'
        isLimitText={ true }
        limitText={ errors.fibonacciInput ? errors.fibonacciInput : 'Максимальное число — 19' }
        value={ values.fibonacciInput }
        name='fibonacciInput'
        onChange={ ( e: ChangeEvent<HTMLInputElement> ) => {
          const number = parseInt( e.target.value )
          isNumValid = ( number && number < 20 && number > 0 ) ? true : false
          handleChange( e, isNumValid )
        } }
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
        disabled={ isButtonDisabled || !isNumValid }
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
}
