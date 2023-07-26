import React, { useState, ChangeEvent } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './stack-page.module.css'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'

export const StackPage: React.FC = () => {

  const { values, errors, isButtonDisabled, handleChange, isFormValid } = useForm( { stackInput: '' } )

  const [ isAnimating, setIsAnimating ] = useState( true )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ symbolsArr, setSymbolsArr ] = useState<number[]>( [] )

  async function animate () {
    console.log( 'ok' )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    setTimeout( () => animate(), 800 )
  }

  return <SolutionLayout title='Стек'>

    <form className={ styles.formWrapper } onSubmit={ handleSubmit }>

      <Input
        placeholder='Введите значение'
        isLimitText={ true }
        limitText={ errors.stackInput ? errors.stackInput : 'Максимум — 4 символа' }
        value={ values.stackInput }
        name='stackInput'
        onChange={ ( e: ChangeEvent<HTMLInputElement> ) => {
          handleChange( e )
        } }
        onFocus={ () => {
          setIsAnimating( false )
          setSymbolsArr( [] )
        } }
        disabled={ isFormDisabled }
      />

      <Button
        //isLoader={ isFormDisabled }
        text={ isFormDisabled ? '' : 'Добавить' }
        type='button'
        linkedList='small'
        extraClass={ styles.button_correct_medium }
      //disabled={ isButtonDisabled }
      />

      <Button
        //isLoader={ isFormDisabled }
        text={ isFormDisabled ? '' : 'Удалить' }
        type='button'
        linkedList='small'
        extraClass={ `${ styles.button_correct_small } ${ styles.button_correct_mr }` }
      //disabled={ isButtonDisabled }
      />

      <Button
        //isLoader={ isFormDisabled }
        text={ isFormDisabled ? '' : 'Очистить' }
        type='button'
        linkedList='small'
        extraClass={ styles.button_correct_medium }
      //disabled={ isButtonDisabled }
      />

    </form>

    <div className={ styles.blockAnimate }>
      <Circle /* key={ index } */ index={ 0 } tail={ '' } head={ '' } letter={ '1' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ index={ 1 } tail={ '' } head={ '' } letter={ '2' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ index={ 2 } tail={ '' } head={ '' } letter={ '3' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ index={ 3 } tail={ '' } head={ 'top' } letter={ '4' } state={ ElementStates.Changing } />
    </div>
  </SolutionLayout>
}
