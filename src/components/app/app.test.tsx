import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './app'

test( 'renders main page title', () => {
  render( <App /> )
  const titleElement = screen.getByText( /МБОУ АЛГОСОШ/i )
  expect( titleElement ).toBeInTheDocument()
} )
