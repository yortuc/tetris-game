import React, {Component} from 'react'
import Board from './Board'
import { computeCells } from '../reducer'

const TetrisGame = ({ cells, coming, onMoveRequest })=> (
	<div>
		<Board cells={ cells } />
		<div className="GamePad">
			<button onClick={()=> onMoveRequest("left") } >LEFT</button>
			<button onClick={()=> onMoveRequest("right") } >RIGHT</button>
		</div>
		<div className="Coming">
			<Board cells={ coming } />
		</div>
	</div>
)

export default TetrisGame