import { getReversingStringSteps } from '../../utils/string-component-utils'

describe( 'getReversingStringSteps', () => {

	async function testReversal ( input: string[], expectedOutput: string[] ) {
		const result = await getReversingStringSteps( input )
		expect( result[ result.length - 1 ] ).toEqual( expectedOutput )
	}

	it( 'should correctly reverse a string with even number of characters', () => {
		testReversal( [ 'a', 'b', 'c', 'd' ], [ 'd', 'c', 'b', 'a' ] )
	} )

	it( 'should correctly reverse a string with odd number of characters', () => {
		testReversal( [ 'a', 'b', 'c', 'd', 'e' ], [ 'e', 'd', 'c', 'b', 'a' ] )
	} )

	it( 'should correctly reverse a string with a single character', () => {
		testReversal( [ 'a' ], [ 'a' ] )
	} )

	it( 'should correctly handle an empty string', () => {
		testReversal( [], [] )
	} )
} )
