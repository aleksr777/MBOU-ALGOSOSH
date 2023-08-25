export function checkStrValues (
	mainStrArr: ( string | number )[] | null,
	headStrArr: ( string )[] | null,
	tailStrArr: ( string )[] | null,
	circleIndexArr: ( string )[] | null
) {

	const checkArr = (
		arr: ( unknown | string )[] | null,
		selectorStr: string
	) => {
		if ( !arr ) {
			cy.get( 'body' ).then( ( $body ) => {
				if ( $body.find( selectorStr ).length > 0 ) { // если элементы найдены
					cy.get( selectorStr ).each( ( element ) => {
						cy.wrap( element ).should( 'have.text', '' )
					} )
				}
			} )
		}
		else {
			arr.forEach( ( value, index ) => {
				cy.get( selectorStr ).eq( index ).should( 'contain.text', value )
			} )
		}
	}

	checkArr( mainStrArr, '[data-testid="circle-letter"]' )
	checkArr( headStrArr, '[data-testid="circle-head"]' )
	checkArr( tailStrArr, '[data-testid="circle-tail"]' )
	checkArr( circleIndexArr, '[data-testid="circle-index"]' )
}

export function checkElementsCount ( expectedCount: number ) {
	// Ищем 'статичную' часть наименования класса
	cy.get( '[data-testid="circle-wrapper"]' ).should( 'have.length', expectedCount )
}

export function checkMainClassByIndices (
	defaultIndices: number[],
	changingIndices: number[],
	modifiedIndices: number[]
) {
	const checkIndicesForClass = ( indices: number[], partialClassName: string ) => {
		// Ищем 'статичную' часть наименования класса
		cy.get( '[data-testid="circle-wrapper"]' ).then( ( elements ) => {
			indices.forEach( index => {
				cy.wrap( elements.eq( index ) )
					.invoke( 'attr', 'class' )
					.should( 'match', new RegExp( partialClassName ) )
			} )
		} )
	}
	checkIndicesForClass( defaultIndices, 'default' )
	checkIndicesForClass( changingIndices, 'changing' )
	checkIndicesForClass( modifiedIndices, 'modified' )
}

export function checkAndClickButton ( selectorStr: string, text: string ) {
	cy.get( selectorStr )
		.should( 'not.be.disabled' )
		.should( 'have.text', text )
		.within( () => {
			cy.get( '[data-testid="loader-icon"]' ).should( 'not.exist' )
		} )
		.click()
		.within( () => {
			cy.get( '[data-testid="loader-icon"]' ).should( 'be.visible' )
		} )
		.should( 'be.disabled' )
		.should( 'not.have.text' )
}

export function checkActiveButton ( selectorStr: string, text: string ) {
	cy.get( selectorStr )
		.should( 'not.be.disabled' )
		.should( 'have.text', text )
		.within( () => {
			cy.get( '[data-testid="loader-icon"]' ).should( 'not.exist' )
		} )
}

export function checkDisabledButton ( selectorStr: string, text: string ) {
	cy.get( selectorStr )
		.should( 'be.disabled' )
		.should( 'have.text', text )
		.within( () => {
			cy.get( '[data-testid="loader-icon"]' ).should( 'not.exist' )
		} )
}
