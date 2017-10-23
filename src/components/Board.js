import React from 'react'
import Cell from './Cell'

const Board = ({ cells })=> (
	<div>
		<table className="Board">
			<tbody>
				{ 	
					cells.map((row, rowIndex)=> {
						return (
							<tr key={rowIndex}>
								{ 
									row.map((col, colIndex)=>
										<Cell key={(colIndex + (colIndex*rowIndex))}
											  i={rowIndex}
											  j={colIndex}
											  type={col} />
									) 
								}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	</div>
)

export default Board