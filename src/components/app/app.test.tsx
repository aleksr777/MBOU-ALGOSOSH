import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './app'


describe( 'Test App Routing', () => {

  test( 'Routing to MainPage', async () => {
    const links = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]
    const { container, asFragment } = render(
      <MemoryRouter initialEntries={ [ '/' ] }>
        <App />
      </MemoryRouter>
    )
    expect( asFragment() ).toMatchSnapshot()
    links.forEach( link => {
      const linkElement = container.querySelector( `a[href="${ link }"]` )
      expect( linkElement ).toBeInTheDocument()
    } )
  } )

  function testRouteByTitle ( href: string, title: RegExp ) {
    const { container, getByText, asFragment } = render(
      <MemoryRouter initialEntries={ [ '/' ] }>
        <App />
      </MemoryRouter>
    )
    expect( asFragment() ).toMatchSnapshot()
    const link = container.querySelector( `a[href='${ href }']` )
    link && userEvent.click( link )
    expect( getByText( title ) ).toBeInTheDocument()
  }

  it( 'Routing to StringPage', async () => {
    testRouteByTitle( '/recursion', /строка/i )
  } )
  it( 'Routing to FibonacciPage', async () => {
    testRouteByTitle( '/fibonacci', /последовательность фибоначчи/i )
  } )
  it( 'Routing to SortingPage', async () => {
    testRouteByTitle( '/sorting', /сортировка массива/i )
  } )
  it( 'Routing to QueuePage', async () => {
    testRouteByTitle( '/queue', /очередь/i )
  } )
  it( 'Routing to StackPage', async () => {
    testRouteByTitle( '/stack', /стек/i )
  } )
  it( 'Routing to QueuePage', async () => {
    testRouteByTitle( '/list', /связный список/i )
  } )
} )
