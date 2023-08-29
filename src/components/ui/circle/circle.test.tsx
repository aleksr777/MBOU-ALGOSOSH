import React from 'react'
import { render } from '@testing-library/react'
import Circle from './circle'
import { ElementStates } from '../../../types/element-states'
import { CircleProps } from '../circle/circle'

describe( '<Circle />', () => {

  function renderAndMatchSnapshot ( props: CircleProps ) {
    const { asFragment } = render( <Circle { ...props } /> )
    expect( asFragment() ).toMatchSnapshot()
  }

  it( 'render without letter', () => {
    renderAndMatchSnapshot( {} )
  } )

  it( 'render with letters', () => {
    renderAndMatchSnapshot( { letter: "A" } )
  } )

  it( 'render with head', () => {
    renderAndMatchSnapshot( { head: "Head Content" } )
  } )

  it( 'render correctly with react element in head', () => {
    renderAndMatchSnapshot( {
      head: <Circle letter='A' state={ ElementStates.Changing } isSmall={ true } />
    } )
  } )

  it( 'render correctly with tail', () => {
    renderAndMatchSnapshot( { tail: "Tail Content" } )
  } )

  it( 'render correctly with react element in tail', () => {
    renderAndMatchSnapshot( {
      tail: <Circle letter='A' state={ ElementStates.Changing } isSmall={ true } />
    } )
  } )

  it( 'render correctly with index', () => {
    renderAndMatchSnapshot( { index: 5 } )
  } )

  it( 'render correctly with isSmall prop', () => {
    renderAndMatchSnapshot( { isSmall: true } )
  } )

  it( 'render correctly in default state', () => {
    renderAndMatchSnapshot( { state: ElementStates.Default } )
  } )

  it( 'renders correctly in changing state', () => {
    renderAndMatchSnapshot( { state: ElementStates.Changing } )
  } )

  it( 'render correctly in modified state', () => {
    renderAndMatchSnapshot( { state: ElementStates.Modified } )
  } )
} )
