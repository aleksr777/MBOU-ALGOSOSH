import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import App from './app'

describe( 'Test App routing', () => {

  test( 'correct routing to MainPage ', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={ [ '/' ] }>
        <App />
      </MemoryRouter>
    )

    const links = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]

    links.forEach( link => {
      const linkElement = container.querySelector( `a[href="${ link }"]` )
      expect( linkElement ).toBeInTheDocument()
    } )
  } )

  test( 'correct routing to StringComponent', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/recursion' ] }>
        <App />
      </MemoryRouter>
    )
    const title = getByText( /строка/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to FibonacciPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/fibonacci' ] }>
        <App />
      </MemoryRouter>
    )
    const title = getByText( /последовательность фибоначчи/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to SortingPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/sorting' ] }>
        <App />
      </MemoryRouter>
    )
    const title = getByText( /сортировка массива/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to StackPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/stack' ] }>
        <App />
      </MemoryRouter>
    )
    const title = getByText( /стек/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to QueuePage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/queue' ] }>
        <App />
      </MemoryRouter>
    )
    const title = getByText( /очередь/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to ListPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/list' ] }>
        <App />
      </MemoryRouter>
    )
    const title = getByText( /связный список/i )
    expect( title ).toBeInTheDocument()
  } )

} )
