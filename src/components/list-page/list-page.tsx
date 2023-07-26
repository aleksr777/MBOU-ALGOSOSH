import React, { useState, ChangeEvent } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './list-page.module.css'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import ArrowIcon from '../ui/icons/arrow-icon'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'


export const ListPage: React.FC = () => {

  const { values, errors, isButtonDisabled, handleChange, isFormValid } = useForm( {
    headsTailsInput: '',
    indicesInput: ''
  } )

  const [ isAnimating, setIsAnimating ] = useState( true )
  const [ isFormDisabled, setIsFormDisabled ] = useState( false )
  const [ symbolsArr, setSymbolsArr ] = useState<number[]>( [] )

  async function animate () {
    console.log( 'ok' )
  }

  const handleClick = ( e: React.FormEvent ) => {
    e.preventDefault()
    setTimeout( () => animate(), 800 )
  }

  return <SolutionLayout title='Связный список'>

    <form className={ styles.formWrapper }>

      <div className={ styles.blockHeadsTails }>

        <Input
          placeholder='Введите значение'
          isLimitText={ true }
          limitText={ errors.headsTailsInput ? errors.headsTailsInput : 'Максимум — 4 символа' }
          value={ values.headsTailsInput }
          name='headsTailsInput'
          onChange={ ( e: ChangeEvent<HTMLInputElement> ) => {
            handleChange( e )
          } }
        /* onFocus={ () => {
          setIsAnimating( false )
          setSymbolsArr( [] )
        } } */
        //disabled={ isFormDisabled }
        />
        <Button
          //isLoader={ isFormDisabled }
          text={ 'Добавить в head' }
          type='button'
          linkedList='small'
          extraClass={ styles.button_correct_small }
        //disabled={ isButtonDisabled }
        />

        <Button
          //isLoader={ isFormDisabled }
          text={ 'Добавить в tail' }
          type='button'
          linkedList='small'
          extraClass={ styles.button_correct_small }
        //disabled={ isButtonDisabled }
        />
        <Button
          //isLoader={ isFormDisabled }
          text={ 'Удалить из head' }
          type='button'
          linkedList='small'
          extraClass={ styles.button_correct_small }
        //disabled={ isButtonDisabled }
        />

        <Button
          //isLoader={ isFormDisabled }
          text={ 'Удалить из tail' }
          type='button'
          linkedList='small'
          extraClass={ styles.button_correct_small }
        //disabled={ isButtonDisabled }
        />

      </div>

      <div className={ styles.blockIndices }>

        <Input
          placeholder='Введите индекс'
          isLimitText={ true }
          limitText={ errors.indicesInput ? errors.indicesInput : '' }
          value={ values.indicesInput }
          name='indicesInput'
          onChange={ ( e: ChangeEvent<HTMLInputElement> ) => {
            handleChange( e )
          } }
        /* onFocus={ () => {
          setIsAnimating( false )
          setSymbolsArr( [] )
        } } */
        //disabled={ isFormDisabled }
        />

        <Button
          //isLoader={ isFormDisabled }
          text={ 'Добавить по индексу' }
          type='button'
          linkedList='big'
          extraClass={ styles.button_correct_large }
        //disabled={ isButtonDisabled }
        />

        <Button
          //isLoader={ isFormDisabled }
          text={ 'Удалить по индексу' }
          type='button'
          linkedList='big'
          extraClass={ styles.button_correct_large }
        //disabled={ isButtonDisabled }
        />
      </div>

    </form>

    <div className={ styles.blockAnimate }>
      <Circle /* key={ index } */ index={ 0 } tail={ '' } head={ 'head' } letter={ '85' } state={ ElementStates.Default } />
      <ArrowIcon />
      <Circle /* key={ index } */ index={ 1 } tail={ '' } head={ '' } letter={ '0' } state={ ElementStates.Default } />
      <ArrowIcon />
      <Circle /* key={ index } */ index={ 2 } tail={ '' } head={ '' } letter={ '10' } state={ ElementStates.Default } />
      <ArrowIcon />
      <Circle /* key={ index } */ index={ 3 } tail={ '' } head={ '' } letter={ '34' } state={ ElementStates.Changing } />
      <ArrowIcon />
      <Circle /* key={ index } */ index={ 4 } tail={ '' } head={ '' } letter={ '8' } state={ ElementStates.Changing } />
      <ArrowIcon />
      <Circle /* key={ index } */ index={ 5 } tail={ 'tail' } head={ '' } letter={ '1' } state={ ElementStates.Changing } />
    </div>
  </SolutionLayout>
}
