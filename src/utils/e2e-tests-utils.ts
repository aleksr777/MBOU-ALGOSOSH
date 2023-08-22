export function checkMainValue ( stringArr: string[] ) {
	stringArr.forEach( ( value, index ) => {
		// Ищем 'статичную' часть наименования класса
		cy.get( '[class*="letter"]' ).eq( index ).should( 'contain.text', value )
	} )
}

export function checkHeadStrValue ( stringArr: string[] ) {
	stringArr.forEach( ( value, index ) => {
		// Ищем 'статичную' часть наименования класса
		cy.get( '[class*="circle_head"][class*="circle_string"]' ).eq( index ).should( 'contain.text', value )
	} )
}

export function checkTailStrValue ( stringArr: string[] ) {
	stringArr.forEach( ( value, index ) => {
		// Ищем 'статичную' часть наименования класса
		cy.get( '[class*="circle_tail"][class*="circle_string"]' ).eq( index ).should( 'contain.text', value )
	} )
}


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

export function checkMainClassByIndices (
	defaultIndices: number[],
	changingIndices: number[],
	modifiedIndices: number[]
) {
	checkIndicesForClass( defaultIndices, 'circle_default' )
	checkIndicesForClass( changingIndices, 'circle_changing' )
	checkIndicesForClass( modifiedIndices, 'circle_modified' )
}
