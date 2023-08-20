import { getReversingStringSteps } from '../../utils/string-component-utils'

describe( 'getReversingStringSteps', () => {

	it( 'should correctly reverse a string with even number of characters', async () => {
		const input = [ 'a', 'b', 'c', 'd' ]
		const result = await getReversingStringSteps( input )
		expect( result[ result.length - 1 ] ).toEqual( [ 'd', 'c', 'b', 'a' ] )
	} )

	it( 'should correctly reverse a string with odd number of characters', async () => {
		const input = [ 'a', 'b', 'c' ]
		const result = await getReversingStringSteps( input )
		expect( result[ result.length - 1 ] ).toEqual( [ 'c', 'b', 'a' ] )
	} )

	it( 'should correctly reverse a string with one character', async () => {
		const input = [ 'a' ]
		const result = await getReversingStringSteps( input )
		expect( result[ result.length - 1 ] ).toEqual( [ 'a' ] )
	} )

	it( 'should correctly handle an empty string', async () => {
		const input: string[] = []
		const result = await getReversingStringSteps( input )
		expect( result[ result.length - 1 ] ).toEqual( [] )
	} )

} )
