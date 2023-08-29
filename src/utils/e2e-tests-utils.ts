export const circleHeadIdSelector = '[data-testid="circle-head"]'
export const circleTailIdSelector = '[data-testid="circle-tail"]'
export const circleLetterIdSelector = '[data-testid="circle-letter"]'
export const circleIndexIdSelector = '[data-testid="circle-index"]'
export const circleWrapperIdSelector = '[data-testid="circle-wrapper"]'
export const loaderIconIdSelector = '[data-testid="loader-icon"]'
export const htInputSelector = 'input[name="headTailInput"]'
export const indxInputSelector = 'input[name="indicesInput"]'
export const btnSubmitSelector = 'button[type="submit"]'

export function checkBtnWhenInputEmpty (
	inputSelector: string,
	buttonSelector: string,
	value: string
) {
	// Проверка после загрузки страницы
	cy.get( buttonSelector ).should( 'be.disabled' )
	cy.get( inputSelector ).should( 'have.value', '' ).should( 'not.be.disabled' )
	// Проверка после введения и удаления текста в инпуте
	cy.get( inputSelector ).type( value, { delay: 50 } ).should( 'have.value', value )
	cy.get( buttonSelector ).should( 'not.be.disabled' )
	cy.get( inputSelector ).clear().should( 'have.value', '' )
	cy.get( buttonSelector ).should( 'be.disabled' )
}

export const checkArrValues = (
	arr: ( unknown | string | React.ReactElement )[] | null,
	selector: string
) => {
	if ( !arr ) {
		cy.get( 'body' )
			.then( ( $body ) => {
				if ( $body.find( selector ).length > 0 ) { // если элементы найдены
					cy.get( selector ).should( 'exist' ).each( ( element ) => {
						cy.wrap( element ).should( 'have.text', '' )
					} )
				}
			} )
	}
	else {
		arr.forEach( ( value, index ) => {
			cy.get( selector ).eq( index ).should( 'exist' ).should( 'contain.text', value )
		} )
	}
}

export function checkValues (
	mainArr: ( string | number )[] | null,
	headArr: ( string )[] | null,
	tailArr: ( string )[] | null,
	circleIndexArr: ( string )[] | null
) {
	checkArrValues( mainArr, circleLetterIdSelector )
	checkArrValues( headArr, circleHeadIdSelector )
	checkArrValues( tailArr, circleTailIdSelector )
	checkArrValues( circleIndexArr, circleIndexIdSelector )
}

export function checkElementsCount ( expectedCount: number ) {
	cy.get( circleWrapperIdSelector ).should( 'have.length', expectedCount )
}

export function checkMainClassByIndices (
	defaultIndices: number[],
	changingIndices: number[],
	modifiedIndices: number[]
) {
	const checkIndicesForClass = ( indices: number[], partialClassName: string ) => {
		// Ищем 'статичную' часть наименования класса
		cy.get( circleWrapperIdSelector )
			.should( 'exist' )
			.then( ( elements ) => {
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
		.should( 'exist' )
		.should( 'not.be.disabled' )
		.within( () => {
			cy.get( loaderIconIdSelector ).should( 'not.exist' )
		} )
		.click()
		.within( () => {
			cy.get( loaderIconIdSelector ).should( 'be.visible' )
		} )
		.should( 'be.disabled' )
		.should( 'not.have.text' )
}

export function checkActiveButton ( selectorStr: string, text: string ) {
	cy.get( selectorStr )
		.should( 'exist' )
		.should( 'not.be.disabled' )
		.within( () => {
			cy.get( loaderIconIdSelector ).should( 'not.exist' )
		} )
		.should( 'have.text', text )
}

export function checkDisabledButton ( selectorStr: string, text: string ) {
	cy.get( selectorStr )
		.should( 'exist' )
		.should( 'be.disabled' )
		.within( () => {
			cy.get( loaderIconIdSelector ).should( 'not.exist' )
		} )
		.should( 'have.text', text )
}

export function checkMainValueByIndex ( expectedValue: string, indexToCheck: number ) {
	cy.get( circleLetterIdSelector )
		.should( 'exist' )
		.each( ( $el, index ) => {
			if ( index === indexToCheck ) {
				expect( $el.text().trim() ).to.equal( expectedValue )
			} else {
				expect( $el.text().trim() ).to.not.be.empty
			}
		} )
}

export function checkMainValuesNotEmpty () {
	cy.get( circleLetterIdSelector )
		.should( 'exist' )
		.each( ( $el ) => {
			expect( $el.text().trim() ).to.not.be.empty
		} )
}

export function addTestElements (
	inputSelector: string,
	buttonSelector: string
) {
	cy.get( inputSelector ).should( 'exist' ).type( 'test' ).should( 'have.value', 'test' )
	cy.get( buttonSelector ).should( 'exist' ).click()
	cy.get( inputSelector ).type( 'me' ).should( 'have.value', 'me' )
	cy.get( buttonSelector ).click()
	cy.get( inputSelector ).type( 'now' ).should( 'have.value', 'now' )
	cy.get( buttonSelector ).click()
}

export function checkMiniCircle (
	selector: string,
	expectedText: string,
	partialClass: string,
	index: number
) {
	cy.get( selector ).eq( index ).should( 'exist' ).within( () => {
		cy.get( circleWrapperIdSelector )
			.should( 'exist' )
			.invoke( 'attr', 'class' )
			.should( 'match', new RegExp( partialClass ) )
		cy.get( circleLetterIdSelector )
			.should( 'exist' )
			.contains( expectedText )
	} )
}

export function waitDisappearMiniCircle ( selector: string, index: number ) {
	cy.get( selector )
		.eq( index )
		.should( 'exist' )
		.within( () => {
			cy.get( circleLetterIdSelector ).should( 'exist' )
			cy.get( circleLetterIdSelector ).should( 'not.exist' )
		} )
}

export function waitDisappearValueByIndex ( index: number ) {
	cy.get( circleLetterIdSelector )
		.eq( index )
		.should( 'not.have.text' )
}

export function getValueByIndex ( index: number, callback: ( value: string ) => void ) {
	cy.get( circleLetterIdSelector ).eq( index ).invoke( 'text' ).then( textValue => {
		const letterValue = textValue.trim()
		callback( letterValue )
	} )
}
