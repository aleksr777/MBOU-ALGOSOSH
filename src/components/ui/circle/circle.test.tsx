import React from 'react'
import { render } from '@testing-library/react'
import Circle from './circle'
import { ElementStates } from '../../../types/element-states'

describe( '<Circle />', () => {

  it( 'render without letter', () => {
    const { asFragment } = render( <Circle /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render with letters', () => {
    const { asFragment } = render( <Circle letter="A" /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render with head', () => {
    const { asFragment } = render( <Circle head="Head Content" /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly with react element in head', () => {
    const { asFragment } = render(
      <Circle head={
        <Circle letter={ 'A' } state={ ElementStates.Changing } isSmall={ true } />
      } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly with tail', () => {
    const { asFragment } = render( <Circle tail="Tail Content" /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly with react element in tail', () => {
    const { asFragment } = render( <Circle tail={
      <Circle letter={ 'A' } state={ ElementStates.Changing } isSmall={ true } />
    } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly with index', () => {
    const { asFragment } = render( <Circle index={ 5 } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly with isSmall prop', () => {
    const { asFragment } = render( <Circle isSmall={ true } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly in default state', () => {
    const { asFragment } = render( <Circle state={ ElementStates.Default } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'renders correctly in changing state', () => {
    const { asFragment } = render( <Circle state={ ElementStates.Changing } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )

  it( 'render correctly in modified state', () => {
    const { asFragment } = render( <Circle state={ ElementStates.Modified } /> )
    expect( asFragment() ).toMatchSnapshot()
  } )
} )
