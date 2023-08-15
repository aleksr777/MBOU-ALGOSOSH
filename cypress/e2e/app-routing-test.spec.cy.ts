describe( 'Application Routing Tests', function () {

  function returnToMainPage () {
    cy.get( `a[href='/']` ).click()
  }

  beforeEach( () => {
    cy.visit( 'http://localhost:3000/' )
    cy.wait( 500 )
  } )

  it( 'navigate to the Main page', function () {
    // Проверяем наличие заголовка
    cy.contains( 'h1', /мбоу алгосош/i ).should( 'exist' )
    // Проверяем наличие основных ссылок
    const paths = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]
    paths.forEach( path => { cy.get( `a[href='${ path }']` ) } )
  } )

  it( 'navigate to the Recursion page', function () {
    cy.get( `a[href='/recursion']` ).click()
    cy.wait( 500 )
    cy.contains( 'h3', /строка/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Fibonacci page', function () {
    cy.get( `a[href='/fibonacci']` ).click()
    cy.wait( 500 )
    cy.contains( 'h3', /последовательность фибоначчи/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Sorting page', function () {
    cy.get( `a[href='/sorting']` ).click()
    cy.wait( 500 )
    cy.contains( 'h3', /сортировка массива/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Stack page', function () {
    cy.get( `a[href='/stack']` ).click()
    cy.wait( 500 )
    cy.contains( 'h3', /стек/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the Queue page', function () {
    cy.get( `a[href='/queue']` ).click()
    cy.wait( 500 )
    cy.contains( 'h3', /очередь/i ).should( 'exist' )
    returnToMainPage()
  } )

  it( 'navigate to the List page', function () {
    cy.get( `a[href='/list']` ).click()
    cy.wait( 500 )
    cy.contains( 'h3', /связный список/i ).should( 'exist' )
    returnToMainPage()
  } )

} )

export { }
