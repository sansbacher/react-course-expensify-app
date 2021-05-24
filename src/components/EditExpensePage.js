import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import {editExpense, removeExpense} from '../actions/expenses'

// Named export just for testing
export class EditExpensePage extends React.Component {
	// Callbacks to handle what ExpenseForm or this form needs to do
	onSubmit = (expense) => {
		// OLD WAY (when it was a stateless functional component...): props.dispatch(editExpense(props.expense.id, expense))
		this.props.editExpense(this.props.expense.id, expense)			// Must use this.props.blah instead a class-based Component (not just props.blah)
		this.props.history.push('/')
	}
	onRemove = () => {
		// OLD WAY (...using embedded functions): this.props.dispatch(removeExpense({id: props.expense.id}))		// removeExpense() expects an {object} but only needs the id property
		this.props.removeExpense({id: this.props.expense.id})		// removeExpense() expects an {object} but only needs the id property
		this.props.history.push('/')
	}
	render() {
		return (
			<div>
				<ExpenseForm
					expense={this.props.expense}
					onSubmit={this.onSubmit}
				/>
				<button onClick={this.onRemove}>Remove</button>
			</div>
		)
	}
}

// the connect() function can have 0, 1, or 2 args (maybe others): none, state, or state + props
const mapStateToProps = (state, props) => {
	return {
		// Becomes props.expense or this.props.expense
		expense: state.expenses.find(expense => expense.id === props.match.params.id)
	};
}

// Encapsulate the call to dispatch() within a prop so we can more easily test this Component (could pass in: (dispatch, props) if needed)
const mapDispatchToProps = (dispatch) => {
	return {
		editExpense: (id, expense) => dispatch(editExpense(id, expense)),		// Add these Props
		// removeExpense: ({id}) => dispatch(removeExpense({id}))				// Destructure and restructure...
		removeExpense: data => dispatch(removeExpense(data))					// ... or just pass along the object passed in
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);