import { ElementStates } from '../types/element-states'
import { ListType } from '../types/types'
import { formHeadTail, formIndices } from '../constants/list-page-constants'
import { blockButtons, unblockButtons } from './blocking-form'


export function getStepsDeleteHead ( list: ListType ) {
  const steps: ListType[] = []
  if ( !list.head ) { return steps }
  let copyList = list.clone() as ListType
  steps.push( copyList )
  copyList = list.clone() as ListType
  copyList.updateByIndex( 0, '' )
  steps.push( copyList )
  copyList = copyList.clone() as ListType
  copyList.deleteHead()
  steps.push( copyList )
  return steps
}

export function getStepsDeleteTail ( list: ListType, arrLength: number ) {
  const steps: ListType[] = []
  if ( !list.head ) { return steps }
  steps.push( list )
  let copyList = list.clone() as ListType
  copyList.updateByIndex( arrLength - 1, '' )
  steps.push( copyList )
  copyList = copyList.clone() as ListType
  copyList.deleteTail()
  steps.push( copyList )
  return steps
}

export function getStepsDeleteByIndex ( list: ListType, indexNum: number ) {
  const steps: ListType[] = []
  if ( !list.head ) { return steps }
  let copyList = list.clone() as ListType
  steps.push( copyList )
  copyList = copyList.clone() as ListType
  copyList.updateByIndex( indexNum, '' )
  steps.push( copyList )
  copyList = copyList.clone() as ListType
  copyList.deleteByIndex( indexNum )
  steps.push( copyList )
  return steps
}

export function getCircleState (
  index: number,
  modifiedCircleIndex: number | null,
  changingCircleIndices: number[] | null
) {
  if ( changingCircleIndices?.length && changingCircleIndices.indexOf( index ) !== -1 ) {
    return ElementStates.Changing
  }
  if ( modifiedCircleIndex !== null ) {
    return modifiedCircleIndex === index ? ElementStates.Modified : ElementStates.Default
  }
  return ElementStates.Default
}

export function blockAllForms ( formsStates: any, buttonsNames: string[], formName: string ) {
  const {
    setIsFormHeadTailDisabled,
    buttonsHeadTailState,
    setButtonsHeadTailState,
    setIsFormIndicesDisabled,
    buttonsIndexState,
    setButtonsIndexState
  } = formsStates

  setIsFormHeadTailDisabled( true )
  setIsFormIndicesDisabled( true )
  if ( formName === formHeadTail ) {
    blockButtons( buttonsNames, buttonsHeadTailState, setButtonsHeadTailState, true )
  }
  else if ( formName === formIndices ) {
    blockButtons( buttonsNames, buttonsIndexState, setButtonsIndexState, true )
  }
}

export function unblockAllForms ( formsStates: any, buttonsNames: string[], formName: string ) {
  const {
    setIsFormHeadTailDisabled,
    buttonsHeadTailState,
    setButtonsHeadTailState,
    setIsFormIndicesDisabled,
    buttonsIndexState,
    setButtonsIndexState
  } = formsStates
  setIsFormHeadTailDisabled( false )
  setIsFormIndicesDisabled( false )
  if ( formName === formHeadTail ) {
    unblockButtons( buttonsNames, buttonsHeadTailState, setButtonsHeadTailState )
  }
  else if ( formName === formIndices ) {
    unblockButtons( buttonsNames, buttonsIndexState, setButtonsIndexState )
  }
}
