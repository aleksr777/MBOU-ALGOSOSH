import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './app'


describe( 'Test App Routing', () => {

  test( 'Routing to MainPage', async () => {
    const links = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]
    const { container } = render(
      <MemoryRouter initialEntries={ [ '/' ] }>
        <App />
      </MemoryRouter>
    )
    links.forEach( link => {
      const linkElement = container.querySelector( `a[href="${ link }"]` )
      expect( linkElement ).toBeInTheDocument()
    } )
  } )

  function testRouteByTitle ( href: string, title: RegExp ) {
    test( `Routing to '${ href }'`, async () => {
      const { container, getByText } = render(
        <MemoryRouter initialEntries={ [ '/' ] }>
          <App />
        </MemoryRouter>
      )
      const link = container.querySelector( `a[href='${ href }']` )
      link && userEvent.click( link )
      expect( getByText( title ) ).toBeInTheDocument()
    } )
  }

  testRouteByTitle( '/recursion', /строка/i )
  testRouteByTitle( '/fibonacci', /последовательность фибоначчи/i )
  testRouteByTitle( '/sorting', /сортировка массива/i )
  testRouteByTitle( '/queue', /очередь/i )
  testRouteByTitle( '/stack', /стек/i )
  testRouteByTitle( '/list', /связный список/i )
} )
