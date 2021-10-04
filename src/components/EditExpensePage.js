import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import {startEditExpense, startRemoveExpense} from '../actions/expenses'

// Named export just for testing
export class EditExpensePage extends React.Component {
	// Callbacks to handle what ExpenseForm or this form needs to do
	onSubmit = (expense) => {
		// OLD WAY (when it was a stateless functional component...): props.dispatch(editExpense(props.expense.id, expense))
		// OLD before Firebase: this.props.editExpense(this.props.expense.id, expense)			// Must use this.props.blah instead a class-based Component (not just props.blah)
		this.props.startEditExpense(this.props.expense.id, expense)			// Must use this.props.blah instead a class-based Component (not just props.blah)
		this.props.history.push('/')
	}
	onRemove = () => {
		// OLD WAY (...using embedded functions): this.props.dispatch(removeExpense({id: props.expense.id}))		// removeExpense() expects an {object} but only needs the id property
		// OLD before Firebase: this.props.removeExpense({id: this.props.expense.id})		// removeExpense() expects an {object} but only needs the id property
		this.props.startRemoveExpense({id: this.props.expense.id})		// startRemoveExpense() expects an {object} but only needs the id property
		this.props.history.push('/')
	}
	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit Expense</h1>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm
						expense={this.props.expense}
						onSubmit={this.onSubmit}
					/>
					<button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
				</div>
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
		startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),		// Add these Props
		// startRemoveExpense: ({id}) => dispatch(startRemoveExpense({id}))		// Destructure and restructure...
		startRemoveExpense: data => dispatch(startRemoveExpense(data))			// ... or just pass along the object passed in
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);