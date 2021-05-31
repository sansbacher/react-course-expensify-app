import React from 'react'
import {connect} from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

// Regular unconnected Component, once connected it will receive the mapped State to Props
// ONLY exported for the purposes of TESTING with Jest (NOT used directly by the app, the default Connected export below is)
export const ExpenseList = props => (
	<div>
		{/* In component: {...expense} JSX spreads properties to individual props, like amount={expense.amount} */}
		{
			props.expenses.length === 0 ? (
				<p>No expenses</p>
			) : (
				props.expenses.map(expense => (
					<ExpenseListItem {...expense} key={expense.id} />
				))
			)
		}
	</div>
);

// Also receives props, so could use: (state, props)
const mapStateToProps = (state) => {
	// Returns an object of what parts of state (that will be added to props) that will be used by the function connect() returns
	return {															// .dispatch() is also added to the returned props
		expenses: selectExpenses(state.expenses, state.filters)			// Handles filtering/sorting of the state
	};
};

// connect() returns a function that we're immediately executing, Like a IIFE.
// We pass to connect() a function that returns what part of the passed in state that gets used in the returned 'IIFE' function (added to props)
// The 'IIFE' returns a Higher Order Component [HOC] (which is a wrapped version of our component: the Connected Component)
// The default export is the function returned by the call to the function returned by connect()
// That function can access whatever we select from the store, and will react as the store changes
/* 
	// This is the verbose version:
	let makeHOCWithState = connect(mapStateToProps)
	let WrappedConnectedComponent = makeHOCWithState(ExpenseList)
	export default WrappedConnectedComponent;
*/
// Technically the mapStateToProps function isn't required, connect()(SomeComponent) is valid - just means only .dispatch() is added to props
// At it's basic level: connect() is a method to inject/add part of state (and dispatch) into the props for another function
export default connect(mapStateToProps)(ExpenseList);
