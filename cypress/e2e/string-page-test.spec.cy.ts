import {
  checkValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkAndClickButton,
  checkActiveButton,
  checkBtnWhenInputEmpty,
  btnSubmitSelector
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing String Page', function () {

  beforeEach( () => {
    cy.visit( 'recursion' )
    cy.get( 'input[name="stringInput"]' ).as( 'input' )
    cy.get( btnSubmitSelector ).as( 'buttonSubmit' )
    checkElementsCount( 0 )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    checkBtnWhenInputEmpty( '@input', '@buttonSubmit', '19' )
  } )

  it( 'should correctly animate', () => {

    cy.get( '@input' ).type( 'test2' )
    checkAndClickButton( '@buttonSubmit', 'Развернуть' )

    checkElementsCount( 5 )
    checkValues(
      [ 't', 'e', 's', 't', '2' ], // main
      null, // tops
      null, // tails
      null // indixes
    )
    checkMainClassByIndices( [ 1, 2, 3 ], [ 0, 4 ], [] )

    checkMainClassByIndices( [ 1, 2, 3 ], [], [ 0, 4 ] )

    checkElementsCount( 5 )
    checkValues(
      [ '2', 'e', 's', 't', 't' ], // main
      null, // tops
      null, // tails
      null // indixes
    )
    checkMainClassByIndices( [ 2 ], [ 1, 3 ], [ 0, 4 ] )

    checkMainClassByIndices( [ 2 ], [], [ 0, 1, 3, 4 ] )

    checkElementsCount( 5 )
    checkValues(
      [ '2', 't', 's', 'e', 't' ], // main
      null, // tops
      null, // tails
      null // indixes
    )
    checkMainClassByIndices( [], [], [ 0, 1, 3, 4 ] )
    checkActiveButton( '@buttonSubmit', 'Развернуть' )
  } )

} )

export { }
