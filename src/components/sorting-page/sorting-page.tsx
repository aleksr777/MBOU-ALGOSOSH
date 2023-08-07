import styles from './sorting-page.module.css'
import React, { useState, useRef, useEffect } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { useForm } from '../../hooks/useForm'
import { RadioInput } from '../ui/radio-input/radio-input'
import Button from '../ui/button/button'
import Column from '../ui/column/column'
import { delay } from '../../utils/delay'
import { randomArr } from '../../utils/random-arr'
import { handleSubmitDefault } from '../../utils/handle-submit-default'
import { Direction } from '../../types/direction'
import { getStepsSortingChoice, getStepsSortingBubble, getSymbolState } from '../../utils/sorting-page-utils'
import { blockForm, activateForm } from '../../utils/block-activate-form'
import { ButtonsHookState, ArrChangingType, StepsSortingType } from '../../types/types'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { buttonDefaultState } from '../../constants/button-default-state'


export const SortingPage: React.FC = () => {

  const BUBBLE = 'BUBBLE'
  const CHOICE = 'CHOICE'
  const ASCENDING = Direction.Ascending
  const DESCENDING = Direction.Descending

  const { values, handleChange } = useForm( { sortingRadio: CHOICE } )

  const [ columnsNumbers, setColumnsNumbers ] = useState<number[]>( [] )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ isColumnsSorted, setIsColumnsSorted ] = useState( false )
  const [ changingIndixes, setChangingIndixes ] = useState<[ number | null, number | null ]>( [ null, null ] )
  const [ modifiedIndixes, setModifiedIndixes ] = useState<( number | null )[]>( [] )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    newColumns: buttonDefaultState,
    ascending: buttonDefaultState,
    descending: buttonDefaultState
  } )

  const isMounted = useRef( true )
  useEffect( () => {
    return () => { isMounted.current = false }
  }, [] )

  const formUseStates = { setIsFormDisabled, setButtonsState, buttonsState }

  const controller = new AbortController()
  const signal = controller.signal

  function resetStatesData () {
    setModifiedIndixes( [] )
    setChangingIndixes( [ null, null ] )
    setIsColumnsSorted( false )
  }

  async function renderSort (
    columnsNumbers: number[],
    direction: string,
    sortingRadio: string
  ) {
    if ( !isMounted.current ) return
    const btnName = ( direction === ASCENDING ) ? 'ascending' : 'descending'
    blockForm( btnName, formUseStates )
    let arrSteps: StepsSortingType = []
    if ( sortingRadio === CHOICE ) { arrSteps = await getStepsSortingChoice( columnsNumbers, direction ) }
    else if ( sortingRadio === BUBBLE ) { arrSteps = await getStepsSortingBubble( columnsNumbers, direction ) }
    for ( let i = 0; i < arrSteps.length; i++ ) {
      const copyArr = [ ...arrSteps[ i ] ]
      await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
      if ( isMounted.current ) {
        const numbersArray = copyArr.slice( 0, -2 ) as number[]
        const sortedIndexes = copyArr[ copyArr.length - 2 ] as number[]
        const checkedIndexes = copyArr[ copyArr.length - 1 ] as ArrChangingType
        setChangingIndixes( [ checkedIndexes[ 0 ], checkedIndexes[ 1 ] ] )
        setModifiedIndixes( [ ...sortedIndexes ] )
        setColumnsNumbers( [ ...numbersArray ] )
      }
    }
    setChangingIndixes( [ null, null ] )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setIsColumnsSorted( true )
    activateForm( btnName, formUseStates )
  }

  function animateSort ( direction: string ) {
    resetStatesData()
    renderSort( columnsNumbers, direction, values.sortingRadio )
  }

  const getNewColumns = () => {
    if ( isFormDisabled ) { return }
    resetStatesData()
    const randomNumbers = randomArr( 3, 17, 100 )
    setIsColumnsSorted( false )
    setColumnsNumbers( randomNumbers )
  }


  return (

    <SolutionLayout title='Сортировка массива'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmitDefault }>

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
            onClick={ () => animateSort( ASCENDING ) }
          />
          <Button
            type='button'
            linkedList='small'
            sorting={ DESCENDING }
            extraClass={ styles.button_correctSize }
            text={ buttonsState.descending.isLoading ? '' : 'По убыванию' }
            isLoader={ buttonsState.descending.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.descending.isLoading }
            onClick={ () => animateSort( DESCENDING ) }
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
        { columnsNumbers.map( ( number, index ) => (
          <Column key={ index } index={ number } state={ getSymbolState( modifiedIndixes, changingIndixes, isColumnsSorted, index ) } />
        ) ) }
      </div>

    </SolutionLayout>
  )
}
