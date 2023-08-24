import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { checkStrValues, checkMainClassByIndices, checkElementsCount } from '../../src/utils/e2e-tests-utils'


describe( 'Testing String Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/recursion' )
    cy.get( 'input[name="stringInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'button' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    let testString = 'test1'
    // после загрузки страницы
    cy.get( '@input' ).should( 'have.value', '' )
    cy.get( '@button' ).should( 'be.disabled' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( testString )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    cy.get( '@button' ).should( 'be.disabled' )
    cy.wait( SHORT_DELAY_IN_MS )
  } )

  it( 'should correctly animate', () => {

    cy.get( 'button[type="submit"]' ).as( 'button' )

    checkElementsCount( 0 )
    cy.get( '@input' ).type( 'test2' )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Развернуть' ).click()
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'be.visible' )
    cy.get( '@button' ).should( 'be.disabled' ).should( 'not.have.text' )
    cy.wait( 100 )

    checkElementsCount( 5 )
    checkStrValues(
      [ 't', 'e', 's', 't', '2' ], // main
      null, // tops
      null, // tails
      null // indixes
    )
    checkMainClassByIndices( [ 1, 2, 3 ], [ 0, 4 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkMainClassByIndices( [ 1, 2, 3 ], [], [ 0, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 5 )
    checkStrValues(
      [ '2', 'e', 's', 't', 't' ], // main
      null, // tops
      null, // tails
      null // indixes
    )
    checkMainClassByIndices( [ 2 ], [ 1, 3 ], [ 0, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkMainClassByIndices( [ 2 ], [], [ 0, 1, 3, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkElementsCount( 5 )
    checkStrValues(
      [ '2', 't', 's', 'e', 't' ], // main
      null, // tops
      null, // tails
      null // indixes
    )
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'not.exist' )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Развернуть' )
    checkMainClassByIndices( [], [], [ 0, 1, 3, 4 ] )
  } )

} )

export { }
