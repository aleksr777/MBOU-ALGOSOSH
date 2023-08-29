import {
  checkMainClassByIndices,
  checkElementsCount,
  checkDisabledButton,
  checkAndClickButton,
  checkArrValues,
  checkMainValueByIndex,
  checkBtnWhenInputEmpty,
  checkMiniCircle,
  waitDisappearMiniCircle,
  checkMainValuesNotEmpty,
  getValueByIndex,
  waitDisappearValueByIndex,
  checkActiveButton,
  circleHeadIdSelector,
  circleTailIdSelector,
  circleIndexIdSelector,
  htInputSelector,
  indxInputSelector
} from '../../src/utils/e2e-tests-utils'


describe( 'Testing List Page', function () {

  beforeEach( () => {
    cy.visit( 'list' )
  } )


  it( 'should have the disabled buttons when inputs are empty', () => {

    cy.get( htInputSelector ).as( 'htInput' )
    cy.get( 'button:contains("Добавить в head")' ).as( 'addToHeadBtn' )
    cy.get( 'button:contains("Добавить в tail")' ).as( 'addToTailBtn' )

    cy.get( indxInputSelector ).as( 'idxInput' )
    cy.get( 'button:contains("Добавить по индексу")' ).as( 'addByIndexBtn' )
    cy.get( 'button:contains("Удалить по индексу")' ).as( 'delByIndexBtn' )

    checkBtnWhenInputEmpty( '@htInput', '@addToHeadBtn', 'test' )
    checkBtnWhenInputEmpty( '@htInput', '@addToTailBtn', '123' )
    checkBtnWhenInputEmpty( '@idxInput', '@delByIndexBtn', '5' )
    cy.get( '@htInput' ).type( 'test' ).should( 'have.value', 'test' )
    checkBtnWhenInputEmpty( '@idxInput', '@addByIndexBtn', '0' )
    cy.get( '@htInput' ).clear().should( 'have.value', '' )

    // Контрольная проверка кнопок
    checkDisabledButton( '@addToHeadBtn', 'Добавить в head' )
    checkDisabledButton( '@addToTailBtn', 'Добавить в tail' )
    checkDisabledButton( '@addByIndexBtn', 'Добавить по индексу' )
    checkDisabledButton( '@delByIndexBtn', 'Удалить по индексу' )
  } )


  it( 'should correctly render the default list', () => {

    checkMainValuesNotEmpty()
    checkElementsCount( 6 )

    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5 ], [], [] )

    checkArrValues(
      [ 'head', '', '', '', '', '' ],
      circleHeadIdSelector
    )
    checkArrValues(
      [ '', '', '', '', '', 'tail' ],
      circleTailIdSelector
    )
    checkArrValues(
      [ '0', '1', '2', '3', '4', '5' ],
      circleIndexIdSelector
    )
  } )


  it( 'should correctly add an element to the head', () => {

    cy.get( htInputSelector ).as( 'htInput' )
    cy.get( 'button:contains("Добавить в head")' ).as( 'addToHeadBtn' )

    cy.get( '@htInput' ).type( 'test' ).should( 'have.value', 'test' )
    checkAndClickButton( '@addToHeadBtn', 'Добавить в head' )
    checkElementsCount( 6 )
    checkMainValuesNotEmpty()
    checkMiniCircle( circleHeadIdSelector, 'test', 'changing', 0 )
    waitDisappearMiniCircle( circleHeadIdSelector, 0 )
    checkMainClassByIndices( [ 1, 2, 3, 4, 5, 6 ], [], [ 0 ] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkArrValues(
      [ 'head', '', '', '', '', '', '' ],
      circleHeadIdSelector
    )
    checkArrValues(
      [ '', '', '', '', '', '', 'tail' ],
      circleTailIdSelector
    )
    checkArrValues(
      [ '0', '1', '2', '3', '4', '5', '6' ],
      circleIndexIdSelector
    )
    checkElementsCount( 7 )
    checkMainValueByIndex( 'test', 0 )
    checkDisabledButton( '@addToHeadBtn', 'Добавить в head' )

  } )


  it( 'should correctly add an element to the tail', () => {

    cy.get( htInputSelector ).as( 'htInput' )
    cy.get( 'button:contains("Добавить в tail")' ).as( 'addToTailBtn' )

    cy.get( '@htInput' ).type( 'test' ).should( 'have.value', 'test' )
    checkAndClickButton( '@addToTailBtn', 'Добавить в tail' )
    checkElementsCount( 6 )
    checkMainValuesNotEmpty()
    checkMiniCircle( circleTailIdSelector, 'test', 'changing', 5 )
    waitDisappearMiniCircle( circleTailIdSelector, 5 )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5 ], [], [ 6 ] )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkArrValues(
      [ 'head', '', '', '', '', '', '' ],
      circleHeadIdSelector
    )
    checkArrValues(
      [ '', '', '', '', '', '', 'tail' ],
      circleTailIdSelector
    )
    checkArrValues(
      [ '0', '1', '2', '3', '4', '5', '6' ],
      circleIndexIdSelector
    )
    checkElementsCount( 7 )
    checkMainValueByIndex( 'test', 6 )
    checkDisabledButton( '@addToTailBtn', 'Добавить в tail' )
  } )


  it( 'should correctly add an element by index', () => {

    cy.get( htInputSelector ).as( 'htInput' )
    cy.get( indxInputSelector ).as( 'idxInput' )
    cy.get( 'button:contains("Добавить по индексу")' ).as( 'addByIndexBtn' )

    cy.get( '@htInput' ).type( 'test' ).should( 'have.value', 'test' )
    cy.get( '@idxInput' ).type( '2' ).should( 'have.value', '2' )

    checkElementsCount( 6 )
    checkMainValuesNotEmpty()
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5 ], [], [] )
    checkAndClickButton( '@addByIndexBtn', 'Добавить по индексу' )

    checkMiniCircle( circleHeadIdSelector, 'test', 'changing', 0 )
    checkMainClassByIndices( [ 1, 2, 3, 4, 5 ], [ 0 ], [] )
    waitDisappearMiniCircle( circleHeadIdSelector, 0 )

    checkMiniCircle( circleHeadIdSelector, 'test', 'changing', 1 )
    checkMainClassByIndices( [ 2, 3, 4, 5 ], [ 0, 1 ], [] )
    waitDisappearMiniCircle( circleHeadIdSelector, 1 )

    checkMiniCircle( circleHeadIdSelector, 'test', 'changing', 2 )
    checkMainClassByIndices( [ 3, 4, 5 ], [ 0, 1, 2 ], [] )
    waitDisappearMiniCircle( circleHeadIdSelector, 2 )

    checkElementsCount( 7 )
    checkArrValues(
      [ 'head', '', '', '', '', '', '' ],
      circleHeadIdSelector
    )
    checkArrValues(
      [ '', '', '', '', '', '', 'tail' ],
      circleTailIdSelector
    )
    checkArrValues(
      [ '0', '1', '2', '3', '4', '5', '6' ],
      circleIndexIdSelector
    )
    checkMainValueByIndex( 'test', 2 )
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5, 6 ], [], [] )
    checkDisabledButton( '@addByIndexBtn', 'Добавить по индексу' )

  } )


  it( 'should correctly remove an element from the head', () => {

    cy.get( 'button:contains("Удалить из head")' ).as( 'delFromHeadBtn' )

    checkElementsCount( 6 )
    checkMainValuesNotEmpty()
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5 ], [], [] )
    getValueByIndex( 0, ( value ) => {
      cy.get( '@delFromHeadBtn' ).click()
      waitDisappearValueByIndex( 0 )
      checkMiniCircle( circleHeadIdSelector, value, 'changing', 0 )
      waitDisappearMiniCircle( circleHeadIdSelector, 0 )
      checkElementsCount( 5 )
      checkArrValues(
        [ 'head', '', '', '', '' ],
        circleHeadIdSelector
      )
      checkArrValues(
        [ '', '', '', '', 'tail' ],
        circleTailIdSelector
      )
      checkArrValues(
        [ '0', '1', '2', '3', '4' ],
        circleIndexIdSelector
      )
      checkMainClassByIndices( [ 0, 1, 2, 3, 4 ], [], [] )
      checkActiveButton( '@delFromHeadBtn', 'Удалить из head' )
    } )

  } )


  it( 'should correctly remove an element from the tail', () => {

    cy.get( 'button:contains("Удалить из tail")' ).as( 'delFromTailBtn' )

    checkElementsCount( 6 )
    checkMainValuesNotEmpty()
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5 ], [], [] )
    getValueByIndex( 5, ( value ) => {
      cy.get( '@delFromTailBtn' ).click()
      waitDisappearValueByIndex( 5 )
      checkMiniCircle( circleTailIdSelector, value, 'changing', 5 )
      waitDisappearMiniCircle( circleTailIdSelector, 5 )
      checkArrValues(
        [ 'head', '', '', '', '' ],
        circleHeadIdSelector
      )
      checkArrValues(
        [ '', '', '', '', 'tail' ],
        circleTailIdSelector
      )
      checkArrValues(
        [ '0', '1', '2', '3', '4' ],
        circleIndexIdSelector
      )
      checkElementsCount( 5 )
      checkMainClassByIndices( [ 0, 1, 2, 3, 4 ], [], [] )
      checkActiveButton( '@delFromTailBtn', 'Удалить из tail' )
    } )

  } )

  it( 'should correctly remove an element by index', () => {

    cy.get( indxInputSelector ).as( 'idxInput' )
    cy.get( 'button:contains("Удалить по индексу")' ).as( 'delByIndexBtn' )

    cy.get( '@idxInput' ).type( '2' ).should( 'have.value', '2' )
    checkElementsCount( 6 )
    checkMainValuesNotEmpty()
    checkMainClassByIndices( [ 0, 1, 2, 3, 4, 5 ], [], [] )
    checkAndClickButton( '@delByIndexBtn', 'Удалить по индексу' )

    getValueByIndex( 2, ( value ) => {
      checkMainClassByIndices( [ 1, 2, 3, 4, 5 ], [ 0 ], [] )
      checkMainClassByIndices( [ 2, 3, 4, 5 ], [ 0, 1 ], [] )
      waitDisappearValueByIndex( 2 )
      checkMainClassByIndices( [ 3, 4, 5 ], [ 0, 1, 2 ], [] )
      checkMiniCircle( circleTailIdSelector, value, 'changing', 2 )
      waitDisappearMiniCircle( circleTailIdSelector, 2 )
      checkArrValues(
        [ 'head', '', '', '', '' ],
        circleHeadIdSelector
      )
      checkArrValues(
        [ '', '', '', '', 'tail' ],
        circleTailIdSelector
      )
      checkArrValues(
        [ '0', '1', '2', '3', '4' ],
        circleIndexIdSelector
      )
      checkElementsCount( 5 )
      checkMainClassByIndices( [ 0, 1, 2, 3, 4 ], [], [] )
      checkDisabledButton( '@delByIndexBtn', 'Удалить по индексу' )
    } )
  } )

} )

export { }
