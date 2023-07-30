import styles from './list-page.module.css'
import React, { useState, useEffect } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import ArrowIcon from '../ui/icons/arrow-icon'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { HEAD, TAIL } from '../../constants/element-captions'
import { SHORT_DELAY_IN_MS } from '../../constants/delays'
import LinkedList from './linked-list-class'
import { ButtonsHookState } from '../../types/types'

type MiniCircleType = {
  letter: string
  index: number
  position: string
}


export const ListPage: React.FC = () => {

  const indicesInput = 'indicesInput'
  const headsTailsInput = 'headsTailsInput'
  const btnObj = { isLoading: false }

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

  const [ list, setList ] = useState( new LinkedList() )
  const [ miniCircle, setMiniCircle ] = useState<MiniCircleType | null>( null )
  const [ modifiedCircleIndex, setModifiedCircleIndex ] = useState<number | null>( null )
  const [ changingCircleIndices, setChangingCircleIndices ] = useState<number[] | null>( null )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ buttonsState, setButtonsState ] = useState<ButtonsHookState>( {
    addHead: btnObj,
    addTail: btnObj,
    deleteHead: btnObj,
    deleteTail: btnObj,
    addByIndex: btnObj,
    deleteByIndex: btnObj,
  } )

  function resetInputs () {
    resetField( indicesInput )
    resetField( headsTailsInput )
  }

  function blockForm ( buttonName: string ) {
    setIsFormDisabled( true )
    setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: true } } ) )
  }

  function activateForm ( buttonName: string ) {
    setIsFormDisabled( false )
    setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: false } } ) )
  }

  function isIndexValid ( index: number, arrLength: number ) {
    if ( index === 0 ) { return true }
    else if ( !index || index > arrLength - 1 || index < 0 ) {
      return false
    }
    return true
  }

  function getAndCheckIndex ( indexFromInput: string, arrLength: number ) {
    const index = parseInt( indexFromInput )
    return isIndexValid( index, arrLength ) ? index : false
  }

  function cloneList<T> ( list: LinkedList<T> ): LinkedList<T> {
    const newList = new LinkedList<T>()
    const arr = list.toArray()
    arr.forEach( value => newList.append( value ) )
    return newList
  }

  const handleAddHead = async () => {
    if ( !values.headsTailsInput ) { return }
    blockForm( 'addHead' )
    const newList = cloneList( list )
    if ( list.head ) {
      await delay( SHORT_DELAY_IN_MS )
      setMiniCircle( { letter: values.headsTailsInput, index: 0, position: HEAD } )
    }
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( 0 )
    newList.prepend( values.headsTailsInput )
    setList( newList )
    setMiniCircle( null )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( null )
    activateForm( 'addHead' )
    resetInputs()
  }

  const handleAddTail = async ( arrLength: number ) => {
    if ( !values.headsTailsInput ) { return }
    blockForm( 'addTail' )
    const newList = cloneList( list )
    if ( list.head ) {
      await delay( SHORT_DELAY_IN_MS )
      setMiniCircle( { letter: values.headsTailsInput, index: arrLength - 1, position: TAIL } )
    }
    await delay( SHORT_DELAY_IN_MS )
    newList.append( values.headsTailsInput )
    setList( newList )
    setMiniCircle( null )
    setModifiedCircleIndex( arrLength )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( null )
    activateForm( 'addHead' )
    resetInputs()
  }

  const handleDeleteHead = async () => {
    if ( !list.head ) { return }
    blockForm( 'deleteHead' )
    const newList = cloneList( list )
    await delay( SHORT_DELAY_IN_MS )
    newList.updateByIndex( 0, '' )
    setList( newList )
    setMiniCircle( { letter: list.head.value as string, index: 0, position: HEAD } )
    await delay( SHORT_DELAY_IN_MS )
    newList.deleteHead()
    setList( newList )
    setMiniCircle( null )
    activateForm( 'deleteHead' )
    resetInputs()
  }

  const handleDeleteTail = async ( arrLength: number ) => {
    if ( !list.head?.next ) { return }
    blockForm( 'deleteTail' )
    const newList = cloneList( list )
    await delay( SHORT_DELAY_IN_MS )
    setMiniCircle( { letter: list.tail?.value as string, index: arrLength - 1, position: TAIL } )
    newList.updateByIndex( arrLength - 1, '' )
    setList( newList )
    await delay( SHORT_DELAY_IN_MS )
    newList.deleteTail()
    setList( newList )
    setMiniCircle( null )
    activateForm( 'deleteTail' )
    resetInputs()
  }

  const handleAddByIndex = async ( arrLength: number ) => {
    const indexValue = getAndCheckIndex( values.indicesInput, arrLength )
    if ( indexValue === false || !values.headsTailsInput || !values.indicesInput ) { return }
    blockForm( 'addByIndex' )
    const newList = cloneList( list )
    const arr = []
    for ( let i = 0; i <= parseInt( values.indicesInput ); i++ ) {
      setMiniCircle( { letter: values.headsTailsInput, index: i, position: HEAD } )
      i >= 0 && arr.push( i - 1 )
      setChangingCircleIndices( [ ...arr ] )
      await delay( SHORT_DELAY_IN_MS )
    }
    setMiniCircle( null )
    newList.addByIndex( values.headsTailsInput, indexValue )
    setList( newList )
    setModifiedCircleIndex( indexValue )
    setChangingCircleIndices( null )
    await delay( SHORT_DELAY_IN_MS )
    setModifiedCircleIndex( null )
    resetInputs()
    activateForm( 'addByIndex' )
  }

  const handleDeleteByIndex = async ( arrLength: number ) => {
    const indexValue = getAndCheckIndex( values.indicesInput, arrLength )
    if ( indexValue === false || !values.indicesInput ) { return }
    blockForm( 'deleteByIndex' )
    const newList = cloneList( list )
    const indexNum = parseInt( values.indicesInput )
    const arr = []
    for ( let i = 0; i <= indexNum; i++ ) {
      arr.push( i )
      setChangingCircleIndices( [ ...arr ] )
      await delay( SHORT_DELAY_IN_MS )
    }
    arr.pop()
    setChangingCircleIndices( [ ...arr ] )
    const valueByIndex = newList.getByIndex( indexNum )
    setMiniCircle( { letter: valueByIndex as string, index: indexNum, position: TAIL } )
    newList.updateByIndex( indexNum, '' )
    setList( newList )
    await delay( SHORT_DELAY_IN_MS )
    newList.deleteByIndex( indexValue )
    setList( newList )
    setChangingCircleIndices( null )
    setMiniCircle( null )
    activateForm( 'deleteByIndex' )
    resetInputs()
  }

  const handleSubmit = ( e: React.FormEvent ) => { e.preventDefault() }

  function getMiniCircle ( miniCircle: MiniCircleType ) {
    return <Circle tail={ '' } head={ '' } letter={ miniCircle.letter } state={ ElementStates.Changing } isSmall={ true } extraClass={ styles.circle_correct_mb } />
  }

  function getHeadElement ( index: number, miniCircle: MiniCircleType | null ) {
    if ( miniCircle !== null && miniCircle.index === index && miniCircle.position === HEAD ) {
      return getMiniCircle( miniCircle )
    }
    return index === 0 ? HEAD : ''
  }

  function getTailElement ( index: number, miniCircle: MiniCircleType | null, arrLength: number ) {
    if ( miniCircle && miniCircle.index === index && miniCircle.position === TAIL ) {
      return getMiniCircle( miniCircle )
    }
    return index === arrLength - 1 ? TAIL : ''
  }

  function getCircleState ( index: number, modifiedCircleIndex: number | null, changingCircleIndices: number[] | null ) {
    if ( changingCircleIndices?.length && changingCircleIndices.indexOf( index ) !== -1 ) {
      return ElementStates.Changing
    }
    if ( modifiedCircleIndex !== null ) {
      return modifiedCircleIndex === index ? ElementStates.Modified : ElementStates.Default
    }
    return ElementStates.Default
  }

  useEffect( () => {
    const newList = new LinkedList()
    for ( let i = 0; i < 6; i++ ) {
      const randomValue = Math.floor( Math.random() * 100 ) + 1
      newList.append( randomValue.toString() )
    }
    setList( newList )
  }, [] )

  const listArr = list.toArray()

  return (

    <SolutionLayout title='Связный список'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmit }>

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
              tail={ getTailElement( index, miniCircle, listArr.length ) }
              head={ getHeadElement( index, miniCircle ) }
              letter={ value as string }
              state={ getCircleState( index, modifiedCircleIndex, changingCircleIndices ) } />
            { index === listArr.length - 1 ? null : <ArrowIcon fill='var(--default-color)' /> }
          </div>
        ) ) }
      </div>

    </SolutionLayout>
  )
}
