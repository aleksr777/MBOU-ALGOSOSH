export async function swapElementsArr ( arr: any[], i: number, j: number ) {
  const temp = arr[ j ]
  arr[ j ] = arr[ i ]
  arr[ i ] = temp
  return arr
}
