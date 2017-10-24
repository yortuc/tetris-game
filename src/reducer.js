export const blocks = [
	[[1],   // *
	 [1],   // *
	 [1],   // *
	 [1]],  // * 

	[[1,1],	 //  **
	 [1,1]], //  **

	[[1,0],	 // *
	 [1,0],	 // *
	 [1,1]], // **

	[[1,1,0],  // **
	 [0,1,1]], //  **

	[[1,1,1],
	 [0,1,0]]
]

export const defaultBoard = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

export const initialState = {
	cells:   [...defaultBoard],
	coming:  [...blocks[1]],
	render:  [...defaultBoard],
	current: {
		cells:    [...blocks[0]],
		position: [4, 0]
	},
	level: 1,
	time: 0
}

export const iterateBlock = (block, cb)=> {
	for(let i=0; i<block.cells.length; i++){
		for(let j=0; j<block.cells[i].length; j++){
			cb(i,j,block.cells[i][j])
		}
	}
}

// render given block on given board
export const renderBlockOnBoard = (cells, block)=> {
	let ret = cells.map(row=> row.map(col=> col))

	iterateBlock(block, (i, j, val)=> {
		if(val > 0){
			ret[i + block.position[1]][j + block.position[0]] = val
		}
	})

	return ret
}

// determine if the given block can move down
// scan all pieces in the block, if the piece has a 
//   empty space below, it should not collide with another piece
export const canMoveDown = (cells, block)=> {

	// if not reached bottom yet
	// check other blocks for collision
	if(block.position[1] + block.cells.length < cells.length){
		let ret = true
		
		iterateBlock(block, (i,j,val)=> {
			// i:row, j:col
			
			if(val===1 && ((i===block.cells.length-1) || (i<block.cells.length && block.cells[i+1][j]===0))){
				let offX = block.position[0] + j
				let offY = block.position[1] + i

				if(cells[offY+1][offX]===1) ret = false

			}
		})

		return ret

	}else{
		return false
	}
}

export const moveVertical = (cells, block, move)=> {
	// at left and right margins, can't move
	let ret = block.position[0]

	if(move==="left" && block.position[0]===0) return ret
	if(move==="right" && block.position[0] + block.cells[0].length===cells[0].length) return ret

	// check other blocks at left or right
	let moveResult
	if(move==="left"){
		moveResult = ret - 1

		iterateBlock(block, (i,j,val)=> {
			let offX = block.position[0] + j
			let offY = block.position[1] + i

			// can't move
			if(cells[offY][offX-1]===1) moveResult = ret
		})
	}
	else if(move==="right"){
		moveResult = ret + 1
		iterateBlock(block, (i,j,val)=> {
			let offX = block.position[0] + j
			let offY = block.position[1] + i

			// can't move
			if(cells[offY][offX+1]===1) moveResult = ret
		})
	}
	return moveResult
}

// iterate state with time
export const tick = (state=initialState)=> {

	const { current, coming, cells, move, time } = state

	const renderCells = renderBlockOnBoard(cells, current)
	let newCells = [...cells]
	let newCurrent = {...current}
	let newComing = [...coming]

	// check position
	let currentX = current.position[0]
	let currentY = current.position[1]

	// move left-right
	if(move){
		// can move left?
		const currentX = moveVertical(cells, current, move)

		newCurrent = {
			...newCurrent,
			position: [currentX, currentY]
		}
	}

	// TODO: correlate mod with level
	if(time % 40 === 0){

		// can move down
		if(canMoveDown(cells, current)){
			currentY += 1

			newCurrent = {
				...newCurrent,
				position: [currentX, currentY]
			}
		}
		else{
			console.log("collision")

			newCells = renderBlockOnBoard(cells, current)
			newCurrent = {
				cells: [...coming],
				position: [4, 0]
			}
			newComing = blocks[Math.floor(Math.random() * blocks.length)]
		}
	}

	const ret = {
		cells:  newCells,
		render: [...renderCells],
		coming: newComing,
		current: newCurrent,
		time: (time + 1)
	}

	return ret
}





