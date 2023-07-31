export function randomArr ( minLen: number, maxLen: number, maxVal: number ): number[] {
  // Генерируем случайное значение для длины массива
  const arrLen = Math.floor( Math.random() * ( maxLen - minLen + 1 ) ) + minLen
  // Генерируем случайные элементы для массива в заданном диапазоне
  const arr: number[] = []
  for ( let i = 0; i < arrLen; i++ ) {
    arr.push( Math.floor( Math.random() * ( maxVal + 1 ) ) )
  }
  return arr
}
