import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from './ExpenseForm'
import {startEditExpense, startRemoveExpense} from '../actions/expenses'
import ConfirmationModal from './ConfirmationModal'

// Named export just for testing
export class EditExpensePage extends React.Component {
	// Local state for this Component, works fine with Redux state as well
	state = {
		showConfirmation: false
	}
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
		this.setState(() => ({ showConfirmation: false }))				// Hide the Modal
		this.props.history.push('/')
	}
	onShowConfirmation = () => {
		this.setState(() => ({ showConfirmation: true }))				// Show the Modal
	}
	onCancel = () => {
		this.setState(() => ({ showConfirmation: false }))
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
						history={this.props.history}
					/>
					{/* Changed onClick from this.onRemove to this.onShowConfirmation, and passing onRemove down now */}
					<button className="button button--secondary" onClick={this.onShowConfirmation}>Remove Expense</button>
				</div>
				{/* This is "on" the page but isn't displayed until triggered, then it covers the page and displays its content */}
				<ConfirmationModal
					showConfirmation={this.state.showConfirmation}
					expenseDescription={this.props.expense.description}
					handleCancel={this.onCancel}
					handleRemove={this.onRemove}
				/>
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