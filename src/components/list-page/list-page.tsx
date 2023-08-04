import styles from './list-page.module.css'
import React, { useState, useEffect } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import ArrowIcon from '../ui/icons/arrow-icon'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { delay } from '../../utils/delay'
import { handleSubmitDefault } from '../../utils/handle-submit-default'
import { blockForm, activateForm } from '../../utils/block-activate-form'
import { getAndCheckIndex } from '../../utils/get-check-index-arr'
import { getCircleState, getStepsDeleteHead, getStepsDeleteTail, getStepsDeleteByIndex } from '../../utils/list-page-utils'
import { HEAD, TAIL } from '../../constants/element-captions'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { buttonDefaultState } from '../../constants/button-default-state'
import LinkedList from './linked-list-class'
import { ButtonsHookState, ListType } from '../../types/types'
import { ElementStates } from '../../types/element-states'

type miniCircleDataType = {
  letter: string
  index: number
  position: string
}


export const ListPage: React.FC = () => {

  const indicesInput = 'indicesInput'
  const headsTailsInput = 'headsTailsInput'

  const btnAddHead = 'addHead'
  const btnAddTail = 'addTail'
  const btnDeleteHead = 'deleteHead'
  const btnDeleteTail = 'deleteTail'
  const btnAddByIndex = 'addByIndex'
  const btnDeleteByIndex = 'deleteByIndex'

  const validateConfig = {
    headsTailsInput: {
      pattern: /^[a-zA-Zа-яА-Я0-9]{0,4}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только буквы и цифры!!!',
      emptyValueMessage: 'Введите значение!!!'
    },
    indicesInput: {
      pattern: /^[0-9]{0,4}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только цифры!!!',
      emptyValueMessage: 'Введите значение!!!'
    },
  }

  const {
    values,
    errors,
    isFormValid,
    handleChange,
    resetField
  } = useForm( {
    headsTailsInput: '',
    indicesInput: ''
  }, validateConfig )

  const [ list, setList ] = useState( new LinkedList<unknown | string>() )
  const [ miniCircleData, setMiniCircleData ] = useState<miniCircleDataType | null>( null )
  const [ modifiedCircleIndex, setModifiedCircleIndex ] = useState<number | null>( null )
  const [ changingCircleIndices, setChangingCircleIndices ] = useState<number[] | null>( null )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    addHead: buttonDefaultState,
    addTail: buttonDefaultState,
    deleteHead: buttonDefaultState,
    deleteTail: buttonDefaultState,
    addByIndex: buttonDefaultState,
    deleteByIndex: buttonDefaultState,
  } )

  // Для блокировки-разблокировки формы
  const formUseStates = { setIsFormDisabled, setButtonsState, buttonsState }


  function getMiniCircleElement ( miniCircleData: miniCircleDataType ) {
    return <Circle tail={ '' } head={ '' } letter={ miniCircleData.letter } state={ ElementStates.Changing } isSmall={ true } extraClass={ styles.circle_correct_mb } />
  }

  function getHeadElement ( index: number, miniCircleData: miniCircleDataType | null ) {
    if ( miniCircleData !== null && miniCircleData.index === index && miniCircleData.position === HEAD ) {
      return getMiniCircleElement( miniCircleData )
    }
    return index === 0 ? HEAD : ''
  }

  function getTailElement ( index: number, miniCircleData: miniCircleDataType | null, arrLength: number ) {
    if ( miniCircleData && miniCircleData.index === index && miniCircleData.position === TAIL ) {
      return getMiniCircleElement( miniCircleData )
    }
    return index === arrLength - 1 ? TAIL : ''
  }

  function setDefaultFormStates ( buttonName: string ) {
    activateForm( buttonName, formUseStates )
    resetField( indicesInput )
    resetField( headsTailsInput )
  }

  async function renderAddHead ( secondList: ListType ) {
    blockForm( btnAddHead, formUseStates )
    await delay( SHORT_DELAY_IN_MS )
    setMiniCircleData( { letter: values.headsTailsInput, index: 0, position: HEAD } )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( 0 )
    setList( secondList )
    setMiniCircleData( null )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( null )
    setDefaultFormStates( btnAddHead )
  }

  async function renderAddTail (
    secondList: ListType, arrLength: number ) {
    blockForm( btnAddTail, formUseStates )
    await delay( SHORT_DELAY_IN_MS )
    setMiniCircleData( { letter: values.headsTailsInput, index: arrLength - 1, position: TAIL } )
    await delay( SHORT_DELAY_IN_MS )
    setList( secondList )
    setMiniCircleData( null )
    setModifiedCircleIndex( arrLength )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( null )
    setDefaultFormStates( btnAddTail )
  }

  async function renderDeleteHead ( steps: ListType[] ) {
    blockForm( btnDeleteHead, formUseStates )
    await delay( SHORT_DELAY_IN_MS )
    setList( steps[ 1 ] )
    setMiniCircleData( { letter: steps[ 0 ].head?.value as string, index: 0, position: HEAD } )
    await delay( SHORT_DELAY_IN_MS )
    setList( steps[ 2 ] )
    setMiniCircleData( null )
    setDefaultFormStates( btnDeleteHead )
  }

  async function renderDeleteTail ( steps: ListType[], arrLength: number ) {
    blockForm( btnDeleteTail, formUseStates )
    await delay( SHORT_DELAY_IN_MS )
    setMiniCircleData( { letter: steps[ 0 ].tail?.value as string, index: arrLength - 1, position: TAIL } )
    setList( steps[ 1 ] )
    await delay( SHORT_DELAY_IN_MS )
    setList( steps[ 2 ] )
    setMiniCircleData( null )
    setDefaultFormStates( btnDeleteTail )
  }

  async function renderAddByIndex (
    secondList: ListType,
    indexValue: number
  ) {
    blockForm( btnAddByIndex, formUseStates )
    const arr = []
    for ( let i = 0; i <= parseInt( values.indicesInput ); i++ ) {
      setMiniCircleData( { letter: values.headsTailsInput, index: i, position: HEAD } )
      i >= 0 && arr.push( i - 1 )
      setChangingCircleIndices( [ ...arr ] )
      await delay( SHORT_DELAY_IN_MS )
    }
    setMiniCircleData( null )
    setList( secondList )
    setModifiedCircleIndex( indexValue )
    setChangingCircleIndices( null )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( null )
    setDefaultFormStates( btnAddByIndex )
  }

  async function renderDeleteByIndex ( steps: ListType[], indexNum: number ) {
    blockForm( btnDeleteByIndex, formUseStates )
    const valueByIndex = steps[ 0 ].getByIndex( indexNum )
    const arr = []
    for ( let i = 0; i <= indexNum; i++ ) {
      arr.push( i )
      setChangingCircleIndices( [ ...arr ] )
      await delay( SHORT_DELAY_IN_MS )
    }
    arr.pop()
    setChangingCircleIndices( [ ...arr ] )
    setMiniCircleData( { letter: valueByIndex as string, index: indexNum, position: TAIL } )
    setList( steps[ 1 ] )
    await delay( SHORT_DELAY_IN_MS )
    setList( steps[ 2 ] )
    setChangingCircleIndices( null )
    setMiniCircleData( null )
    setDefaultFormStates( btnDeleteByIndex )
  }


  const handleAddHead = async () => {
    if ( !values.headsTailsInput ) { return }
    const secondList = list.clone() as ListType
    secondList.prepend( values.headsTailsInput )
    renderAddHead( secondList )
  }

  const handleAddTail = async ( arrLength: number ) => {
    if ( !values.headsTailsInput ) { return }
    const secondList = list.clone() as ListType
    secondList.append( values.headsTailsInput )
    renderAddTail( secondList, arrLength )
  }

  const handleDeleteHead = async () => {
    if ( !list.head ) { return }
    const steps = getStepsDeleteHead( list )
    renderDeleteHead( steps )
  }

  const handleDeleteTail = async ( arrLength: number ) => {
    if ( !list.head?.next ) { return }
    const steps = getStepsDeleteTail( list, arrLength )
    renderDeleteTail( steps, arrLength )
  }

  const handleAddByIndex = async ( arrLength: number ) => {
    const indexValue = getAndCheckIndex( values.indicesInput, arrLength )
    if ( indexValue === false || !values.headsTailsInput || !values.indicesInput ) { return }
    const secondList = list.clone() as ListType
    secondList.addByIndex( values.headsTailsInput, indexValue )
    renderAddByIndex( secondList, indexValue )
  }

  const handleDeleteByIndex = async ( arrLength: number ) => {
    const indexValue = getAndCheckIndex( values.indicesInput, arrLength )
    if ( indexValue === false || !values.indicesInput ) { return }
    const indexNum = parseInt( values.indicesInput )
    const steps = getStepsDeleteByIndex( list, indexNum )
    renderDeleteByIndex( steps, indexNum )
  }

  useEffect( () => {
    let isMounted = true
    const newList = new LinkedList()
    for ( let i = 0; i < 6; i++ ) {
      const randomValue = Math.floor( Math.random() * 100 ) + 1
      newList.append( randomValue.toString() )
    }
    if ( isMounted ) {
      setList( newList )
    }
    return () => {
      isMounted = false
    }
  }, [] )

  const listArr = list.toArray()

  return (

    <SolutionLayout title='Связный список'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmitDefault }>

        <div className={ styles.blockHeadsTails }>

          <Input
            name={ headsTailsInput }
            placeholder='Введите значение'
            isLimitText={ true }
            maxLength={ 4 }
            value={ values.headsTailsInput }
            limitText={ errors.headsTailsInput ? errors.headsTailsInput : 'Максимум — 4 символа' }
            onChange={ handleChange }
            disabled={ isFormDisabled }
          />

          <Button
            text={ buttonsState.addHead.isLoading ? '' : 'Добавить в head' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
            onClick={ handleAddHead }
            isLoader={ buttonsState.addHead.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.addHead.isLoading || !isFormValid }
          />

          <Button
            text={ buttonsState.addTail.isLoading ? '' : 'Добавить в tail' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
            onClick={ () => handleAddTail( listArr.length ) }
            isLoader={ buttonsState.addTail.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.addTail.isLoading || !isFormValid }
          />

          <Button
            text={ buttonsState.deleteHead.isLoading ? '' : 'Удалить из head' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
            onClick={ handleDeleteHead }
            isLoader={ buttonsState.deleteHead.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.deleteHead.isLoading }
          />

          <Button
            text={ buttonsState.deleteTail.isLoading ? '' : 'Удалить из tail' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
            onClick={ () => handleDeleteTail( listArr.length ) }
            isLoader={ buttonsState.deleteTail.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.deleteTail.isLoading }
          />

        </div>

        <div className={ styles.blockIndices }>

          <Input
            name={ indicesInput }
            placeholder='Введите индекс'
            maxLength={ 4 }
            isLimitText={ true }
            limitText={ errors.indicesInput ? errors.indicesInput : '' }
            value={ values.indicesInput }
            onChange={ handleChange }
            disabled={ isFormDisabled }
          />

          <Button
            text={ buttonsState.addByIndex.isLoading ? '' : 'Добавить по индексу' }
            type='button'
            linkedList='big'
            extraClass={ styles.button_correct_large }
            onClick={ () => handleAddByIndex( listArr.length ) }
            isLoader={ buttonsState.addByIndex.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.addByIndex.isLoading || !isFormValid }
          />

          <Button
            text={ buttonsState.deleteByIndex.isLoading ? '' : 'Удалить по индексу' }
            type='button'
            linkedList='big'
            extraClass={ styles.button_correct_large }
            onClick={ () => handleDeleteByIndex( listArr.length ) }
            isLoader={ buttonsState.deleteByIndex.isLoading ? true : false }
            disabled={ isFormDisabled && !buttonsState.deleteByIndex.isLoading || !isFormValid }
          />
        </div>

      </form>

      <div className={ styles.blockAnimate }>
        { listArr.map( ( value, index ) => (
          <div key={ index } className={ styles.blockCircle }>
            <Circle
              index={ index }
              tail={ getTailElement( index, miniCircleData, listArr.length ) }
              head={ getHeadElement( index, miniCircleData ) }
              letter={ typeof value === 'string' ? value : '' }
              state={ getCircleState( index, modifiedCircleIndex, changingCircleIndices ) } />
            { index === listArr.length - 1 ? null : <ArrowIcon fill='var(--default-color)' /> }
          </div>
        ) ) }
      </div>

    </SolutionLayout>
  )
}
