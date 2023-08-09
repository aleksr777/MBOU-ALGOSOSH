import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'
import { Direction } from '../../../types/direction'

describe( '<Button />', () => {

  it( 'отрисовывает кнопку с текстом', () => {
    const { asFragment } = render( <Button text="Нажми меня" /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'отрисовывает разблокированную кнопку', () => {
    const { asFragment } = render( <Button disabled={ true } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'отрисовывает кнопку с индикацией загрузки', () => {
    const { asFragment } = render( <Button isLoader /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'отрисовывает кнопку с иконкой сортировки по возрастанию', () => {
    const { asFragment } = render( <Button sorting={ Direction.Ascending } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'отрисовывает кнопку с иконкой сортировки по убыванию', () => {
    const { asFragment } = render( <Button sorting={ Direction.Descending } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'вызывает onClick при клике на кнопку', () => {
    const onClick = jest.fn()
    const { getByText } = render( <Button text="Нажми меня" onClick={ onClick } /> )
    fireEvent.click( getByText( 'Нажми меня' ) )
    expect( onClick ).toHaveBeenCalledTimes( 1 )
  } )
} )
