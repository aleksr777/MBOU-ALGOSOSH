import React, { useState, ChangeEvent } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './queue-page.module.css'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'

export const QueuePage: React.FC = () => {

  const { values, errors, isButtonDisabled, handleChange, isFormValid } = useForm( { queueInput: '' } )

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

  return <SolutionLayout title='Очередь'>

    <form className={ styles.formWrapper } onSubmit={ handleSubmit }>

      <Input
        placeholder='Введите значение'
        isLimitText={ true }
        limitText={ errors.queueInput ? errors.queueInput : 'Максимум — 4 символа' }
        value={ values.queueInput }
        name='queueInput'
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
      <Circle /* key={ index } */ tail={ '0' } head={ 'head' } letter={ '2' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ tail={ '1' } head={ '' } letter={ '5' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ tail={ '2' } head={ '' } letter={ '3' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ tail={ '3' } head={ '' } letter={ '' } state={ ElementStates.Changing } />
      <Circle /* key={ index } */ tail={ '4' } head={ '' } letter={ '' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ tail={ '5' } head={ '' } letter={ '' } state={ ElementStates.Default } />
      <Circle /* key={ index } */ tail={ '6' } head={ '' } letter={ '' } state={ ElementStates.Default } />
    </div>
  </SolutionLayout>
}
