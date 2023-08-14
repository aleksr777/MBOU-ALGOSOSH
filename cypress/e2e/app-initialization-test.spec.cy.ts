describe( 'Application Health Checks', function () {

  it( 'Server is up and the main page loaded', function () {
    // Переходим на главную страницу
    cy.visit( 'http://localhost:3000', { timeout: 10000 } )  // 10 секунд таймаут
    // Проверяем наличие заголовка
    cy.contains( 'h1', /мбоу алгосош/i ).should( 'exist' )
    // Проверяем наличие основных ссылок
    const paths = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]
    paths.forEach( path => { cy.get( `a[href="${ path }"]` ) } )
  } )

  it( 'No console errors on main page', function () {
    // проверяем наличие ошибок в консоле
    cy.visit( 'http://localhost:3000' )
    cy.window().then( ( win ) => {
      cy.spy( win.console, 'error' )
    } )
    cy.window().its( 'console.error' ).should( 'not.have.been.called' )
  } )

} )

export { }
