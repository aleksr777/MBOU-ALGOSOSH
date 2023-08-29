import {
  checkValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkAndClickButton,
  checkActiveButton,
  checkBtnWhenInputEmpty,
  btnSubmitSelector
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing Fibonacci Page', function () {

  beforeEach( () => {
    cy.visit( 'fibonacci' )
    cy.get( 'input[name="fibonacciInput"]' ).as( 'input' )
    cy.get( btnSubmitSelector ).as( 'buttonSubmit' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    checkBtnWhenInputEmpty( '@input', '@buttonSubmit', '19' )
  } )


  it( 'should correctly animate', () => {

    cy.get( '@input' ).type( '4' ).should( 'have.value', '4' )
    checkElementsCount( 0 )
    checkAndClickButton( '@buttonSubmit', 'Рассчитать' )

    checkElementsCount( 1 )
    checkValues(
      [ '1' ], // main
      null, // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [], [] )

    checkElementsCount( 2 )
    checkValues(
      [ '1', '1' ], // main
      null, // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [], [] )

    checkElementsCount( 3 )
    checkValues(
      [ '1', '1', '2' ], // main
      null, // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )

    checkElementsCount( 4 )
    checkValues(
      [ '1', '1', '2', '3' ], // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3 ], [], [] )

    checkElementsCount( 5 )
    checkValues(
      [ '1', '1', '2', '3', '5' ], // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3', '4' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4 ], [], [] )
    checkActiveButton( '@buttonSubmit', 'Рассчитать' )

  } )

} )

export { }
