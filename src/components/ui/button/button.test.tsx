import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'
import { Direction } from '../../../types/direction'
import { ButtonProps } from '../button/button'

describe( '<Button />', () => {

  function renderAndMatchSnapshot ( props: ButtonProps ) {
    const { asFragment } = render( <Button { ...props } /> )
    expect( asFragment() ).toMatchSnapshot()
  }

  it( 'render with text', () => {
    renderAndMatchSnapshot( { text: "Нажми меня" } )
  } )

  it( 'render disabled', () => {
    renderAndMatchSnapshot( { disabled: true } )
  } )

  it( 'render with loading indication', () => {
    renderAndMatchSnapshot( { isLoader: true } )
  } )

  it( 'render with a ascending sort icon', () => {
    renderAndMatchSnapshot( { sorting: Direction.Ascending } )
  } )

  it( 'render with a descending sort icon', () => {
    renderAndMatchSnapshot( { sorting: Direction.Descending } )
  } )

  it( 'onClick event', () => {
    const onClick = jest.fn()
    const { getByText } = render( <Button text="Нажми меня" onClick={ onClick } /> )
    fireEvent.click( getByText( 'Нажми меня' ) )
    expect( onClick ).toHaveBeenCalledTimes( 1 )
  } )
} )
