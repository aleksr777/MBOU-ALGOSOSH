import { ButtonsHookState } from '../types/types'

type formUseStatesType = {
  setIsFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
  setButtonsState: React.Dispatch<React.SetStateAction<ButtonsHookState>>
  buttonsState: ButtonsHookState
}

export function blockButtons (
  names: string[],
  state: ButtonsHookState,
  setState: React.Dispatch<React.SetStateAction<ButtonsHookState>>,
  isLoading = false,
) {
  if ( isLoading ) {
    const updatedState = names.reduce( ( acc, name ) => {
      acc[ name ] = {
        ...state[ name ],
        isLoading: true,
        isDisabled: false
      }
      return acc
    }, { ...state } )
    setState( updatedState )
  }
  else {
    const updatedState = names.reduce( ( acc, name ) => {
      acc[ name ] = {
        ...state[ name ],
        isLoading: false,
        isDisabled: true
      }
      return acc
    }, { ...state } )
    setState( updatedState )
  }
}

export function unblockButtons (
  names: string[],
  state: ButtonsHookState,
  setState: React.Dispatch<React.SetStateAction<ButtonsHookState>>
) {
  const updatedState = names.reduce( ( acc, name ) => {
    acc[ name ] = {
      ...state[ name ],
      isLoading: false,
      isDisabled: false
    }
    return acc
  }, { ...state } )
  setState( updatedState )
}

export function blockForm ( names: string[], formUseStates: formUseStatesType ) {
  const { setIsFormDisabled, buttonsState, setButtonsState } = formUseStates
  setIsFormDisabled( true )
  blockButtons( names, buttonsState, setButtonsState, true )
}

export function unblockForm ( names: string[], formUseStates: formUseStatesType ) {
  const { setIsFormDisabled, buttonsState, setButtonsState } = formUseStates
  setIsFormDisabled( false )
  unblockButtons( names, buttonsState, setButtonsState )
}
