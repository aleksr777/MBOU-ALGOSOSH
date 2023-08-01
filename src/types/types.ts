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
