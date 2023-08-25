import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import {
  checkStrValues,
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkActiveButton,
  checkAndClickButton
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing Queue Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/queue' )
    cy.get( 'input[name="queueInput"]' ).as( 'input' )
    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    cy.get( 'button[type="button"]:contains("Удалить")' ).as( 'buttonDel' )
    cy.get( 'button:contains("Очистить")' ).as( 'buttonClear' )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    checkDisabledButton( '@buttonDel', 'Удалить' )
    checkDisabledButton( '@buttonClear', 'Очистить' )
  } )

  function addTestElements () {
    cy.get( '@input' ).type( 'test' )
    cy.get( '@buttonSubmit' ).click()
    cy.get( '@input' ).type( 'me' )
    cy.get( '@buttonSubmit' ).click()
    cy.get( '@input' ).type( 'now' )
    cy.get( '@buttonSubmit' ).click()
  }

  it( 'should have a disabled submit button when input is empty', () => {

    // после загрузки страницы
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    cy.get( '@input' ).should( 'have.value', '' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( 'test1' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
    cy.wait( SHORT_DELAY_IN_MS )

  } )


  it( 'should correctly add an element to the queue', () => {

    cy.get( '@input' ).type( 'test' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 7 )
    checkStrValues(
      null, // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3', '4', '5' ] // indixes
    )
    checkMainClassByIndices( [ 1, 2, 3, 4, 5, 6 ], [ 0 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )

    cy.get( '@input' ).type( 'me' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 7 )
    checkStrValues(
      [ 'test', '', '', '', '', '', '' ], // main
      [ 'head', '', '', '', '', '', '' ], // tops
      [ 'tail', '', '', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 2, 3, 4, 5, 6 ], [ 1 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkStrValues(
      [ 'test', 'me', '', '', '', '', '' ], // main
      [ 'head', '', '', '', '', '', '' ], // tops
      [ '', 'tail', '', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )

    cy.get( '@input' ).type( 'now' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkAndClickButton( '@buttonSubmit', 'Добавить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 1, 3, 4, 5, 6 ], [ 2 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkStrValues(
      [ 'test', 'me', 'now', '', '', '', '' ], // main
      [ 'head', '', '', '', '', '', '' ], // tops
      [ '', '', 'tail', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonSubmit', 'Добавить' )
  } )


  it( 'should correctly remove an element from the queue', () => {

    addTestElements()

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 1, 2, 3, 4, 5, 6 ], [ 0 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkStrValues(
      [ '', 'me', 'now', '', '', '', '' ], // main
      [ '', 'head', '', '', '', '', '' ], // tops
      [ '', '', 'tail', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 2, 3, 4, 5, 6 ], [ 1 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkStrValues(
      [ '', '', 'now', '', '', '', '' ], // main
      [ '', '', 'head', '', '', '', '' ], // tops
      [ '', '', 'tail', '', '', '', '' ], // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )

    checkAndClickButton( '@buttonDel', 'Удалить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [ 0, 1, 3, 4, 5, 6 ], [ 2 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkStrValues(
      null, // main
      [ '', '', '', 'head', '', '', '' ], // tops
      null, // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonDel', 'Удалить' )

  } )


  it( 'should correctly clear the queue', () => {

    addTestElements()

    checkAndClickButton( '@buttonClear', 'Очистить' )
    checkElementsCount( 7 )
    checkMainClassByIndices( [], [ 0, 1, 2, 3, 4, 5, 6 ], [] )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 7 )
    checkStrValues(
      null, // main
      null, // tops
      null, // tails
      [ '0', '1', '2', '3', '4', '5', '6' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@buttonClear', 'Очистить' )
  } )

} )

export { }
