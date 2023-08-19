import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'


describe( 'Testing Recursion Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/recursion' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    let testString = 'test1'
    cy.get( 'input[name="stringInput"]' ).should( 'have.value', '' ) // пустая строка при загрузке странице
    cy.get( 'button[type="submit"]' ).should( 'be.disabled' )
    cy.get( 'input[name="stringInput"]' ).type( testString )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( 'input[name="stringInput"]' ).clear()// пустая строка после введения и удаления текста в инпуте
    cy.get( 'button[type="submit"]' ).should( 'be.disabled' )
  } )

  it( 'should correctly animate', () => {

    function checkChars ( stringArr: string[] ) {
      stringArr.forEach( ( char, index ) => {
        cy.get( '[class*="letter"]' ).eq( index ).should( 'contain.text', char )
      } )
    }

    function checkPartialClassByIndices (
      defaultIndices: number[],
      changingIndices: number[],
      modifiedIndices: number[]
    ) {
      const checkIndicesForClass = ( indices: number[], partialClassName: string ) => {
        cy.get( '[class*="circle_circle"]' ).then( ( elements ) => {
          indices.forEach( index => {
            cy.wrap( elements.eq( index ) )
              .invoke( 'attr', 'class' )
              .should( 'match', new RegExp( partialClassName ) )
          } )
        } )
      }
      checkIndicesForClass( defaultIndices, 'circle_default' )
      checkIndicesForClass( changingIndices, 'circle_changing' )
      checkIndicesForClass( modifiedIndices, 'circle_modified' )
    }

    let testString = 'test2'
    let stringArr = testString.split( '' )
    cy.get( '[class*="circle_modified"]' ).should( 'not.exist' )
    cy.get( 'input[name="stringInput"]' ).type( testString )
    cy.get( 'button[type="submit"]' ).should('not.be.disabled').click()
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'be.visible' )
    cy.get( 'button[type="submit"]' ).should( 'be.disabled' )
    cy.wait( 100 )

    checkChars( stringArr )
    checkPartialClassByIndices( [ 1, 2, 3 ], [ 0, 4 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkPartialClassByIndices( [ 1, 2, 3 ], [], [ 0, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    testString = '2estt'
    stringArr = testString.split( '' )
    checkChars( stringArr )
    checkPartialClassByIndices( [ 2 ], [ 1, 3 ], [ 0, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    checkPartialClassByIndices( [ 2 ], [], [ 0, 1, 3, 4 ] )
    cy.wait( SHORT_DELAY_IN_MS )

    testString = '2tset'
    stringArr = testString.split( '' )
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'not.exist' )
    cy.get( 'button[type="submit"]' ).should('not.be.disabled')
    checkChars( stringArr )
    checkPartialClassByIndices( [], [], [ 0, 1, 3, 4 ] )
  } )

} )

export { }
