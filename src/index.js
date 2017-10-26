import React from 'react'
import ReactDOM from 'react-dom'
import TetrisGame from './components/TetrisGame'
import {tick} from './reducer'  
import './index.css'

/*

gameState = {
	cells, [[]],
	current: {
		cells: [[1,1],
		        [1,1]],
		position: [4, 0] 
	},
	coming: [[1,1,1,1]]
}

gameState -> 
*/ 

let gameState

const render = (state)=> {

	gameState = tick(state)

	ReactDOM.render(
		<div>
			<TetrisGame cells = { gameState.render }
					  current = { gameState.current }
					   coming = { gameState.coming } 
		        onMoveRequest = { move=> gameState={...gameState, move} }
		             onRotate = { rotate=> gameState={...gameState, rotate} } />
		</div>, 
		document.getElementById('root')
	)

	window.requestAnimationFrame(()=> render(gameState))
}

render()