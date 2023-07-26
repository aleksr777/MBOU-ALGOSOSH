import React, { useState } from 'react'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import styles from './sorting-page.module.css'
import { useForm } from '../../hooks/useForm'
import { RadioInput } from '../ui/radio-input/radio-input'
import Button from '../ui/button/button'
import Column from '../ui/column/column'
import { ElementStates } from '../../types/element-states'
import { delay } from '../../utils/delay'
import { Direction } from '../../types/direction'

export const SortingPage: React.FC = () => {

  async function animate () {
    console.log( 'ok' )
  }

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    setTimeout( () => animate(), 800 )
  }

  return <SolutionLayout title='Сортировка массива'>

    <form className={ styles.formWrapper } onSubmit={ handleSubmit }>

      <RadioInput
        label={ 'Выбор' }
        name='fibonacciInput'
        extraClass={ styles.radioContent_mr}
      />
      <RadioInput
        label={ 'Пузырёк' }
        name='fibonacciInput'
      />

      <div className={ styles.boxButtons }>

        <Button
          sorting={ Direction.Ascending }
          text={ 'По возрастанию' }
          linkedList='small'
          extraClass={ styles.button_correctSize }
        />
        <Button
          sorting={ Direction.Descending }
          text={ 'По убыванию' }
          type='submit'
          linkedList='small'
          extraClass={ styles.button_correctSize }
        />

      </div>

      <Button
        text={ 'Новый массив' }
        type='submit'
        linkedList='small'
        extraClass={ styles.button_correctSize }
      />
    </form>

    <div className={ styles.blockAnimate }>
      <Column /* key={ index } */ index={ 2 } state={ ElementStates.Default } />
      <Column /* key={ index } */ index={ 34 } state={ ElementStates.Default } />
      <Column /* key={ index } */ index={ 17 } state={ ElementStates.Default } />
      <Column /* key={ index } */ index={ 100 } state={ ElementStates.Default } />
      <Column /* key={ index } */ index={ 50 } state={ ElementStates.Default } />
    </div>

  </SolutionLayout>
}
