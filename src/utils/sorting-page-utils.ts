import { swapElementsArr } from './swap-elements-arr'
import { Direction } from '../types/direction'
import { ElementStates } from '../types/element-states'
import { StepsSortingType, ArrChangingType } from '../types/types'

const ASCENDING = Direction.Ascending
const DESCENDING = Direction.Descending

//Сортировка выбором
export async function getStepsSortingChoice ( arrNumbers: number[], direction: string ): Promise<StepsSortingType> {

  if ( arrNumbers.length === 0 ) {
    return []
  }

  if ( arrNumbers.length === 1 ) {
    return [ [ arrNumbers[ 0 ], [], [ null, null ] ] ]
  }

  const arr = [ ...arrNumbers ]
  let sortedIndexes: number[] = []
  let changingIndexes: ArrChangingType = [ null, null ]
  const steps: StepsSortingType = []

  steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )

  for ( let i = 0; i < arr.length; i++ ) {

    let minOrMaxIndex = i
    for ( let j = i + 1; j < arr.length; j++ ) {
      changingIndexes = [ i, j ]
      if ( direction === ASCENDING && arr[ j ] < arr[ minOrMaxIndex ] ||
        direction === DESCENDING && arr[ j ] > arr[ minOrMaxIndex ] ) {
        minOrMaxIndex = j
      }
      if ( i !== sortedIndexes[ i ] && i > 0 ) { sortedIndexes[ i - 1 ] = i - 1 }
      steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
    }
    if ( minOrMaxIndex !== i ) {
      swapElementsArr( arr, i, minOrMaxIndex )
      changingIndexes = [ i, minOrMaxIndex ]
      steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
    }

  }

  return steps
}


// Вариант пузырьковой сортировки - шейкерная сортировка.
export async function getStepsSortingBubble ( arrNumbers: number[], direction: string ): Promise<StepsSortingType> {

  if ( arrNumbers.length === 0 ) {
    return []
  }

  if ( arrNumbers.length === 1 ) {
    return [ [ arrNumbers[ 0 ], [], [ null, null ] ] ]
  }

  const arr = [ ...arrNumbers ]
  let sortedIndexes: number[] = []
  let changingIndexes: ArrChangingType = [ null, null ]
  const steps: StepsSortingType = []

  steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
  // последний элемент массива - индексы сравниваемых элементов

  let left = 0
  let right = arr.length - 1
  let isSorted = false // для исключения лишних итераций
  let isSwapedLeft: boolean
  let isSwapedRight: boolean

  while ( left <= right && !isSorted ) {

    isSwapedLeft = false
    isSwapedRight = false

    // перемещаем наибольший элемент вправо
    for ( let i = left; i < right; i++ ) {
      let j = i + 1
      changingIndexes = [ i, j ]
      steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
      if ( ( direction === ASCENDING && arr[ i ] > arr[ j ] ) ||
        ( direction === DESCENDING && arr[ i ] < arr[ j ] ) ) {
        swapElementsArr( arr, i, j )
        steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
        isSwapedRight = true
      }
    }
    sortedIndexes.push( right )
    right--

    // перемещаем наименьший элемент влево
    if ( isSwapedRight ) {
      for ( let i = right; i > left; i-- ) {
        let j = i - 1
        changingIndexes = [ i, j ]
        steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
        if ( ( direction === ASCENDING && arr[ j ] > arr[ i ] ) ||
          ( direction === DESCENDING && arr[ j ] < arr[ i ] ) ) {
          swapElementsArr( arr, i, j )
          steps.push( [ ...arr, sortedIndexes.slice(), changingIndexes ] )
          isSwapedLeft = true
        }
      }
      sortedIndexes.push( left )
      left++
    }
    isSorted = isSwapedLeft && isSwapedRight ? false : true
  }

  return steps
}


export function getSymbolState (
  modifiedIndexes: ( number | null )[],
  changingIndexes: ArrChangingType,
  isColumnsSorted: boolean,
  index: number
) {
  if ( isColumnsSorted ) { return ElementStates.Modified }
  else if ( modifiedIndexes.includes( index ) ) { return ElementStates.Modified }
  else if ( changingIndexes[ 0 ] === index || changingIndexes[ 1 ] === index ) {
    return ElementStates.Changing
  }
  return ElementStates.Default
}
