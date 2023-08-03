import { swapElementsArr } from './swap-elements-arr'
import { ElementStates } from '../types/element-states'
import { StateIndeces } from '../types/types'


export async function getReversingStringSteps ( arrSymbols: string[] ) {

  const steps: string[][] = []
  const arr = [ ...arrSymbols ]
  let left = 0
  let right = arr.length - 1
  steps.push( [ ...arr ] )

  while ( left < right ) {
    swapElementsArr( arr, left, right )
    left++
    right--
    steps.push( [ ...arr ] )
  }

  return steps
}


export function getSymbolState ( stateIndeces: StateIndeces, index: number ) {

  const { changing, modified } = stateIndeces

  const isModified = (
    ( !changing && modified === [ -1, -1 ] ) ||
    ( changing && ( index < changing[ 0 ] || index > changing[ 1 ] ) ) ||
    ( modified && ( index <= modified[ 0 ] || index >= modified[ 1 ] ) )
  )

  const isChanging = changing && ( index === changing[ 0 ] || index === changing[ 1 ] )

  return isModified
    ? ElementStates.Modified
    : isChanging
      ? ElementStates.Changing
      : ElementStates.Default
}
