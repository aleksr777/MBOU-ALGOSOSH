import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './button'
import { Direction } from '../../../types/direction'

describe( '<Button />', () => {

  it( 'render with text', () => {
    const { asFragment } = render( <Button text="Нажми меня" /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render disabled', () => {
    const { asFragment } = render( <Button disabled={ true } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render with loading indication', () => {
    const { asFragment } = render( <Button isLoader /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render with a ascending sort icon', () => {
    const { asFragment } = render( <Button sorting={ Direction.Ascending } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render with a descending sort icon', () => {
    const { asFragment } = render( <Button sorting={ Direction.Descending } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'onClick event', () => {
    const onClick = jest.fn()
    const { getByText } = render( <Button text="Нажми меня" onClick={ onClick } /> )
    fireEvent.click( getByText( 'Нажми меня' ) )
    expect( onClick ).toHaveBeenCalledTimes( 1 )
  } )
} )
