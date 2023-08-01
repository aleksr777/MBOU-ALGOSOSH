import { ButtonsHookState } from '../types/types'

type formUseStatesType = {
  setIsFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
  setButtonsState: React.Dispatch<React.SetStateAction<ButtonsHookState>>
  buttonsState: ButtonsHookState
}

export function blockForm ( buttonName: string, formUseStates: formUseStatesType ) {
  const { setIsFormDisabled, setButtonsState, buttonsState } = formUseStates
  setIsFormDisabled( true )
  setButtonsState( {
    ...buttonsState,
    [ buttonName ]: {
      ...buttonsState[ buttonName ],
      isLoading: true,
    },
  } )
}

export function activateForm ( buttonName: string, formUseStates: formUseStatesType ) {
  const { setIsFormDisabled, setButtonsState, buttonsState } = formUseStates
  setIsFormDisabled( false )
  setButtonsState( {
    ...buttonsState,
    [ buttonName ]: {
      ...buttonsState[ buttonName ],
      isLoading: false,
    },
  } )
}
