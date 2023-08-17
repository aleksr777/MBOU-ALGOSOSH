import styles from './list-page.module.css'
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import LinkedList from './linked-list-class'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import ArrowIcon from '../ui/icons/arrow-icon'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { delay } from '../../utils/delay'
import { blockButtons, unblockButtons } from '../../utils/blocking-form'
import { handleSubmitDefault } from '../../utils/handle-submit-default'
import { getAndCheckIndex } from '../../utils/get-check-index-arr'
import { HEAD, TAIL } from '../../constants/element-captions'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import { buttonDefaultState } from '../../constants/button-default-state'
import { ButtonsHookState, ListType } from '../../types/types'
import { ElementStates } from '../../types/element-states'
import {
  getCircleState,
  getStepsDeleteHead,
  getStepsDeleteTail,
  getStepsDeleteByIndex,
  blockAllForms,
  unblockAllForms
} from '../../utils/list-page-utils'
import {
  formHeadTail,
  formIndices,
  indicesInput,
  headTailInput,
  btnAddHead,
  btnAddTail,
  btnDeleteHead,
  btnDeleteTail,
  btnAddByIndex,
  btnDeleteByIndex,
  validHeadTailConfig,
  validIndicesConfig
} from '../../constants/list-page-constants'

type miniCircleDataType = {
  letter: string
  index: number
  position: string
}


export const ListPage: React.FC = () => {

  const isMounted = useRef( true )
  useEffect( () => {
    return () => { isMounted.current = false }
  }, [] )

  const headTailData = useForm( { headTailInput: '' }, validHeadTailConfig )
  const headTailInputValue = headTailData.values.headTailInput
  const headTailInputError = headTailData.errors.headTailInput

  const indicesData = useForm( { indicesInput: '' }, validIndicesConfig )
  const indicesInputValue = indicesData.values.indicesInput
  const indicesInputError = indicesData.errors.indicesInput

  const [ list, setList ] = useState( new LinkedList<unknown | string>() )
  const [ miniCircleData, setMiniCircleData ] = useState<miniCircleDataType | null>( null )
  const [ modifiedCircleIndex, setModifiedCircleIndex ] = useState<number | null>( null )
  const [ changingCircleIndices, setChangingCircleIndices ] = useState<number[] | null>( null )
  const [ isFormHeadTailDisabled, setIsFormHeadTailDisabled ] = useState( false )
  const [ isFormIndicesDisabled, setIsFormIndicesDisabled ] = useState( false )
  const [ buttonsHeadTailState, setButtonsHeadTailState ] = useState<ButtonsHookState>( {
    [ btnAddHead ]: buttonDefaultState,
    [ btnAddTail ]: buttonDefaultState,
    [ btnDeleteHead ]: buttonDefaultState,
    [ btnDeleteTail ]: buttonDefaultState
  } )
  const [ buttonsIndexState, setButtonsIndexState ] = useState<ButtonsHookState>( {
    [ btnAddByIndex ]: buttonDefaultState,
    [ btnDeleteByIndex ]: buttonDefaultState
  } )


  const formsUseStates = {
    setIsFormHeadTailDisabled,
    buttonsHeadTailState,
    setButtonsHeadTailState,
    setIsFormIndicesDisabled,
    buttonsIndexState,
    setButtonsIndexState
  }

  function setDefaultFormStates ( buttonName: string, formName: string ) {
    unblockAllForms( formsUseStates, [ buttonName ], formName )
    blockButtons( [ btnAddHead, btnAddTail ], buttonsHeadTailState, setButtonsHeadTailState )
    blockButtons( [ btnAddByIndex, btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
    headTailData.resetField( headTailInput )
    indicesData.resetField( indicesInput )
  }

  const controller = new AbortController()
  const signal = controller.signal

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

  async function renderAddHead ( secondList: ListType ) {
    if ( !isMounted.current ) return
    blockAllForms( formsUseStates, [ btnAddHead ], formHeadTail )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setMiniCircleData( { letter: headTailInputValue, index: 0, position: HEAD } )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setModifiedCircleIndex( 0 )
    setList( secondList )
    setMiniCircleData( null )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setModifiedCircleIndex( null )
    setDefaultFormStates( btnAddHead, formHeadTail )
    if ( buttonsHeadTailState[ btnDeleteHead ].isDisabled
      || buttonsHeadTailState[ btnDeleteTail ].isDisabled ) {
      unblockButtons( [ btnDeleteHead, btnDeleteTail ], buttonsHeadTailState, setButtonsHeadTailState )
    }
  }

  async function renderAddTail ( secondList: ListType, arrLength: number ) {
    if ( !isMounted.current ) return
    blockAllForms( formsUseStates, [ btnAddTail ], formHeadTail )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setMiniCircleData( { letter: headTailInputValue, index: arrLength - 1, position: TAIL } )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setList( secondList )
    setMiniCircleData( null )
    setModifiedCircleIndex( arrLength )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setModifiedCircleIndex( null )
    setDefaultFormStates( btnAddTail, formHeadTail )
    if ( buttonsHeadTailState[ btnDeleteHead ].isDisabled
      || buttonsHeadTailState[ btnDeleteTail ].isDisabled ) {
      unblockButtons( [ btnDeleteHead, btnDeleteTail ], buttonsHeadTailState, setButtonsHeadTailState )
    }
  }

  async function renderDeleteHead ( steps: ListType[], arrLength: number ) {
    if ( !isMounted.current ) return
    blockAllForms( formsUseStates, [ btnDeleteHead ], formHeadTail )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setList( steps[ 1 ] )
    setMiniCircleData( { letter: steps[ 0 ].head?.value as string, index: 0, position: HEAD } )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setList( steps[ 2 ] )
    setMiniCircleData( null )
    setDefaultFormStates( btnDeleteHead, formHeadTail )
    if ( arrLength < 2 ) {
      blockButtons( [ btnDeleteHead, btnDeleteTail ], buttonsHeadTailState, setButtonsHeadTailState )
      blockButtons( [ btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
    }
  }

  async function renderDeleteTail ( steps: ListType[], arrLength: number ) {
    if ( !isMounted.current ) return
    blockAllForms( formsUseStates, [ btnDeleteTail ], formHeadTail )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setMiniCircleData( { letter: steps[ 0 ].tail?.value as string, index: arrLength - 1, position: TAIL } )
    setList( steps[ 1 ] )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setList( steps[ 2 ] )
    setMiniCircleData( null )
    setDefaultFormStates( btnDeleteTail, formHeadTail )
    if ( arrLength < 2 ) {
      blockButtons( [ btnDeleteHead, btnDeleteTail ], buttonsHeadTailState, setButtonsHeadTailState )
      blockButtons( [ btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
    }
  }

  async function renderAddByIndex ( secondList: ListType, indexValue: number ) {
    if ( !isMounted.current ) return
    blockAllForms( formsUseStates, [ btnAddByIndex ], formIndices )
    const arr = []
    for ( let i = 0; i <= parseInt( indicesInputValue ); i++ ) {
      setMiniCircleData( { letter: headTailInputValue, index: i, position: HEAD } )
      i >= 0 && arr.push( i - 1 )
      setChangingCircleIndices( [ ...arr ] )
      await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    }
    setMiniCircleData( null )
    setList( secondList )
    setModifiedCircleIndex( indexValue )
    setChangingCircleIndices( null )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setModifiedCircleIndex( null )
    setDefaultFormStates( btnAddByIndex, formIndices )
    if ( buttonsHeadTailState[ btnDeleteHead ].isDisabled
      || buttonsHeadTailState[ btnDeleteTail ].isDisabled ) {
      unblockButtons( [ btnDeleteHead, btnDeleteTail ], buttonsHeadTailState, setButtonsHeadTailState )
    }
  }

  async function renderDeleteByIndex ( steps: ListType[], indexNum: number, arrLength: number ) {
    if ( !isMounted.current ) return
    blockAllForms( formsUseStates, [ btnDeleteByIndex ], formIndices )
    const valueByIndex = steps[ 0 ].getByIndex( indexNum )
    const arr = []
    for ( let i = 0; i <= indexNum; i++ ) {
      if ( !isMounted.current ) return
      arr.push( i )
      setChangingCircleIndices( [ ...arr ] )
      await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    }
    arr.pop()
    setChangingCircleIndices( [ ...arr ] )
    setMiniCircleData( { letter: valueByIndex as string, index: indexNum, position: TAIL } )
    setList( steps[ 1 ] )
    await delay( SHORT_DELAY_IN_MS, 'Прервано!', { signal } )
    setList( steps[ 2 ] )
    setChangingCircleIndices( null )
    setMiniCircleData( null )
    setDefaultFormStates( btnDeleteByIndex, formIndices )
    if ( arrLength < 2 ) {
      blockButtons( [ btnDeleteHead, btnDeleteTail ], buttonsHeadTailState, setButtonsHeadTailState )
      blockButtons( [ btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
    }
  }

  const handleAddHead = async () => {
    if ( !headTailInputValue ) { return }
    const secondList = list.clone() as ListType
    secondList.prepend( headTailInputValue )
    renderAddHead( secondList )
  }

  const handleAddTail = async ( arrLength: number ) => {
    if ( !headTailInputValue ) { return }
    const secondList = list.clone() as ListType
    secondList.append( headTailInputValue )
    renderAddTail( secondList, arrLength )
  }

  const handleDeleteHead = async ( arrLength: number ) => {
    if ( !list.head ) { return }
    const steps = getStepsDeleteHead( list )
    renderDeleteHead( steps, arrLength )
  }

  const handleDeleteTail = async ( arrLength: number ) => {
    if ( !list.head ) { return }
    const steps = getStepsDeleteTail( list, arrLength )
    renderDeleteTail( steps, arrLength )
  }

  const handleAddByIndex = async ( arrLength: number ) => {
    const indexValue = getAndCheckIndex( indicesInputValue, arrLength )
    if ( indexValue === null || !headTailInputValue || !indicesInputValue ) { return }
    const secondList = list.clone() as ListType
    secondList.addByIndex( headTailInputValue, indexValue )
    renderAddByIndex( secondList, indexValue )
  }

  const handleDeleteByIndex = async ( arrLength: number ) => {
    const indexValue = getAndCheckIndex( indicesInputValue, arrLength )
    if ( indexValue === null || !indicesInputValue ) { return }
    const indexNum = parseInt( indicesInputValue )
    const steps = getStepsDeleteByIndex( list, indexNum )
    renderDeleteByIndex( steps, indexNum, arrLength )
  }

  const onChangeHandler = ( e: ChangeEvent<HTMLInputElement>, arrLength: number ) => {
    if ( e.target.name === headTailInput ) {
      if ( e.target.value ) {
        unblockButtons( [ btnAddHead, btnAddTail ], buttonsHeadTailState, setButtonsHeadTailState )
        if ( indicesInputValue && buttonsIndexState[ btnAddByIndex ].isDisabled ) {
          unblockButtons( [ btnAddByIndex ], buttonsIndexState, setButtonsIndexState )
        }
      } else {
        blockButtons( [ btnAddHead, btnAddTail ], buttonsHeadTailState, setButtonsHeadTailState )
      }
      headTailData.handleChange( e )
    }
    else if ( e.target.name === indicesInput ) {
      const number = parseInt( e.target.value )
      if ( arrLength === 0 && number === 0 && headTailInputValue ) {
        unblockButtons( [ btnAddByIndex ], buttonsIndexState, setButtonsIndexState )
        indicesData.handleChange( e )
        return
      }
      const isValid = ( typeof number === 'number' && number < arrLength && number >= 0 ) ? true : false
      if ( isValid ) {
        if ( headTailInputValue ) {
          unblockButtons( [ btnAddByIndex, btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
        } else {
          unblockButtons( [ btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
        }
      } else {
        blockButtons( [ btnAddByIndex, btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
      }
      indicesData.handleChange( e )
    }
  }

  useEffect( () => {
    blockButtons( [ btnAddByIndex, btnDeleteByIndex ], buttonsIndexState, setButtonsIndexState )
    blockButtons( [ btnAddHead, btnAddTail ], buttonsHeadTailState, setButtonsHeadTailState )
    const newList = new LinkedList()
    /* for ( let i = 0; i < 6; i++ ) { */
    for ( let i = 0; i < 3; i++ ) {
      const randomValue = Math.floor( Math.random() * 100 ) + 1
      newList.append( randomValue.toString() )
    }
    if ( isMounted ) {
      setList( newList )
    }
  }, [] )

  const listArr = list.toArray()

  return (

    <SolutionLayout title='Связный список'>

      <div className={ styles.blockWrapper }>

        <form className={ styles.formHeadTail } onSubmit={ handleSubmitDefault }>

          <Input
            name={ headTailInput }
            placeholder='Введите значение'
            isLimitText={ true }
            maxLength={ 4 }
            value={ headTailInputValue }
            limitText={ headTailInputError ? headTailInputError : 'Максимум — 4 символа' }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => onChangeHandler( e, listArr.length ) }
            disabled={ isFormHeadTailDisabled }
          />

          <Button
            type='button'
            linkedList='small'
            text={ buttonsHeadTailState.addHead.isLoading ? '' : 'Добавить в head' }
            extraClass={ styles.button_correct_small }
            onClick={ handleAddHead }
            isLoader={ buttonsHeadTailState.addHead.isLoading ? true : false }
            disabled={
              isFormHeadTailDisabled && !buttonsHeadTailState.addHead.isLoading
              || !headTailData.isFormValid
              || buttonsHeadTailState.addHead.isDisabled
            }
          />

          <Button
            type='button'
            linkedList='small'
            text={ buttonsHeadTailState.addTail.isLoading ? '' : 'Добавить в tail' }
            extraClass={ styles.button_correct_small }
            onClick={ () => handleAddTail( listArr.length ) }
            isLoader={ buttonsHeadTailState.addTail.isLoading ? true : false }
            disabled={
              isFormHeadTailDisabled && !buttonsHeadTailState.addTail.isLoading
              || !headTailData.isFormValid
              || buttonsHeadTailState.addTail.isDisabled
            }
          />

          <Button
            type='button'
            linkedList='small'
            text={ buttonsHeadTailState.deleteHead.isLoading ? '' : 'Удалить из head' }
            extraClass={ styles.button_correct_small }
            onClick={ () => handleDeleteHead( listArr.length ) }
            isLoader={ buttonsHeadTailState.deleteHead.isLoading ? true : false }
            disabled={
              isFormHeadTailDisabled && !buttonsHeadTailState.deleteHead.isLoading
              || buttonsHeadTailState.deleteHead.isDisabled
            }
          />

          <Button
            type='button'
            linkedList='small'
            text={ buttonsHeadTailState.deleteTail.isLoading ? '' : 'Удалить из tail' }
            extraClass={ styles.button_correct_small }
            onClick={ () => handleDeleteTail( listArr.length ) }
            isLoader={ buttonsHeadTailState.deleteTail.isLoading ? true : false }
            disabled={ isFormHeadTailDisabled && !buttonsHeadTailState.deleteTail.isLoading
              || buttonsHeadTailState.deleteTail.isDisabled
            }
          />

        </form>

        <form className={ styles.formIndices } onSubmit={ handleSubmitDefault }>

          <Input
            name={ indicesInput }
            placeholder='Введите индекс'
            maxLength={ 2 }
            isLimitText={ true }
            limitText={ indicesInputError ? indicesInputError : 'Введите индекс' }
            value={ indicesInputValue }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => onChangeHandler( e, listArr.length ) }
            disabled={ isFormIndicesDisabled }
          />

          <Button
            type='button'
            linkedList='big'
            text={ buttonsIndexState.addByIndex.isLoading ? '' : 'Добавить по индексу' }
            extraClass={ styles.button_correct_large }
            onClick={ () => handleAddByIndex( listArr.length ) }
            isLoader={ buttonsIndexState.addByIndex.isLoading ? true : false }
            disabled={
              isFormIndicesDisabled && !buttonsIndexState.addByIndex.isLoading
              || !indicesData.isFormValid
              || buttonsIndexState.addByIndex.isDisabled
              || !headTailData.isFormValid
            }
          />

          <Button
            type='button'
            linkedList='big'
            text={ buttonsIndexState.deleteByIndex.isLoading ? '' : 'Удалить по индексу' }
            extraClass={ styles.button_correct_large }
            onClick={ () => handleDeleteByIndex( listArr.length ) }
            isLoader={ buttonsIndexState.deleteByIndex.isLoading ? true : false }
            disabled={
              isFormIndicesDisabled && !buttonsIndexState.deleteByIndex.isLoading
              || !indicesData.isFormValid
              || buttonsIndexState.deleteByIndex.isDisabled
            }
          />
        </form>

      </div>

      <div className={ styles.blockAnimate }>
        { listArr && listArr.map( ( value, index ) => (
          <div key={ index } className={ styles.blockCircle }>
            <Circle
              index={ index }
              tail={ getTailElement( index, miniCircleData, listArr.length ) }
              head={ getHeadElement( index, miniCircleData ) }
              letter={ typeof value === 'string' ? value : '' }
              state={ getCircleState( index, modifiedCircleIndex, changingCircleIndices ) } />
            { index === listArr.length - 1 ? null : <ArrowIcon fill='var(--default-color)' /> }
          </div>
        ) )
        }

      </div>

    </SolutionLayout>
  )
}
