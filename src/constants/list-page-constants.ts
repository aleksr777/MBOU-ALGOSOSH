export const formHeadTail = 'formHeadTail'
export const formIndices = 'formIndices'

export const indicesInput = 'indicesInput'
export const headTailInput = 'headTailInput'

export const btnAddHead = 'addHead'
export const btnAddTail = 'addTail'
export const btnDeleteHead = 'deleteHead'
export const btnDeleteTail = 'deleteTail'
export const btnAddByIndex = 'addByIndex'
export const btnDeleteByIndex = 'deleteByIndex'


export const validHeadTailConfig = {
  headTailInput: {
    pattern: /^[a-zA-Zа-яА-Я0-9]{0,4}$/,
    checkIsEmptyValue: true,
    defaultErrorMessage: 'Только буквы и цифры!!!',
    emptyValueMessage: 'Введите значение!!!'
  }
}

export const validIndicesConfig = {
  indicesInput: {
    pattern: /^[0-9]{0,4}$/,
    checkIsEmptyValue: true,
    defaultErrorMessage: 'Только цифры!!!',
    emptyValueMessage: 'Введите значение!!!'
  }
}
