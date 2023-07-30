import styles from './list-page.module.css'
import React, { useState, ChangeEvent } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { useForm } from '../../hooks/useForm'
import { Input } from '../ui/input/input'
import ArrowIcon from '../ui/icons/arrow-icon'
import Button from '../ui/button/button'
import Circle from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { HEAD, TAIL } from '../../constants/element-captions'
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays'


export const ListPage: React.FC = () => {

  const validateConfig = {
    headsTailsInput: {
      pattern: /^[a-zA-Zа-яА-Я0-9]{0,4}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только буквы и цифры!!!',
    },
    indicesInput: {
      pattern: /^[a-zA-Zа-яА-Я0-9]{0,4}$/,
      checkIsEmptyValue: true,
      defaultErrorMessage: 'Допустимы только буквы и цифры!!!',
    },
  }

  const {
    values, setValues, errors, isFormValid, handleChange, checkIsFormValid, resetField
  } = useForm( { headsTailsInput: '', indicesInput: '' }, validateConfig )

  const handleSubmit = ( e: React.FormEvent ) => { e.preventDefault() }

  return (

    <SolutionLayout title='Связный список'>

      <form className={ styles.formWrapper } onSubmit={ handleSubmit }>

        <div className={ styles.blockHeadsTails }>

          <Input
            placeholder='Введите значение'
            isLimitText={ true }
            limitText={ 'Максимум — 4 символа' }
            value={ values.headsTailsInput }
            name='headsTailsInput'
            onChange={ handleChange }
          />
          <Button
            text={ 'Добавить в head' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
          />

          <Button
            text={ 'Добавить в tail' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
          />
          <Button
            text={ 'Удалить из head' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
          />

          <Button
            text={ 'Удалить из tail' }
            type='button'
            linkedList='small'
            extraClass={ styles.button_correct_small }
          />

        </div>

        <div className={ styles.blockIndices }>

          <Input
            placeholder='Введите индекс'
            isLimitText={ true }
            limitText={ '' }
            value={ values.indicesInput }
            name='indicesInput'
            onChange={ handleChange }
          />

          <Button
            text={ 'Добавить по индексу' }
            type='button'
            linkedList='big'
            extraClass={ styles.button_correct_large }
          />

          <Button
            text={ 'Удалить по индексу' }
            type='button'
            linkedList='big'
            extraClass={ styles.button_correct_large }
          />
        </div>

      </form>

      <div className={ styles.blockAnimate }>
        <Circle /* key={ index } */ index={ 0 } tail={ '' } head={ HEAD } letter={ '85' } state={ ElementStates.Changing } />
        <ArrowIcon fill='var(--changing-color)' />
        <Circle /* key={ index } */ index={ 1 } tail={ '' } head={ '' } letter={ '0' } state={ ElementStates.Changing } />
        <ArrowIcon fill='var(--changing-color)' />
        <Circle /* key={ index } */ index={ 2 } tail={ '' } head={
          <Circle tail={ '' } head={ '' } letter={ '10' } state={ ElementStates.Changing } isSmall={ true } extraClass={ styles.circle_correct_mb } />
        } letter={ '34' } state={ ElementStates.Default } />
        <ArrowIcon fill='var(--default-color)' />
        <Circle /* key={ index } */ index={ 3 } tail={ '' } head={ '' } letter={ '8' } state={ ElementStates.Default } />
        <ArrowIcon fill='var(--default-color)' />
        <Circle /* key={ index } */ index={ 4 } tail={ TAIL } head={ '' } letter={ '1' } state={ ElementStates.Default } />
      </div>

    </SolutionLayout>
  )
}
