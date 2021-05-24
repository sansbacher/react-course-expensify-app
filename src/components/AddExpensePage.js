import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import {addExpense} from '../actions/expenses'

// Named export so we can test it
export class AddExpensePage extends React.Component {
	onSubmit = (expense) => {		// Callback for when the form is Submitted (called by ExpenseForm )
		// Do these things when the form is is submitted:
		// this.props.dispatch(addExpense(expense))		// (OLD WAY!) Expects an Object, call dispatch() with the expense
		this.props.addExpense(expense)						// uses mapDispatchToProps (more testable as addExpense is encapsulated below) - call the function
		this.props.history.push('/')						// Redirect to the Dashboard (via React Route). Preserves history (Back works)
	}
	render() {
		return (
			<div>
				<h1>Add Expense</h1>
				<ExpenseForm
					onSubmit={this.onSubmit}
				/>
			</div>
		)
	}
}

// Similar to mapStateToProps we get access to pass in custom props, abstracting dispatch() away from the Component itself
const mapDispatchToProps = (dispatch) => {
	// Return an object of new props to add
	return {
		addExpense: expense => dispatch(addExpense(expense))		// addExpense: is a new prop that is a function calling dispatch() with addExpense baked in
	}
}

// Without any mapStateToProps function passed to connect() (ie. undefined or just nothing) it will only add .dispatch() to the props passed to ExpenseListItem
// BUT we can add mapDispatchToProps to customize props
export default connect(undefined, mapDispatchToProps)(AddExpensePage);