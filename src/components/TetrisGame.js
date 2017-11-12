import React from 'react'
import Board from './Board'

const TetrisGame = ({ cells, coming, onMoveRequest, onRotate })=> (
	<div>
		<Board cells={ cells } />
		<div className="GamePad">
			<button onClick={()=> onMoveRequest("left") } >LEFT</button>
			<button onClick={()=> onMoveRequest("right") } >RIGHT</button>
		</div>
		<div className="GamePad">
			<button onClick={()=> onRotate("r") }>ROTATE</button>
		</div>
		<div className="Coming">
			<Board cells={ coming } />
		</div>
	</div>
)

export default TetrisGame