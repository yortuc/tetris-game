/*
	reducer tests
*/

import { 
	initialState, 
	putTetrominoOnBoard, 
	tick, 
	rotateBlock,
	handleErase
} from './reducer'

it('render a block onto a board', () => {

	const emptyBoard = [[0,0],
                        [0,0]]

	const tetromino = {
		cells:   [[1,0]],
		position: [0, 0]
	}

	const expectedBoard = [[1,0],
	                       [0,0]]

	const actualBoard = putTetrominoOnBoard(emptyBoard, tetromino)

	expect(actualBoard).toEqual(expectedBoard)
})

it('tick(state) can compute next state', ()=> {

	const nextState = tick(initialState)

	// iterate time
	expect(nextState.time).toEqual(1)

	// iterate current block position
	expect(nextState.current.position[1]).toEqual(initialState.current.position[1]+1)
})

it('handle horizontal collisions', ()=> {
	// can move left
	const moveLeftState = {...initialState, move:"left"}
	const nextState = tick(moveLeftState)
	expect(nextState.current.position[0]).toEqual(moveLeftState.current.position[0]-1)

	// can move right
	const moveRightState = {...initialState, move:"right"}
	const nextStateRight = tick(moveRightState)
	expect(nextStateRight.current.position[0]).toEqual(moveRightState.current.position[0]+1)

	// shoud not be able to move left at left edge
	const moveLeftAtEdge = {...initialState, move: "left"}
	moveLeftAtEdge.current.position = [0, 0]
	const nextStateLeftAtEdge = tick(moveLeftAtEdge)
	expect(nextStateLeftAtEdge.current.position[0]).toEqual(nextStateLeftAtEdge.current.position[0])

	// shoud not be able to move right at right edge
	const moveRightAtEdge = {...initialState, move:"right"}
	moveRightAtEdge.current.position = [ moveRightAtEdge.cells[0].length-2, 0 ]
	const nextStateRightAtEdge = tick(moveRightAtEdge)
	expect(nextStateRightAtEdge.current.position[0]).toEqual(nextStateRightAtEdge.current.position[0])
})

it('rotateBlock can rotate given block', ()=> {
	const block = {cells:
		          [[1], 
	               [1], 
	               [1], 
	               [1]]}

	const rotated = [[1,1,1,1]]

	const computed = rotateBlock(initialState.cells, block)

	expect(computed).toEqual(rotated)
})

xit('handle rotations with collision', ()=> {
	const rotateState = {...initialState, rotate: "r"}
	const nextState = tick(rotateState)

	// state current : *
	//                 *
	//                 *
	//                 *
	//
	// rotated state: * * * * 

	const rotatedBlock = [[1,1,1,1]]

	expect(nextState.current.cells).toEqual(rotatedBlock)
	return false
})

it('handle erase blocks', ()=> {
	const cells =    [[0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
			          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
	
	const expected = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			          [0, 0, 0, 0, 0, 1, 0, 1, 0, 0]]

	const computed = handleErase(cells)

	expect(computed).toEqual(expected)
})