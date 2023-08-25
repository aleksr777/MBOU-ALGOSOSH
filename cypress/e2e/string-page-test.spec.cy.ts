import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
  checkStrValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkAndClickButton,
  checkActiveButton
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing String Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/recursion' )
    cy.get( 'input[name="stringInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    checkElementsCount( 0 )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    // после загрузки страницы
    checkDisabledButton( '@buttonSubmit', 'Развернуть' )
    cy.get( '@input' ).should( 'have.value', '' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( 'test1' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    checkDisabledButton( '@buttonSubmit', 'Развернуть' )
    cy.wait( SHORT_DELAY_IN_MS )
  } )

  it( 'should correctly animate', () => {

    cy.get( '@input' ).type( 'test2' )
    checkAndClickButton( '@buttonSubmit', 'Развернуть' )

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
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [], [], [ 0, 1, 3, 4 ] )
    checkActiveButton( '@buttonSubmit', 'Развернуть' )
  } )

} )

export { }
