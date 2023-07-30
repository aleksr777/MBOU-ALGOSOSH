import styles from './queue-page.module.css'
import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { Queue } from './queue-class'
import { delay } from '../../utils/delay'
import { ButtonsHookState } from '../../types/types'


export const QueuePage: React.FC = () => {

  const DELAY_TIME = 500
  const QUEUE_LENGTH = 7

  const validateConfig = {
    queueInput: {
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
  } = useForm( { queueInput: '' }, validateConfig )

  const [ queue, setQueue ] = useState( new Queue<string>( QUEUE_LENGTH ) )
  const [ highlightedIndex, setHighlightedIndex ] = useState<number | null>( null )
  const [ isAllHighlighted, setIsAllHighlighted ] = useState( false )
  const [ prevData, setPrevData ] = useState( { head: 0, tail: 0 } ) 
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    add: { isLoading: false },
    remove: { isLoading: false },
    clear: { isLoading: false }
  } )

  function blockForm ( buttonName: string ) {
    setIsFormDisabled( true )
    setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: true } } ) )
  }

  function activateForm ( buttonName: string ) {
    setIsFormDisabled( false )
    setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: false } } ) )
  }

  // Эти константы нужны, чтобы не допустить зацикливание
  const isMaxTailIndex = prevData.tail === QUEUE_LENGTH - 1
  const isMaxHeadIndex = prevData.head === QUEUE_LENGTH - 1

  const handleAdd = async () => {
    if ( !checkIsFormValid() || isMaxTailIndex ) { return }
    setPrevData( { ...prevData, tail: queue.tail } )
    blockForm( 'add' )
    setHighlightedIndex( queue.tail )
    await delay( DELAY_TIME )
    queue.enqueue( values.queueInput )
    resetField( 'queueInput' )
    setQueue( queue )
    setHighlightedIndex( null )
    activateForm( 'add' )
  }

  const handleRemove = async () => {
    if ( isMaxHeadIndex ) { return }
    setPrevData( { ...prevData, head: queue.head } )
    blockForm( 'remove' )
    setHighlightedIndex( queue.head )
    await delay( DELAY_TIME )
    queue.dequeue()
    setQueue( queue )
    setHighlightedIndex( null )
    activateForm( 'remove' )
  }

  const handleClear = async () => {
    if ( queue.isEmpty && !isMaxHeadIndex ) { return }
    setPrevData( { head: 0, tail: 0 } )
    blockForm( 'clear' )
    setIsAllHighlighted( true )
    await delay( DELAY_TIME )
    queue.clear()
    setQueue( queue )
    setIsAllHighlighted( false )
    activateForm( 'clear' )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    handleAdd()
  }

  return (
    <SolutionLayout title='Очередь'>
      <form className={ styles.formWrapper } onSubmit={ handleSubmit }    >
        <Input
          name='queueInput'
          placeholder='Введите значение'
          isLimitText={ true }
          limitText={ errors.queueInput ? errors.queueInput : 'Максимум — 4 символа' }
          value={ values.queueInput }
          maxLength={ 4 }
          onChange={ handleChange }
          disabled={ isFormDisabled || isMaxTailIndex || isMaxHeadIndex }
        />

        <Button
          type='button'
          linkedList='small'
          extraClass={ styles.button_correct_medium }
          text={ buttonsState.add.isLoading ? '' : 'Добавить' }
          isLoader={ buttonsState.add.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.add.isLoading || !isFormValid || isMaxTailIndex || isMaxHeadIndex }
          onClick={ handleAdd }
        />

        <Button
          type='button'
          linkedList='small'
          extraClass={ `${ styles.button_correct_small } ${ styles.button_correct_mr }` }
          text={ buttonsState.remove.isLoading ? '' : 'Удалить' }
          isLoader={ buttonsState.remove.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.remove.isLoading || queue.isEmpty || isMaxHeadIndex }
          onClick={ handleRemove }
        />

        <Button
          type='button'
          linkedList='small'
          extraClass={ styles.button_correct_medium }
          text={ buttonsState.clear.isLoading ? '' : 'Очистить' }
          isLoader={ buttonsState.clear.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.clear.isLoading || queue.isEmpty && !isMaxHeadIndex }
          onClick={ handleClear }
        />

      </form>
      <div className={ styles.blockAnimate }>
        { queue.elements.map( ( el, index ) => (
          <Circle
            key={ index }
            index={ index }
            tail={
              !queue.isEmpty && index === ( queue.tail - 1 + queue.elements.length ) % queue.elements.length ? 'tail' : ''
            }
            head={ ( index === queue.head && !queue.isEmpty ) ||
              ( queue.isEmpty && index !== 0 && index === queue.head ) ||
              ( isMaxHeadIndex && index === QUEUE_LENGTH - 1 )
              ? 'head'
              : '' }
            letter={ el }
            state={
              ( index === highlightedIndex || isAllHighlighted )
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ) ) }
      </div>

    </SolutionLayout >
  )
}
