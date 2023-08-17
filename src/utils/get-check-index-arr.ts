function isIndexValid ( index: number, arrLength: number ) {
  if ( index === 0 ) { return true }
  else if ( !index || index > arrLength - 1 || index < 0 ) {
    return false
  }
  return true
}

export function getAndCheckIndex ( indexFromInput: string, arrLength: number ) {
  const index = parseInt( indexFromInput )
  return isIndexValid( index, arrLength ) ? index : null
}
