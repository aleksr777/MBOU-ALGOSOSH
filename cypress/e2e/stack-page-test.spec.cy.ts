import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'
import { checkStrValues, checkMainClassByIndices, checkElementsCount } from '../../src/utils/e2e-tests-utils'


describe( 'Testing Stack Page', function () {

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/stack' )
    cy.get( 'input[name="stackInput"]' ).as( 'input' )
  } )

  it( 'should have a disabled submit button when input is empty', () => {

    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    // после загрузки страницы
    cy.get( '@input' ).should( 'have.value', '' )
    cy.get( '@buttonSubmit' ).should( 'be.disabled' )
    cy.wait( SHORT_DELAY_IN_MS )
    // после введения и удаления текста в инпуте
    cy.get( '@input' ).type( '10' )
    cy.wait( SHORT_DELAY_IN_MS )
    cy.get( '@input' ).clear()
    cy.get( '@buttonSubmit' ).should( 'be.disabled' )
    cy.wait( SHORT_DELAY_IN_MS )

  } )

  it( 'should correctly add an element to the stack', () => {

    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )

    cy.get( '@input' ).type( 'test' )
    cy.wait( SHORT_DELAY_IN_MS )
    checkElementsCount( 0 )
    cy.get( '@buttonSubmit' ).should( 'not.be.disabled' ).should( 'have.text', 'Добавить' ).click()
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
    cy.get( '@buttonSubmit' ).should( 'not.be.disabled' ).should( 'have.text', 'Добавить' ).click()
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
    cy.get( '@buttonSubmit' ).should( 'not.be.disabled' ).should( 'have.text', 'Добавить' ).click()
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

    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    cy.get( 'button:contains("Удалить")' ).as( 'buttonDel' )

    cy.get( '@input' ).type( 'test' )
    cy.get( '@buttonSubmit' ).click()
    cy.get( '@input' ).type( 'me' )
    cy.get( '@buttonSubmit' ).click()
    cy.get( '@input' ).type( 'now' )
    cy.get( '@buttonSubmit' ).click()

    cy.get( '@buttonDel' ).click()
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

    cy.get( '@buttonDel' ).click()
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

    cy.get( '@buttonDel' ).click()
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
  } )


  it( 'should clear the stack when the "Clear" button is pressed', () => {

    cy.get( 'button[type="submit"]' ).as( 'buttonSubmit' )
    cy.get( 'button:contains("Очистить")' ).as( 'buttonClear' )


    cy.get( '@input' ).type( 'test' )
    cy.get( '@buttonSubmit' ).click()
    cy.get( '@input' ).type( 'me' )
    cy.get( '@buttonSubmit' ).click()
    cy.get( '@input' ).type( 'now' )
    cy.get( '@buttonSubmit' ).click()

    checkElementsCount( 3 )
    checkStrValues(
      [ 'test', 'me', 'now' ], // main
      [ '', '', 'top' ], // tops
      null, // tails
      [ '0', '1', '2' ] // indixes
    )
    checkMainClassByIndices( [ 0, 1, 2 ], [], [] )

    cy.get( '@buttonClear' ).click()
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
  } )

} )

export { }
