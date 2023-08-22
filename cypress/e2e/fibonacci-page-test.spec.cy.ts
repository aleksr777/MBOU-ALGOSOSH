import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'


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

    const checkElements = ( arr: number[] ) => {
      arr.forEach( ( char, index ) => {
        cy.get( '[class*="letter"]' ).eq( index )
          .should( 'contain.text', char )
        cy.get( '[class*="circle_circle"]' )
          .invoke( 'attr', 'class' )
          .should( 'match', new RegExp( 'circle_default' ) )
        cy.get( '[class*="circle_tail"][class*="circle_string"]' ).should( 'contain.text', index )
      } )
    }

    cy.get( 'button[type="submit"]' ).as( 'button' )
    cy.get( 'input[name="fibonacciInput"]' ).as( 'input' )

    cy.get( '@input' ).type( '5' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@button' ).should( 'not.be.disabled' ).should( 'have.text', 'Рассчитать' ).click()
    cy.get( 'button[type="submit"] img[class*="loader_icon"]' ).should( 'be.visible' )
    cy.get( '@button' ).should( 'be.disabled' ).should( 'not.have.text' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElements( [ 1 ] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElements( [ 1, 1 ] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElements( [ 1, 1, 2 ] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElements( [ 1, 1, 2, 3 ] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElements( [ 1, 1, 2, 3, 5 ] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElements( [ 1, 1, 2, 3, 5, 8 ] )
  } )

} )

export { }
