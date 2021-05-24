import React from 'react'
import {Link} from 'react-router-dom'

// The ExpenseListItem is called with {...expense} which JSX spreads properties to individual properties
// They all come through as props, as usual. Which we destructure from props.
const ExpenseListItem = ({description, amount, createdAt, id}) => (
	<div>
		<Link to={`/edit/${id}`}>
			<h3>{description}</h3>
		</Link>
		<p>{amount} - {createdAt}</p>
	</div>
)

export default ExpenseListItem;
