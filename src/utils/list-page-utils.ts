import { ElementStates } from '../types/element-states'
import { ListType } from '../types/types'


export function getStepsDeleteHead ( list: ListType ) {
  const steps: ListType[] = []
  if ( !list.head?.next ) { return steps }
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
  if ( !list.head?.next ) { return steps }
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
  if ( !list.head?.next ) { return steps }
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
