import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
  checkStrValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkAndClickButton,
  checkActiveButton
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing Fibonacci Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/fibonacci' )
    cy.get( 'input[name="fibonacciInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    // после загрузки страницы
    checkDisabledButton( '@buttonSubmit', 'Рассчитать' )
    cy.get( '@input' ).should( 'have.value', '' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( 'test1' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    checkDisabledButton( '@buttonSubmit', 'Рассчитать' )
    cy.wait( SHORT_DELAY_IN_MS )
  } )


  it( 'should correctly animate', () => {

    cy.get( '@input' ).type( '4' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 0 )
    checkAndClickButton( '@buttonSubmit', 'Рассчитать' )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 1 )
    checkStrValues(
      [ '1' ], // main
      null, // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 2 )
    checkStrValues(
      [ '1', '1' ], // main
      null, // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 3 )
    checkStrValues(
      [ '1', '1', '2' ], // main
      null, // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 4 )
    checkStrValues(
      [ '1', '1', '2', '3' ], // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 5 )
    checkStrValues(
      [ '1', '1', '2', '3', '5' ], // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3', '4' ] // indixes
    )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4 ], [], [] )
    checkActiveButton( '@buttonSubmit', 'Рассчитать' )
    
  } )

} )

export { }
