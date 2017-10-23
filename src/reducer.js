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

	 [[1,1,0], // **
	  [0,1,1]] //  **
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

// iterate state with time
export const tick = (state=initialState)=> {

	const { current, coming, cells, move, time } = state

	const renderCells = renderBlockOnBoard(cells, current)
	let newCells = [...cells]
	let newCurrent = {...current}

	// check position
	let currentX = current.position[0]
	let currentY = current.position[1]

	// move left-right
	if(move){
		// can move left?
		if(move==="left" && current.position[0]>0){
			currentX -= 1
		}
		if(move==="right" && current.position[0] + current.cells[0].length<cells[0].length){
			currentX += 1
		}
		newCurrent = {
			...newCurrent,
			position: [currentX, currentY]
		}
	}

	// TODO: correlate mod with level
	if(time % 60 === 0){
		// can move down
		// if current block current_y + height_y < height_board
		if(current.position[1] + current.cells.length < cells.length){
			currentY += 1

			newCurrent = {
				...newCurrent,
				position: [currentX, currentY]
			}
		}

		// hit the ground, (or on top of another block)
		// merge current with cells
		if(current.position[1] + current.cells.length === cells.length){
			console.log("hit")

			newCells = renderBlockOnBoard(cells, current)
			newCurrent = {
				cells: blocks[Math.floor( blocks.length * Math.random() )],
				position: [4, 0]
			}
		}
	}

	const ret = {
		cells:  newCells,
		render: [...renderCells],
		coming: [...coming],
		current: newCurrent,
		time: (time + 1)
	}

	return ret
}





