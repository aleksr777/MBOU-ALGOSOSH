import { getStepsSortingChoice, getStepsSortingBubble } from '../../utils/sorting-page-utils'
import { Direction } from '../../types/direction'
import { StepsSortingType, ArrSortingType } from '../../types/types'

describe( 'check steps sorting', () => {

	const ASCENDING = Direction.Ascending
	const DESCENDING = Direction.Descending
	const testArrNumbers = [ 1, 0, 50, 25, 100, 99, 100, 1, 75 ]

	async function testSortingFunction (
		sortFunction: ( arr: number[], dir: Direction ) => Promise<StepsSortingType>,
		inputArray: number[],
		direction: Direction,
		expectedOutput: ArrSortingType
	) {
		const result = await sortFunction( inputArray, direction )
		expectedOutput.length === 0
			? expect( result ).toEqual( expectedOutput )
			: expect( result[ result.length - 1 ] ).toEqual( expectedOutput )
	}

	test( 'should return correct array for empty input', async () => {
		await testSortingFunction( getStepsSortingChoice, [], ASCENDING, [] )
		await testSortingFunction( getStepsSortingChoice, [], DESCENDING, [] )
		await testSortingFunction( getStepsSortingBubble, [], ASCENDING, [] )
		await testSortingFunction( getStepsSortingBubble, [], DESCENDING, [] )
	} )

	test( 'should return correct array for single element', async () => {
		await testSortingFunction( getStepsSortingChoice, [ 0 ], ASCENDING, [ 0, [], [ null, null ] ] )
		await testSortingFunction( getStepsSortingChoice, [ 100 ], DESCENDING, [ 100, [], [ null, null ] ] )
		await testSortingFunction( getStepsSortingBubble, [ 1 ], ASCENDING, [ 1, [], [ null, null ] ] )
		await testSortingFunction( getStepsSortingBubble, [ 99 ], DESCENDING, [ 99, [], [ null, null ] ] )
	} )

	test( 'should sort array in ascending order', async () => {
		await testSortingFunction( getStepsSortingChoice, testArrNumbers, ASCENDING, [ 0, 1, 1, 25, 50, 75, 99, 100, 100, [ 0, 1, 2, 3, 4, 5, 6 ], [ 7, 8 ] ] )
		await testSortingFunction( getStepsSortingBubble, testArrNumbers, ASCENDING, [ 0, 1, 1, 25, 50, 75, 99, 100, 100, [ 8, 0, 7, 1 ], [ 5, 6 ] ] )
	} )

	test( 'should sort array in descending order', async () => {
		await testSortingFunction( getStepsSortingChoice, testArrNumbers, DESCENDING, [ 100, 100, 99, 75, 50, 25, 1, 1, 0, [ 0, 1, 2, 3, 4, 5, 6 ], [ 7, 8 ] ] )
		await testSortingFunction( getStepsSortingBubble, testArrNumbers, DESCENDING, [ 100, 100, 99, 75, 50, 25, 1, 1, 0, [ 8, 0, 7, 1, 6, 2, 5 ], [ 4, 3 ] ] )
	} )

} )
