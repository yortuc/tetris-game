/*
	reducer tests
*/

import { initialState, renderBlockOnBoard, tick } from './reducer'

it('renderBlockOnBoard(cells, block) : can render a block onto a board', () => {
  
  	/*
		00   10  -> 10    
		00          00
  	*/
	const cells = [[0,0],
                   [0,0]]
	const block = {
		cells: [[1,0]],
		position: [0, 0]
	}

	const result = [[1,0],
	                [0,0]]

	const computed = renderBlockOnBoard(cells, block)

	expect(computed).toEqual(result)
})

it('tick(state) can compute next state', ()=> {

	const nextState = tick(initialState)

	// iterate time
	expect(nextState.time).toEqual(1)

	// iterate current block position
	expect(nextState.current.position[1]).toEqual(initialState.current.position[1]+1)
})

it('can move block left', ()=> {
	const moveLeftState = {...initialState, move:"left"}
	const nextState = tick(moveLeftState)

	expect(nextState.current.position[0]).toEqual(moveLeftState.current.position[0]-1)
})

it("can't move block left", ()=> {
	const moveLeftState = {
		...initialState,
		move: "left"
	}
})


