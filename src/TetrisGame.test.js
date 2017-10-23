import React from 'react'
import ReactDOM from 'react-dom'
import TetrisGame from './components/TetrisGame'
import { initialState } from './reducer'


it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<TetrisGame cells = { initialState.cells }
							current = { initialState.current }
						     coming = { initialState.coming } />, div);
})
