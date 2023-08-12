import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { FibonacciPage } from '../fibonacci-page/fibonacci-page'
import { ListPage } from '../list-page/list-page'
import { MainPage } from '../main-page/main-page'
import { QueuePage } from '../queue-page/queue-page'
import { StringComponent } from '../string/string'
import { SortingPage } from '../sorting-page/sorting-page'
import { StackPage } from '../stack-page/stack-page'

describe( '<App />', () => {

  test( 'correct routing to MainPage ', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={ [ '/' ] }>
        <MainPage />
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
        <StringComponent />
      </MemoryRouter>
    )
    const title = getByText( /строка/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to FibonacciPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/fibonacci' ] }>
        <FibonacciPage />
      </MemoryRouter>
    )
    const title = getByText( /последовательность фибоначчи/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to SortingPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/sorting' ] }>
        <SortingPage />
      </MemoryRouter>
    )
    const title = getByText( /сортировка массива/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to StackPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/stack' ] }>
        <StackPage />
      </MemoryRouter>
    )
    const title = getByText( /стек/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to QueuePage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/queue' ] }>
        <QueuePage />
      </MemoryRouter>
    )
    const title = getByText( /очередь/i )
    expect( title ).toBeInTheDocument()
  } )

  test( 'correct routing to ListPage', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ [ '/list' ] }>
        <ListPage />
      </MemoryRouter>
    )
    const title = getByText( /связный список/i )
    expect( title ).toBeInTheDocument()
  } )

} )
