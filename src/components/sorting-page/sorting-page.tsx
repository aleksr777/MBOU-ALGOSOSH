import React, { useState } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './sorting-page.module.css'
import { useForm } from '../../hooks/useForm'
import { RadioInput } from '../ui/radio-input/radio-input'
import Button from '../ui/button/button'
import Column from '../ui/column/column'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { Direction } from '../../types/direction'
import { swapElementsArr } from '../../utils/swapElementsArr'
import { ButtonsHookState } from '../../types/types'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'

type ColumnDataType = {
  number: number
  state: ElementStates
}

export const SortingPage: React.FC = () => {

  const BUBBLE = 'BUBBLE'
  const CHOICE = 'CHOICE'
  const ASCENDING = Direction.Ascending
  const DESCENDING = Direction.Descending

  const { values, handleChange } = useForm( { sortingRadio: CHOICE } )

  const [ columnsData, setColumnsData ] = useState<ColumnDataType[]>( [] )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ isColumnsSorted, setIsColumnsSorted ] = useState( false )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    newColumns: { isLoading: false },
    ascending: { isLoading: false },
    descending: { isLoading: false }
  } )

  let arrColumnsInfo: ColumnDataType[]

  function randomArr (): number[] {
    const minLen = 3
    const maxLen = 17
    const maxVal = 100
    // Генерируем случайное значение для длины массива
    const arrLen = Math.floor( Math.random() * ( maxLen - minLen + 1 ) ) + minLen
    // Генерируем случайные элементы для массива в заданном диапазоне
    const arr: number[] = []
    for ( let i = 0; i < arrLen; i++ ) {
      arr.push( Math.floor( Math.random() * ( maxVal + 1 ) ) )
    }
    return arr
  }

  function getArrColumnsInfo ( arrNum: number[] ): ColumnDataType[] {
    return arrNum.map( ( num ) => ( {
      number: num,
      state: ElementStates.Default,
    } ) )
  }

  function setDefaultColumnsState ( arrColumnsInfo: ColumnDataType[] ) {
    if ( !arrColumnsInfo.length ) { return }
    const arr = [ ...arrColumnsInfo ]
    for ( let i = 0; i < arr.length; i++ ) {
      arr[ i ].state = ElementStates.Default
    }
    setColumnsData( arr )
  }

  function setColumnsState ( arrColumnsInfo: ColumnDataType[], i: number, j: number, state: ElementStates ) {
    let arr = [ ...arrColumnsInfo ]
    arr[ i ].state = state
    arr[ j ].state = state
    setColumnsData( arr )
  }

  //Сортировка выбором
  async function choiceSort ( arrColumnsInfo: ColumnDataType[], direction: string ) {
    let arr = [ ...arrColumnsInfo ]
    for ( let i = 0; i < arr.length; i++ ) {
      let minOrMaxIndex = i
      for ( let j = i + 1; j < arr.length; j++ ) {
        setColumnsState( arr, i, j, ElementStates.Changing )
        await delay( SHORT_DELAY_IN_MS )
        if ( direction === ASCENDING && arr[ j ].number < arr[ minOrMaxIndex ].number ||
          direction === DESCENDING && arr[ j ].number > arr[ minOrMaxIndex ].number ) {
          minOrMaxIndex = j
        }
        setColumnsState( arr, i, j, ElementStates.Default )
      }
      if ( minOrMaxIndex !== i ) {
        swapElementsArr( arr, i, minOrMaxIndex )
      }
      arr[ i ].state = ElementStates.Modified
      setColumnsData( arr )
      if ( i !== arr.length - 1 ) {
        await delay( SHORT_DELAY_IN_MS )
      }
    }
    const completedArr = arr.map( ( column ) => ( { ...column, state: ElementStates.Modified, } ) )
    setColumnsData( completedArr )
    setIsColumnsSorted( true )
    setIsFormDisabled( false )
    direction === ASCENDING
      ? setButtonsState( { ...buttonsState, ascending: { isLoading: false } } )
      : setButtonsState( { ...buttonsState, descending: { isLoading: false } } )
  }

  // Вариант пузырьковой сортировки - шейкерная сортировка.
  async function bubbleSort ( arrColumnsInfo: ColumnDataType[], direction: string ) {
    let arr = [ ...arrColumnsInfo ]
    let left = 0
    let right = arr.length - 1
    let isSorted = false // для исключения лишних итераций
    let isSwapedLeft: boolean
    let isSwapedRight: boolean
    while ( left <= right && !isSorted ) {
      isSwapedLeft = false
      isSwapedRight = false
      // Проход справа налево, перемещаем наибольший элемент вправо
      for ( let i = left; i < right; i++ ) {
        let j = i + 1
        setColumnsState( arr, i, j, ElementStates.Changing )
        await delay( SHORT_DELAY_IN_MS )
        if ( ( direction === ASCENDING && arr[ i ].number > arr[ j ].number ) ||
          ( direction === DESCENDING && arr[ i ].number < arr[ j ].number ) ) {
          swapElementsArr( arr, i, j )
          isSwapedRight = true
        }
        setColumnsState( arr, i, j, ElementStates.Default )
        if ( i !== arr.length - 1 ) {
          await delay( SHORT_DELAY_IN_MS )
        }
      }
      arr[ right ].state = ElementStates.Modified
      setColumnsData( arr )
      right--
      // Проход слева направо, перемещаем наименьший элемент влево
      if ( isSwapedRight ) {
        for ( let i = right; i > left; i-- ) {
          let j = i - 1
          setColumnsState( arr, i, j, ElementStates.Changing )
          await delay( SHORT_DELAY_IN_MS )
          if ( ( direction === ASCENDING && arr[ j ].number > arr[ i ].number ) ||
            ( direction === DESCENDING && arr[ j ].number < arr[ i ].number ) ) {
            swapElementsArr( arr, i, j )
            isSwapedLeft = true
          }
          setColumnsState( arr, i, j, ElementStates.Default )
          if ( i !== arr.length - 1 ) {
            await delay( SHORT_DELAY_IN_MS )
          }
        }
        arr[ left ].state = ElementStates.Modified
        setColumnsData( arr )
        left++
      }
      isSorted = isSwapedLeft && isSwapedRight ? false : true
    }
    const completedArr = arr.map( ( column ) => ( { ...column, state: ElementStates.Modified, } ) )
    setColumnsData( completedArr )
    setIsColumnsSorted( true )
    setIsFormDisabled( false )
    direction === ASCENDING
      ? setButtonsState( { ...buttonsState, ascending: { isLoading: false } } )
      : setButtonsState( { ...buttonsState, descending: { isLoading: false } } )
  }

  function animateAscendingSort () {
    if ( isFormDisabled ) { return }
    setIsFormDisabled( true )
    setButtonsState( { ...buttonsState, ascending: { isLoading: true } } )
    isColumnsSorted && setDefaultColumnsState( columnsData )
    values.sortingRadio === CHOICE && choiceSort( columnsData, ASCENDING )
    values.sortingRadio === BUBBLE && bubbleSort( columnsData, ASCENDING )

  }

  function animateDescendingSort () {
    if ( isFormDisabled ) { return }
    setIsFormDisabled( true )
    setButtonsState( { ...buttonsState, descending: { isLoading: true } } )
    isColumnsSorted && setDefaultColumnsState( columnsData )
    values.sortingRadio === CHOICE && choiceSort( columnsData, DESCENDING )
    values.sortingRadio === BUBBLE && bubbleSort( columnsData, DESCENDING )
  }

  const getNewColumns = () => {
    if ( isFormDisabled ) { return }
    setIsColumnsSorted( false )
    setIsFormDisabled( true )
    setButtonsState( { ...buttonsState, newColumns: { isLoading: true, } } )
    setColumnsData( [] )
    setTimeout( () => { /* Задержка ради визуального эффекта */
      arrColumnsInfo = getArrColumnsInfo( randomArr() )
      setColumnsData( arrColumnsInfo )
      setIsFormDisabled( false )
      setButtonsState( { ...buttonsState, newColumns: { isLoading: false } } )
    }, 700 )
  }

  const handleSubmit = ( e: React.FormEvent ) => { e.preventDefault() }

  return (

    <SolutionLayout title='Сортировка массива'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmit }>

        <RadioInput
          label={ 'Выбор' }
          name='sortingRadio'
          extraClass={ styles.radioContent_mr }
          disabled={ isFormDisabled }
          value={ CHOICE }
          checked={ values.sortingRadio === CHOICE }
          onChange={ handleChange }
        />

        <RadioInput
          label={ 'Пузырёк' }
          name='sortingRadio'
          disabled={ isFormDisabled }
          value={ BUBBLE }
          checked={ values.sortingRadio === BUBBLE }
          onChange={ handleChange }
        />

        <div className={ styles.boxButtons }>

          <Button
            type='button'
            linkedList='small'
            sorting={ ASCENDING }
            extraClass={ styles.button_correctSize }
            text={ buttonsState.ascending.isLoading ? '' : 'По возрастанию' }
            isLoader={ buttonsState.ascending.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.ascending.isLoading }
            onClick={ animateAscendingSort }
          />
          <Button
            type='button'
            linkedList='small'
            sorting={ DESCENDING }
            extraClass={ styles.button_correctSize }
            text={ buttonsState.descending.isLoading ? '' : 'По убыванию' }
            isLoader={ buttonsState.descending.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.descending.isLoading }
            onClick={ animateDescendingSort }
          />

        </div>

        <Button
          type='button'
          linkedList='small'
          extraClass={ styles.button_correctSize }
          text={ buttonsState.newColumns.isLoading ? '' : 'Новый массив' }
          isLoader={ buttonsState.newColumns.isLoading ? true : false }
          disabled={ isFormDisabled && !buttonsState.newColumns.isLoading }
          onClick={ getNewColumns }
        />
      </form>

      <div className={ styles.blockAnimate }>
        { columnsData.map( ( column, index ) => (
          <Column key={ index } index={ column.number } state={ column.state } />
        ) ) }
      </div>

    </SolutionLayout>
  )
}
