import LinkedList from '../components/list-page/linked-list-class'

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

export type ListType = LinkedList<unknown | string>

export type ArrChangingType = [ number | null, number | null ]

export type ArrSortingType = ( number | number[] | ArrChangingType )[]

export type StepsSortingType = ArrSortingType[]
