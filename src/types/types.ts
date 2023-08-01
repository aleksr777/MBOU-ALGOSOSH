export type OnlyStringObjType = {
  [ key: string ]: string
}

export type OnlyNumberObjType = {
  [ key: string ]: number
}

export type ButtonState = {
  isLoading: boolean
}

export type ButtonsHookState = {
  [ key: string ]: ButtonState
}

export type StateIndeces = {
  changing: null | [ number, number ]
  modified: null | [ number, number ]
}
