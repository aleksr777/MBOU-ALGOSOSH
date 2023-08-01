import React, { useState, useEffect } from 'react'
import styles from './string.module.css'
import { useForm } from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { delay } from '../../utils/delay'
import { swapElementsArr } from '../../utils/swapElementsArr'
import { getReversingStringSteps, getSymbolState } from '../../utils/string-component-utils'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { blockForm, activateForm } from '../../utils/block-activate-form'
import { ButtonsHookState, StateIndeces } from '../../types/types'
import { buttonDefaultState } from '../../constants/button-default-state'

export const StringComponent: React.FC = () => {

  const validateConfig = {
    stringInput: {
      pattern: /^[a-zA-Zа-яА-Я0-9]{0,11}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только буквы и цифры!!!',
    }
  }

  const { values, errors, isFormValid, handleChange, checkIsFormValid } = useForm( { stringInput: '' }, validateConfig )

  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ symbolsArr, setSymbolsArr ] = useState<string[]>( [] )
  const [ stateIndeces, setStateIndeces ] = useState<StateIndeces>( {
    changing: null,
    modified: null
  } )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( { reversString: buttonDefaultState } )
  // Для блокировки-разблокировки формы
  const formUseStates = { setIsFormDisabled, setButtonsState, buttonsState }

  async function renderSymbols ( value: string ) {

    blockForm( 'reversString', formUseStates )

    let arrSymbols = value.split( "" )

    if ( !arrSymbols.length ) {
      return activateForm( 'reversString', formUseStates )
    }

    if ( arrSymbols.length < 2 ) {
      setSymbolsArr( [ ...arrSymbols ] )
      activateForm( 'reversString', formUseStates )
      return setStateIndeces( {
        changing: null,
        modified: [ -1, -1 ]
      } )
    }

    const steps = await getReversingStringSteps( arrSymbols )

    for ( let i = 0; i < steps.length; i++ ) {
      let arr = steps[ i ]
      let left = i
      let right = arr.length - left - 1
      if ( left < right ) {
        setSymbolsArr( [ ...arr ] )
        setStateIndeces( {
          changing: [ left, right ],
          modified: [ left - 1, right + 1 ]
        } )
        await delay( SHORT_DELAY_IN_MS )
        swapElementsArr( arr, left, right )
        setSymbolsArr( [ ...arr ] )
        setStateIndeces( {
          changing: null,
          modified: [ left, right ]
        } )
        await delay( SHORT_DELAY_IN_MS )
      } else {
        setStateIndeces( {
          changing: null,
          modified: [ -1, -1 ]
        } )
      }
    }
    activateForm( 'reversString', formUseStates )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    setTimeout( () => renderSymbols( values.stringInput ), SHORT_DELAY_IN_MS )
  }

  return (

    <SolutionLayout title='Строка'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmit }>
        <Input
          placeholder='Введите текст'
          name='stringInput'
          maxLength={ 11 }
          isLimitText={ true }
          limitText={ errors.stringInput ? errors.stringInput : 'Максимум — 11 символов' }
          value={ values.stringInput }
          onChange={ handleChange }
          onFocus={ () => {
            setSymbolsArr( [] )
          } }
          disabled={ isFormDisabled }
        />

        <Button
          type='submit'
          linkedList='small'
          extraClass={ styles.button_correct }
          text={ buttonsState.reversString.isLoading ? '' : 'Развернуть' }
          isLoader={ buttonsState.reversString.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.reversString.isLoading || !isFormValid }
        />

      </form>

      <div className={ styles.blockLetters }>
        { symbolsArr.map( ( symbol, index ) => (
          <Circle key={ index } letter={ symbol } state={ getSymbolState( stateIndeces, index ) } />
        ) ) }
      </div>

    </SolutionLayout>
  )
}
