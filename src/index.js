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

const reqAF = window.requestAnimationFrame

let gameState

const render = (state)=> {

	gameState = tick(state)

	// console.log(gameState.time)

	ReactDOM.render(
		<div>
			<TetrisGame cells = { gameState.render }
					  current = { gameState.current }
					   coming = { gameState.coming } 
		        onMoveRequest = { move=> gameState={...gameState, move} }/>
		</div>, 
		document.getElementById('root')
	)

	reqAF(()=> render(gameState))
}

render()