
import { OnlyNumberObjType } from '../types/types'


export function getFibonacciNumbers ( num: number ) {

  if ( !num ) { return }

  const memo: OnlyNumberObjType = {}
  const arr: number[] = []

  function fillArrNumbers ( a: number, b: number, limit: number ): void {
    const memoKey = `${ a }_${ b }_${ limit }`

    if ( memo[ memoKey ] !== undefined ) {
      arr.push( memo[ memoKey ] )
      return
    }

    arr.push( a )

    if ( limit === 0 ) {
      return
    }

    fillArrNumbers( b, a + b, limit - 1 )

    memo[ memoKey ] = a
  }

  fillArrNumbers( 1, 1, num )

  return arr
}
