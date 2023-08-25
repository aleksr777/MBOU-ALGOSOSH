import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
  checkStrValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkAndClickButton
} from '../../src/utils/e2e-tests-utils'

describe( 'Testing Stack Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/stack' )
    cy.get( 'input[name="stackInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {

    // после загрузки страницы
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).should( 'have.value', '' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( '10' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    cy.wait( SHORT_DELAY_IN_MS )

  } )

  it( 'should correctly add an element to the stack', () => {

    cy.get( '@input' ).type( 'test' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 0 )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 1 )
    checkStrValues(
      [ 'test' ], // main
      [ 'top' ], // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [], [ 0 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    cy.get( '@input' ).type( 'me' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 1 )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 2 )
    checkStrValues(
      [ 'test', 'me' ], // main
      [ '', 'top' ], // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [ 1 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0, 1 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

    cy.get( '@input' ).type( 'now' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 2 )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 3 )
    checkStrValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [ 2 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )
    cy.wait( SHORT_DELAY_IN_MS )

  } )


  it( 'should correctly remove an element from the stack', () => {

    cy.get( 'button[type="button"]:contains("Удалить")' ).as( 'buttonDel' )

    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).type( 'test' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).type( 'me' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).type( 'now' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 3 )
    checkStrValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [ 2 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 2 )
    checkStrValues(
      [ 'test', 'me' ], // main
      [ '', 'top' ], // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1 ], [], [] )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 2 )
    checkStrValues(
      [ 'test', 'me' ], // main
      [ '', 'top' ], // tops
      null, // tails
      [ '0', '1' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [ 1 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 1 )
    checkStrValues(
      [ 'test' ], // main
      [ 'top' ], // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [ 0 ], [], [] )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 1 )
    checkStrValues(
      [ 'test' ], // main
      [ 'top' ], // tops
      null, // tails
      [ '0' ] // indixes
    )
    checkMainClassByIndices( [], [ 0 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 0 )
    checkDisabledButton( '@buttonDel', 'Удалить' )
  } )


  it( 'should clear the stack when the "Clear" button is pressed', () => {

    cy.get( 'button:contains("Очистить")' ).as( 'buttonClear' )

    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).type( 'test' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).type( 'me' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).type( 'now' )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )

    checkElementsCount( 3 )
    checkStrValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )

    checkAndClickButton( '@buttonClear', 'Очистить' )
    checkElementsCount( 3 )
    checkStrValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [], [ 0, 1, 2 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 0 )
    checkDisabledButton( '@buttonClear', 'Очистить' )
  } )

} )

export { }
