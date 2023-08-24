export function checkStrValues (
	mainStrArr: ( unknown | string | number )[],
	headStrArr: ( unknown | string )[] | null,
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

	mainStrArr.forEach( ( value, index ) => {
		cy.get( '[class*="letter"]' ).eq( index ).should( 'contain.text', value )
	} )

	checkArr( headStrArr, '[class*="head"][class*="circle_string"]' )
	checkArr( tailStrArr, '[class*="tail"][class*="circle_string"]' )
	checkArr( circleIndexArr, '[class*="circle_index"]' )
}

export function checkElementsCount ( expectedCount: number ) {
	// Ищем 'статичную' часть наименования класса
	cy.get( '[class*="circle_circle"]' ).should( 'have.length', expectedCount )
}

export function checkMainClassByIndices (
	defaultIndices: number[],
	changingIndices: number[],
	modifiedIndices: number[]
) {
	const checkIndicesForClass = ( indices: number[], partialClassName: string ) => {
		// Ищем 'статичную' часть наименования класса
		cy.get( '[class*="circle_circle"]' ).then( ( elements ) => {
			indices.forEach( index => {
				cy.wrap( elements.eq( index ) )
					.invoke( 'attr', 'class' )
					.should( 'match', new RegExp( partialClassName ) )
			} )
		} )
	}
	checkIndicesForClass( defaultIndices, 'circle_default' )
	checkIndicesForClass( changingIndices, 'circle_changing' )
	checkIndicesForClass( modifiedIndices, 'circle_modified' )
}
