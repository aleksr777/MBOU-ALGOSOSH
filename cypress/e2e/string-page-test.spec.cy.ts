import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { checkMainValue, checkMainClassByIndices } from '../../src/utils/e2e-tests-utils'


describe( 'Testing String Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/recursion' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    let testString = 'test1'
    cy.get( 'input[name="stringInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'button' )
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

    let testString = 'test2'
    let stringArr = testString.split( '' )
    cy.get( '[class*="circle_circle"]' ).should( 'not.exist' )
    cy.get( 'input[name="stringInput"]' ).type( testString )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Развернуть' ).click()
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'be.visible' )
    cy.get( '@button' ).should( 'be.disabled' ).should( 'not.have.text' )
    cy.wait( 100 )

    checkMainValue( stringArr )
    checkMainClassByIndices( [ 1, 2, 3 ], [ 0, 4 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkMainClassByIndices( [ 1, 2, 3 ], [], [ 0, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    testString = '2estt'
    stringArr = testString.split( '' )
    checkMainValue( stringArr )
    checkMainClassByIndices( [ 2 ], [ 1, 3 ], [ 0, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkMainClassByIndices( [ 2 ], [], [ 0, 1, 3, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    testString = '2tset'
    stringArr = testString.split( '' )
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'not.exist' )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Развернуть' )
    checkMainValue( stringArr )
    checkMainClassByIndices( [], [], [ 0, 1, 3, 4 ] )
  } )

} )

export { }
