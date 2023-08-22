import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { checkMainValue, checkMainClassByIndices, checkHeadStrValue } from '../../src/utils/e2e-tests-utils'


describe( 'Testing Stack Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/stack' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {

    cy.get( 'input[name="stackInput"]' ).as( 'input' )
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

  it( 'should correctly add an element to the stack', () => {

    cy.get( 'input[name="stackInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'button' )

    cy.get( '@input' ).type( 'test' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Добавить' ).click()
    checkMainValue( [ 'test' ] )
    checkHeadStrValue( [ 'top' ] )
    checkMainClassByIndices( [], [ 0 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    cy.get( '@input' ).type( 'me' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Добавить' ).click()
    checkMainValue( [ 'test', 'me' ] )
    checkHeadStrValue( [ '', 'top' ] )
    checkMainClassByIndices( [ 0 ], [ 1 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0, 1 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    cy.get( '@input' ).type( 'now' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Добавить' ).click()
    checkMainValue( [ 'test', 'me', 'now' ] )
    checkHeadStrValue( [ '', '', 'top' ] )
    checkMainClassByIndices( [ 0, 1 ], [ 2 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

  } )

} )

export { }
