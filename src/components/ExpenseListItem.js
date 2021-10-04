import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'			// Like moment, but for numbers

// The ExpenseListItem is called with {...expense} which JSX spreads properties to individual properties
// They all come through as props, as usual. Which we destructure from props.
const ExpenseListItem = ({description, amount, createdAt, id}) => (
	<Link to={`/edit/${id}`} className="list-item">
		<div className="list-item__header">
			<h3 className="list-item__title">{description}</h3>
			<span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
		</div>
		<h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
	</Link>
)

export default ExpenseListItem;
