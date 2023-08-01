import { ButtonsHookState } from '../types/types'

type StatesFormType = {
  setIsFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
  setButtonsState: React.Dispatch<React.SetStateAction<ButtonsHookState>>
  buttonsState: ButtonsHookState
}

export function blockForm ( buttonName: string, statesForm: StatesFormType ) {
  const { setIsFormDisabled, setButtonsState, buttonsState } = statesForm
  setIsFormDisabled( true )
  setButtonsState( {
    ...buttonsState,
    [ buttonName ]: {
      ...buttonsState[ buttonName ],
      isLoading: true,
    },
  } )
}

export function activateForm ( buttonName: string, statesForm: StatesFormType ) {
  const { setIsFormDisabled, setButtonsState, buttonsState } = statesForm
  setIsFormDisabled( false )
  setButtonsState( {
    ...buttonsState,
    [ buttonName ]: {
      ...buttonsState[ buttonName ],
      isLoading: false,
    },
  } )
}
