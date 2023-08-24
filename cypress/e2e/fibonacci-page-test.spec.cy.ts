import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { checkStrValues, checkMainClassByIndices, checkElementsCount } from '../../src/utils/e2e-tests-utils'


describe( 'Testing Fibonacci Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/fibonacci' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    cy.get( 'input[name="fibonacciInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'button' )
    // после загрузки страницы
    cy.get( '@input' ).should( 'have.value', '' )
    cy.get( '@button' ).should( 'be.disabled' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( '10' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    cy.get( '@button' ).should( 'be.disabled' )
    cy.wait( SHORT_DELAY_IN_MS )
  } )


  it( 'should correctly animate', () => {

    cy.get( 'button[type="submit"]' ).as( 'button' )
    cy.get( 'input[name="fibonacciInput"]' ).as( 'input' )

    cy.get( '@input' ).type( '4' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 0 )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Рассчитать' ).click()
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'be.visible' )
    cy.get( '@button' ).should( 'be.disabled' ).should( 'not.have.text' )
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
    checkMainClassByIndices( [ 0, 1, 2, 3, 4 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

  } )

} )

export { }
