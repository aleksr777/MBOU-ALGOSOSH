describe( 'Application Routing Tests', function () {

  function returnToMainPage () {
    cy.get( `a[href='/']` ).click()
  }

  beforeEach( () => {
    cy.visit( '/' )
  } )

  it( 'navigate to the Main page', function () {
    // Проверяем наличие заголовка
    cy.contains( 'h1', /мбоу алгосош/i ).should( 'exist' )
    // Проверяем наличие основных ссылок
    const paths = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]
    paths.forEach( path => { cy.get( `a[href='${ path }']` ).should( 'exist' ) } )
  } )

  it( 'navigate to the Recursion page', function () {
    cy.get( `a[href='/recursion']` ).should( 'exist' ).click()
    cy.contains( 'h3', /строка/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Fibonacci page', function () {
    cy.get( `a[href='/fibonacci']` ).should( 'exist' ).click()
    cy.contains( 'h3', /последовательность фибоначчи/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Sorting page', function () {
    cy.get( `a[href='/sorting']` ).should( 'exist' ).click()
    cy.contains( 'h3', /сортировка массива/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Stack page', function () {
    cy.get( `a[href='/stack']` ).should( 'exist' ).click()
    cy.contains( 'h3', /стек/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Queue page', function () {
    cy.get( `a[href='/queue']` ).should( 'exist' ).click()
    cy.contains( 'h3', /очередь/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the List page', function () {
    cy.get( `a[href='/list']` ).should( 'exist' ).click()
    cy.contains( 'h3', /связный список/i ).should( 'exist' )
    returnToMainPage()
  } )

} )

export { }
