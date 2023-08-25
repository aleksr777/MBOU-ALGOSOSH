import styles from './queue-page.module.css'
import React, { useState, useRef, useEffect, ChangeEvent } from 'react'
import { useForm } from '../../hooks/useForm'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { Queue } from './queue-class'
import { delay } from '../../utils/delay'
import { blockForm, unblockForm } from '../../utils/blocking-form'
import { ButtonsHookState } from '../../types/types'
import { HEAD, TAIL } from '../../constants/element-captions'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { buttonDefaultState } from '../../constants/button-default-state'


export const QueuePage: React.FC = () => {

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
  const [ isBtnDisabled, setIsBtnDisabled ] = useState( false )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    add: buttonDefaultState,
    remove: buttonDefaultState,
    clear: buttonDefaultState
  } )

  const isMounted = useRef( true )
  useEffect( () => {
    setIsBtnDisabled( true )
    return () => { isMounted.current = false }
  }, [] )

  // Для блокировки-разблокировки формы
  const formUseStates = { setIsFormDisabled, setButtonsState, buttonsState }

  const controller = new AbortController()
  const signal = controller.signal

  // Эти константы нужны, чтобы не допустить зацикливание
  const isMaxTailIndex = prevData.tail === QUEUE_LENGTH - 1
  const isMaxHeadIndex = prevData.head === QUEUE_LENGTH - 1

  async function renderAdd ( queue: Queue<string>, newQueue: Queue<string> ) {
    if ( !isMounted.current ) return
    setPrevData( { ...prevData, tail: queue.tail } )
    blockForm( ['add'], formUseStates )
    setHighlightedIndex( queue.tail )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setQueue( newQueue )
    setHighlightedIndex( null )
    resetField( 'queueInput' )
    unblockForm( ['add'], formUseStates )
    setIsBtnDisabled( true )
  }

  async function renderRemove ( queue: Queue<string>, newQueue: Queue<string> ) {
    if ( !isMounted.current ) return
    setPrevData( { ...prevData, head: queue.head } )
    blockForm( ['remove'], formUseStates )
    setHighlightedIndex( queue.head )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setQueue( newQueue )
    setHighlightedIndex( null )
    unblockForm( ['remove'], formUseStates )
  }

  async function renderClear ( queue: Queue<string>, newQueue: Queue<string> ) {
    if ( !isMounted.current ) return
    setPrevData( { head: 0, tail: 0 } )
    blockForm( ['clear'], formUseStates )
    setIsAllHighlighted( true )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setQueue( newQueue )
    setIsAllHighlighted( false )
    unblockForm( ['clear'], formUseStates )
  }

  const handleAdd = () => {
    if ( !checkIsFormValid() || isMaxTailIndex || isFormDisabled ) { return }
    const newQueue = queue.clone()
    newQueue.enqueue( values.queueInput )
    renderAdd( queue, newQueue )
  }

  const handleRemove = () => {
    if ( isMaxHeadIndex || isFormDisabled ) { return }
    const newQueue = queue.clone()
    newQueue.dequeue()
    renderRemove( queue, newQueue )
  }

  const handleClear = async () => {
    if ( queue.isEmpty && !isMaxHeadIndex || isFormDisabled ) { return }
    const newQueue = queue.clone()
    newQueue.clear()
    renderClear( queue, newQueue )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    handleAdd()
  }

  const onChangeHandler = ( e: ChangeEvent<HTMLInputElement> ) => {
    setIsBtnDisabled( false )
    handleChange( e )
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
          onChange={ onChangeHandler }
          disabled={ isFormDisabled || isMaxTailIndex || isMaxHeadIndex }
        />

        <Button
          type='submit'
          linkedList='small'
          extraClass={ styles.button_correct_medium }
          text={ buttonsState.add.isLoading ? '' : 'Добавить' }
          isLoader={ buttonsState.add.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.add.isLoading || !isFormValid || isMaxTailIndex || isMaxHeadIndex || isBtnDisabled }
          onClick={ handleSubmit }
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
              !queue.isEmpty && index === ( queue.tail - 1 + queue.elements.length ) % queue.elements.length ? TAIL : ''
            }
            head={ ( index === queue.head && !queue.isEmpty ) ||
              ( queue.isEmpty && index !== 0 && index === queue.head ) ||
              ( isMaxHeadIndex && index === QUEUE_LENGTH - 1 )
              ? HEAD
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
