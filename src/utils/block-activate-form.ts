import { ButtonsHookState } from '../types/types'

export function blockForm (
  buttonName: string,
  setIsFormDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setButtonsState: React.Dispatch<React.SetStateAction<ButtonsHookState>>,
  buttonsState: ButtonsHookState
) {
  setIsFormDisabled( true )
  setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: true } } ) )
}

export function activateForm (
  buttonName: string,
  setIsFormDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setButtonsState: React.Dispatch<React.SetStateAction<ButtonsHookState>>,
  buttonsState: ButtonsHookState
) {
  setIsFormDisabled( true )
  setButtonsState( ( { ...buttonsState, [ buttonName ]: { isLoading: false } } ) )
}
