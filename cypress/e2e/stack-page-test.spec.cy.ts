import {
  checkValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkAndClickButton,
  checkBtnWhenInputEmpty,
  addTestElements
} from '../../src/utils/e2e-tests-utils'

describe( 'Testing Stack Page', function () {

  beforeEach( () => {
    cy.visit( 'stack' )
    cy.get( 'input[name="stackInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    checkElementsCount( 0 )
  } )


  it( 'should have a disabled submit button when input is empty', () => {
    checkBtnWhenInputEmpty( '@input', '@buttonSubmit', '19' )
  } )


  it( 'should correctly add an element to the stack', () => {

    cy.get( '@input' ).type( 'test' ).should( 'have.value', 'test' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 1 )
    checkValues(
      [ 'test' ], // main
      [ 'top' ], // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [], [ 0 ], [] )
    checkMainClassByIndices( [ 0 ], [], [] )

    cy.get( '@input' ).type( 'me' ).should( 'have.value', 'me' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 2 )
    checkValues(
      [ 'test', 'me' ], // main
      [ '', 'top' ], // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [ 1 ], [] )
    checkMainClassByIndices( [ 0, 1 ], [], [] )

    cy.get( '@input' ).type( 'now' ).should( 'have.value', 'now' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 3 )
    checkValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [ 2 ], [] )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
  } )


  it( 'should correctly remove an element from the stack', () => {

    cy.get( 'button[type="button"]:contains("Удалить")' ).as( 'buttonDel' )

    addTestElements( '@input', '@buttonSubmit' )
    checkElementsCount( 3 )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [ 2 ], [] )
    checkMainClassByIndices( [ 0, 1 ], [], [] )
    checkValues(
      [ 'test', 'me' ], // main
      [ '', 'top' ], // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkElementsCount( 2 )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkValues(
      [ 'test', 'me' ], // main
      [ '', 'top' ], // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [ 1 ], [] )
    checkMainClassByIndices( [ 0 ], [], [] )
    checkValues(
      [ 'test' ], // main
      [ 'top' ], // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkElementsCount( 1 )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkValues(
      [ 'test' ], // main
      [ 'top' ], // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [], [ 0 ], [] )
    checkElementsCount( 0 )
    checkDisabledButton( '@buttonDel', 'Удалить' )
  } )


  it( 'should clear the stack when the "Clear" button is pressed', () => {

    cy.get( 'button:contains("Очистить")' ).as( 'buttonClear' )

    addTestElements( '@input', '@buttonSubmit' )

    checkElementsCount( 3 )
    checkValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )

    checkAndClickButton( '@buttonClear', 'Очистить' )
    checkElementsCount( 3 )
    checkValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [], [ 0, 1, 2 ], [] )
    checkElementsCount( 0 )
    checkDisabledButton( '@buttonClear', 'Очистить' )
  } )

} )

export { }
