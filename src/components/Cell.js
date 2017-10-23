import React from 'react'

const createStyle = (type)=> ({
	backgroundColor: type === 1 ? "black" : "white"
})

const Cell = ({ type })=> (
	<td style={createStyle(type)}></td>
)

export default Cell