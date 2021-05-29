import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'			// Like moment, but for numbers

// The ExpenseListItem is called with {...expense} which JSX spreads properties to individual properties
// They all come through as props, as usual. Which we destructure from props.
const ExpenseListItem = ({description, amount, createdAt, id}) => (
	<div>
		<Link to={`/edit/${id}`}>
			<h3>{description}</h3>
		</Link>
		<p>
			{numeral(amount / 100).format('$0,0.00')}
			- 
			{moment(createdAt).format('MMMM Do, YYYY')}
		</p>
	</div>
)

export default ExpenseListItem;
