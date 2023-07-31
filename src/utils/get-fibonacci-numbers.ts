
import { OnlyNumberObjType } from '../types/types'

export function getFibonacciNumbers ( num: number ) {
  const memo: OnlyNumberObjType = {}
  const arr: number[] = []
  function fillArrNumbers ( a: number, b: number, limit: number, memo: OnlyNumberObjType ): void {
    arr.push( a )
    if ( limit === 0 ) {
      return
    }
    const memoKey = `${ a }_${ b }_${ limit }`
    if ( memo[ memoKey ] !== undefined ) {
      return
    }
    fillArrNumbers( b, a + b, limit - 1, memo )
    memo[ memoKey ] = arr[ arr.length - 1 ]
  }
  fillArrNumbers( 1, 1, num, memo )
  return arr
}
