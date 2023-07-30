import styles from './stack-page.module.css'
import React, { useState } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { Stack } from './stack-class'
import { ButtonsHookState } from '../../types/types'


export const StackPage: React.FC = () => {

  const DELAY_TIME = 500

  const validateConfig = {
    stackInput: {
      pattern: /^[a-zA-Zа-яА-Я0-9]{0,4}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только буквы и цифры!!!',
    }
  }

  const {
    values,
    errors,
    isFormValid,
    handleChange,
    checkIsFormValid,
    resetField
  } = useForm( { stackInput: '' }, validateConfig )

  const [ highlightedIndex, setHighlightedIndex ] = useState<number | null>( null )
  const [ isAllHighlighted, setIsAllHighlighted ] = useState( false )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ stack, setStack ] = useState( new Stack<string>() )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    push: { isLoading: false },
    pop: { isLoading: false },
    clear: { isLoading: false }
  } )

  function blockForm ( buttonName: string ) {
    setIsFormDisabled( true )
    setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: true } } ) )
  }

  function activateForm ( buttonName: string ) {
    setIsFormDisabled( false)
    setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: false } } ) )
  }

  function getNewStack ( stack: Stack<string> ) {
    const newStack = new Stack<string>()
    stack.getElements().forEach( ( element ) => newStack.push( element ) )
    return newStack
  }

  const handlePush = async () => {
    if ( !checkIsFormValid() ) { return }
    blockForm( 'push' )
    const newStack = getNewStack( stack )
    newStack.push( values.stackInput )
    setStack( newStack )
    resetField( 'stackInput' )
    setHighlightedIndex( stack.size() )
    await delay( DELAY_TIME )
    setHighlightedIndex( null )
    activateForm( 'push' )
  }


  const handlePop = async () => {
    if ( stack.isEmpty() ) { return }
    blockForm( 'pop' )
    const newStack = getNewStack( stack )
    newStack.pop()
    setHighlightedIndex( stack.size() - 1 )
    await delay( DELAY_TIME )
    setStack( newStack )
    setHighlightedIndex( null )
    activateForm( 'pop' )
  }

  const handleClear = async () => {
    if ( stack.isEmpty() ) { return }
    blockForm( 'clear' )
    setIsAllHighlighted( true )
    await delay( DELAY_TIME )
    stack.clear()
    setIsAllHighlighted( false )
    activateForm( 'clear' )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    handlePush()
  }

  return (

    <SolutionLayout title='Стек'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmit }    >

        <Input
          name='stackInput'
          placeholder='Введите значение'
          isLimitText={ true }
          limitText={ errors.stackInput ? errors.stackInput : 'Максимум — 4 символа' }
          value={ values.stackInput }
          maxLength={ 4 }
          onChange={ handleChange }
          disabled={ isFormDisabled }
        />

        <Button
          type='button'
          linkedList='small'
          text={ buttonsState.push.isLoading ? '' : 'Добавить' }
          extraClass={ styles.button_correct_medium }
          isLoader={ buttonsState.push.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.push.isLoading || !isFormValid }
          onClick={ handlePush }
        />

        <Button
          type='button'
          linkedList='small'
          text={ buttonsState.pop.isLoading ? '' : 'Удалить' }
          extraClass={ `${ styles.button_correct_small } ${ styles.button_correct_mr }` }
          isLoader={ buttonsState.pop.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.pop.isLoading || stack.isEmpty() }
          onClick={ handlePop }
        />

        <Button
          type='button'
          linkedList='small'
          text={ buttonsState.clear.isLoading ? '' : 'Очистить' }
          extraClass={ styles.button_correct_medium }
          isLoader={ buttonsState.clear.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.clear.isLoading || stack.isEmpty() }
          onClick={ handleClear }
        />

      </form>

      <div className={ styles.blockAnimate }>
        { stack.getElements().map( ( element, index ) => (
          <Circle
            key={ index }
            index={ index }
            tail=""
            head={ index === stack.size() - 1 ? "top" : "" }
            letter={ element }
            state={
              ( index === highlightedIndex || isAllHighlighted )
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ) ) }
      </div>
      
    </SolutionLayout>
  )
}
