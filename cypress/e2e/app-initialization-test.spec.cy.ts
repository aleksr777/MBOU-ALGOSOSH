describe( 'Application Health Checks', function () {

  beforeEach( () => {
    cy.visit( '/' )
  } )

  it( 'Server is up and the main page loaded', function () {
    // Проверяем наличие заголовка
    cy.contains( 'h1', /мбоу алгосош/i ).should( 'exist' )
    // Проверяем наличие основных ссылок
    const paths = [ '/recursion', '/fibonacci', '/sorting', '/stack', '/queue', '/list' ]
    paths.forEach( path => { cy.get( `a[href="${ path }"]` ) } )
  } )

  it( 'No console errors on main page', function () {
    cy.window().then( ( win ) => {
      cy.spy( win.console, 'error' )
    } )
    cy.window().its( 'console.error' ).should( 'not.have.been.called' )
  } )

} )

export { }
