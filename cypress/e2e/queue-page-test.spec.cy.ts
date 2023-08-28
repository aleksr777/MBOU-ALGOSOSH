import {
  checkValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkAndClickButton,
  checkBtnWhenInputEmpty,
  addTestElements
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing Queue Page', function () {

  beforeEach( () => {
    cy.visit( 'queue' )
    cy.get( 'input[name="queueInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
  } )

  it( 'should have a disabled submit button when input is empty', () => {
    checkBtnWhenInputEmpty( '@input', '@buttonSubmit', 'test' )
  } )


  it( 'should correctly add an element to the queue', () => {

    cy.get( '@input' ).type( 'test' ).should( 'have.value', 'test' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 7 )
    checkValues(
      null, // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3', '4', '5' ] // indixes
    )
    checkMainClassByIndices( [ 1, 2, 3, 4, 5, 6 ], [ 0 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )

    cy.get( '@input' ).type( 'me' ).should( 'have.value', 'me' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 7 )
    checkValues(
      [ 'test', '', '', '', '', '', '' ], // main
      [ 'head', '', '', '', '', '', '' ], // tops
      [ 'tail', '', '', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 2, 3, 4, 5, 6 ], [ 1 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkValues(
      [ 'test', 'me', '', '', '', '', '' ], // main
      [ 'head', '', '', '', '', '', '' ], // tops
      [ '', 'tail', '', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )

    cy.get( '@input' ).type( 'now' ).should( 'have.value', 'now' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 1, 3, 4, 5, 6 ], [ 2 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkValues(
      [ 'test', 'me', 'now', '', '', '', '' ], // main
      [ 'head', '', '', '', '', '', '' ], // tops
      [ '', '', 'tail', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
  } )


  it( 'should correctly remove an element from the queue', () => {

    cy.get( 'button[type="button"]:contains("Удалить")' ).as( 'buttonDel' )

    addTestElements( '@input', '@buttonSubmit' )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 1, 2, 3, 4, 5, 6 ], [ 0 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkValues(
      [ '', 'me', 'now', '', '', '', '' ], // main
      [ '', 'head', '', '', '', '', '' ], // tops
      [ '', '', 'tail', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 2, 3, 4, 5, 6 ], [ 1 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkValues(
      [ '', '', 'now', '', '', '', '' ], // main
      [ '', '', 'head', '', '', '', '' ], // tops
      [ '', '', 'tail', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 1, 3, 4, 5, 6 ], [ 2 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkValues(
      null, // main
      [ '', '', '', 'head', '', '', '' ], // tops
      null, // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkDisabledButton( '@buttonDel', 'Удалить' )

  } )


  it( 'should correctly clear the queue', () => {

    cy.get( 'button:contains("Очистить")' ).as( 'buttonClear' )

    addTestElements( '@input', '@buttonSubmit' )

    checkAndClickButton( '@buttonClear', 'Очистить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [], [ 0, 1, 2, 3, 4, 5, 6 ], [] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkValues(
      null, // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkDisabledButton( '@buttonClear', 'Очистить' )
  } )

} )

export { }
